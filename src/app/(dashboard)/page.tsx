import Logout from "@/components/Logout";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Report from "./Form";

export default async function Dashboard() {
  const hash = (await cookies()).get("hash")?.value;
  if (!hash) return redirect("/login");

  const result =
    await sql`SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`;

  const userName = result.rows[0].name;

  return (
    <main style={{ 
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
       }}>

        <div style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems: 'center'
        }}>
          <h1> ¡Hola {userName}! </h1>
          <Logout />
        </div>

        <Report />
      {/* //<Logout />


      <h1>Hola {userName}</h1>
      <Report /> */}
      {/* <Logout /> */}

    </main>

  );
}
