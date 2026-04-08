import Logout from "@/components/Logout";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Report from "./Form";
import { getServerSession } from "next-auth";
import { loginAuth } from "@/pages/api/auth/[...nextauth]";
import { Box, Container } from "@mui/material";


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

  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{
          py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
          px: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "flex-start", sm: "space-between" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3 },
          }}
        >
          <h1 style={{ margin: 0, fontSize: "clamp(1.25rem, 5vw, 2rem)" }}>¡Hola {userName}!</h1>
          <Logout />
        </Box>

        <Report />
      </Box>
    </Container>
  );
}
