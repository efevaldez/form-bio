import Logout from "@/components/Logout";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Report from "./Form";
import { getServerSession } from "next-auth";
import { loginAuth } from "@/pages/api/auth/[...nextauth]";


export default async function Dashboard() {
  const session = await getServerSession(loginAuth);

  const hash = (await cookies()).get("hash")?.value;
  // if (!hash) return redirect("/login");

  let userName = "";

  if (session) {
    return redirect('/admin/users');
  }
  else if (hash) {
    const result = await sql`SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`;
    
    if (result.rows.length > 0) {
      userName = result.rows[0].name;
    } else {
      return redirect("/login");
    }
  } else {
    return redirect("/login");
  }

  // const result =
  //   await sql`SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`;

  // const userName = result.rows[0].name;

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
