"use server";

import { sql } from "@vercel/postgres";

export type user = {
  name: string;
  dni: string;
  file: number;
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
    select
     usr.*,
     sup.name as supervisorName,
    sup.email as supervisorEmail
    from "Users" usr 
    join "Users" sup 
    on usr.supervisor=sup.file 
    where usr.file = ${file} LIMIT 1`;
  return result.rows[0] as user;
};
