// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";
// import Button from "@mui/material/Button";
// import { Box, Container } from "@mui/material";

// export default async function DeleteUserPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   const { rows } = await sql`SELECT * FROM "Users" WHERE file = ${id}`;
//   const user = rows[0];

//   if (!user) {
//     redirect("/admin/users");
//   }

  // async function handleDelete() {
  //   "use server";
  //   await deleteUser(id);
  //   redirect("/admin/users");
  // }

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 }, px: { xs: 1, sm: 2 } }}>
//         <h1 style={{ fontSize: "clamp(1.25rem, 5vw, 1.875rem)" }}>¿Estás seguro que querés eliminar a <strong>{user.name}</strong>?</h1>
//         <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 2 }, marginTop: { xs: "1rem", sm: "1.5rem" } }}>
//           <form action={handleDelete}>
//             <Button type="submit" variant="contained" color="error" sx={{ width: { xs: "100%", sm: "auto" } }}>
//               Sí, eliminar
//             </Button>
//           </form>
//           <Button variant="outlined" href="/admin/users" sx={{ width: { xs: "100%", sm: "auto" } }}>
//             Cancelar
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }





// import { deleteUser } from "@/server/actions/deleteUser/deleteUser";
// import { redirect } from "next/navigation";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// export default async function DeleteUserPage({ params }: { params: { id: string } }) {
//     const {id} = await params;
//   async function handleDelete() {
//     "use server";
//     await deleteUser(id);
//     redirect("/admin/users");
//   }

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <h1>`¿Estás seguro que querés eliminar este usuario?</h1>
//       <Box sx={{ display: "flex", gap: 2, marginTop: "1rem" }}>
//         <form action={handleDelete}>
//           <Button type="submit" variant="contained" color="error">
//             Sí, eliminar
//           </Button>
//         </form>
//         <Button variant="outlined" href="/admin/users">
//           Cancelar
//         </Button>
//       </Box>
//     </Box>
//   );
// }