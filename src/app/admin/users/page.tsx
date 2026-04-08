// esto sería el dashboard de todos los usuarios

import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { loginAuth } from "@/pages/api/auth/[...nextauth]";
import { Box, IconButton, Container } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Searchbar, { type User } from "@/components/Searchbar";
import Logout from "@/components/Logout";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {

  const session = await getServerSession(loginAuth);

  if (!session) {
    redirect("/login");
  }

  const { search = '' } = await searchParams;

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
      where usr.name ilike ${'%' + search + '%'} or usr.file::text ilike ${'%' + search + '%'} or sup.name ilike ${'%' + search + '%'}
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
    <Container maxWidth="lg" sx={{ py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 }, px: { xs: 1, sm: 2 } }}>
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "flex-start", sm: "space-between" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 1, sm: 2 },
          mb: { xs: 2, sm: 3 },
          flexWrap: "wrap"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(1.25rem, 5vw, 2rem)" }}>Nómina activa Biosidus</h1>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: { xs: 0, sm: "auto" },
            flexWrap: "wrap"
          }}
        >
          <Link href="/admin/users/newUser">
            <IconButton size="large">
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </Link>
          <Logout />
        </Box>
      </Box>
      <Box>
        <Searchbar users={users} initialSearch={search} />
      </Box>
    </Container>
  );
}