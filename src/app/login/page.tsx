//import { sql } from "@vercel/postgres";

import { Box } from "@mui/material";
import Login from "./Form";

export default async function Home() {
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100dvh",
      }}
    >
      <Login />
    </Box>
  );
}
