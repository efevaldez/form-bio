// esto sería el dashboard de todos los usuarios

import Logout from "@/components/Logout";
import Searchbar from "@/components/Searchbar";
import UserTable, { User } from "@/components/UserTable";
import { loginAuth } from "@/pages/api/auth/[...nextauth]";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const session = await getServerSession(loginAuth);

  if (!session) {
    redirect("/login");
  }

  const { search = "" } = await searchParams;

  let query;

  if (search) {
    query = sql`
      select
       usr.*,
     sup.name as supervisorName,
      sup.email as supervisorEmail
      from "Users" usr 
       join "Users" sup 
      on usr.supervisor=sup.file 
      where usr.name ilike ${"%" + search + "%"} or usr.file::text ilike ${"%" + search + "%"} or sup.name ilike ${"%" + search + "%"}
      order by usr.name asc
    `;
  } else {
    query = sql`
      select
       usr.*,
     sup.name as supervisorName,
      sup.email as supervisorEmail
      from "Users" usr 
       join "Users" sup 
      on usr.supervisor=sup.file 
      order by usr.name asc
    `;
  }

  const result = await query;
  const users = result.rows as User[];

  return (
    <div style={{ padding: "2rem" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Nómina activa Biosidus</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "auto",
          }}
        >
          <Link href="/admin/users/newUser">
            <IconButton>
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Link>
          <Logout />
        </div>
      </header>
      <Searchbar initialSearch={search} />
      {users.length > 0 ? <UserTable users={users} /> : <p>No se encontraron resultados</p>}
    </div>
  );
}
