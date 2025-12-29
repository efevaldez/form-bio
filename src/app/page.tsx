


import Logout from "@/components/Logout";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Dashboard () {
    const hash = (await cookies()).get('hash')?.value
   if(!hash) return redirect('/login')

    const result = await sql `SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`
    return(
        <>
        <h1>Hola {result.rows[0].name}</h1>
        <Logout/>
        </>
    )
}