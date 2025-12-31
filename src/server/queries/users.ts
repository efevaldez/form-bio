"use server";

import { sql } from "@vercel/postgres";

export type user = {
  name: string;
  dni: string;
  file: number;
  manager: number;
  supervisor: number;
  email: string;
};

export const getUserByFileAndDni = async (
  file: string,
  dni: string
): Promise<user | null> => {
  const result =
    await sql`SELECT * FROM "Users" WHERE file = ${file} AND dni = ${dni} LIMIT 1`;
  return result.rows[0] as user;
};

export const getUserByFile = async (file: string): Promise<user | null> => {
  const result = await sql`
    select usr.*,sup.name as supervisorName, sup.email as supervisorEmail, mgr.name as managerName, mgr.email as managerEmail
    from "Users" usr 
    join "Users" sup 
    on usr.supervisor=sup.file 
    join "Users" mgr 
    on usr.manager=mgr.file 
    where usr.file = ${file} LIMIT 1`;
  return result.rows[0] as user;
};
