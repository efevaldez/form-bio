// esto sería el dashboard de todos los usuarios


import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { loginAuth } from "@/pages/api/auth/[...nextauth]";
import { IconButton } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Searchbar from "@/components/Searchbar";
import Logout from "@/components/Logout";

export default async function AdminUsersPage() {

  const session = await getServerSession(loginAuth);

  if (!session) {
    redirect("/login");
  }

  const { rows: users } = await sql` select
     usr.*,
   sup.name as supervisorName,
    sup.email as supervisorEmail
    from "Users" usr 
     join "Users" sup 
    on usr.supervisor=sup.file 
    order by usr.name asc`;
  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Nómina activa Biosidus</h1>
        <Link href="/admin/users/newUser">
          <IconButton>
            <AddCircleIcon fontSize="large" color="primary" />
          </IconButton>
        </Link>
        <Logout />
      </header>
      <Searchbar users={users} />
      

      <table style={{ width: "100%", marginTop: "2rem", borderCollapse: "collapse" }}>
        <thead>
          <tr key="header" style={{ borderBottom: "2px solid #333", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Nombre del colaborador/a</th>
            <th style={{ padding: "12px" }}>Legajo</th>
            <th style={{ padding: "12px" }}>Supervisor/a</th>
            <th style={{ padding: "12px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "12px" }}>{user.name}</td>
              <td style={{ padding: "12px" }}>{user.file}</td>
              <td style={{ padding: "12px" }}>{user.supervisorname}</td>
              <td style={{ padding: "12px" }}>
                <Link href={`/admin/users/${user.file}/edit`}>
                  <IconButton>
                    <EditIcon fontSize="large" color="success" />
                  </IconButton>
                </Link>
        
                <Link href={`/admin/users/${user.file}/delete`}>
                  <IconButton>
                    <DeleteIcon fontSize="large" color="error" />
                  </IconButton>
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}