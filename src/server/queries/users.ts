'use server';
import { sql } from '@vercel/postgres';

export type user = {
  name: string;
  dni: string;
  file: number;
  supervisorName: string;
  supervisoremail: string;
  siteResponsibleName: string[];
  siteResponsibleEmail: string[];
};

export const getUserByFileAndDni = async (file: string, dni: string): Promise<user | null> => {
  const result = await sql`SELECT * FROM "Users" WHERE file = ${file} AND dni = ${dni} LIMIT 1`;
  return result.rows[0] as user;
};

export const getUserByFile = async (file: string): Promise<user | null> => {
  const result = await sql`
  select usr.file, usr.name, sup.name as supervisorName, sup.email as supervisorEmail, array_agg( sru.name) as "siteResponsibleName", array_agg(sru.email) as "siteResponsibleEmail"
    from "Users" usr 
    join "Users" sup 
    on usr.supervisor=sup.file 
    join "SiteResponsible" sr
    on sr.site = usr.site
    join "Users" sru
    on sr.responsible = sru.file 
    where usr.file = ${file}
    group by usr.file, usr.name, sup.name, sup.email`;
  console.log(result);

  return result.rows[0] as user;
};
