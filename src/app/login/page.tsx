//import { sql } from "@vercel/postgres";

import { Box, Grid, Paper, Typography } from "@mui/material";
import Login from "./Form";

export default async function Home() {
  //const result = await sql`select * from "Users" order by name;`;

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
      <Paper sx={{ p: 4, maxWidth: "20rem", margin: "auto" }}>
        <Grid
          flexDirection={"column"}
          container
          justifyContent={"center"}
          alignContent={"center"}
          gap={2}
        >
          <Typography variant="h1">Reporte de ausencias</Typography>
          <Login />
          {/* <div className="flex flex-col gap-4">
            {result.rows.map((user) => (
              <div
                key={user.file}
                className="flex items-center justify-between border-t border-zinc-200 py-4 dark:border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.sector}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.supervisor}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.file}
                    </p>
                     <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.dni}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </Grid>
      </Paper>
    </Box>
  );
}
