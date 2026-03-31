"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { createUser } from "@/server/actions/createUser/createUser";
import { Paper, Typography } from "@mui/material";
import Logout from "@/components/Logout";


export default function UserForm({
  supervisorOptions= [],
}: {
  supervisorOptions: { value: string; label: string }[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    try {
      await createUser(formData);
      setSuccess(true);
      setTimeout(() => {window.location.assign("/admin/users")}, 1500);
    } catch (error) {
         if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
      setError("Error al crear el usuario. Intente nuevamente.");}
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",           
          padding: "20px 40px",           
          maxWidth: 900,                  
          mx: "auto"                      
        }}
      >
     <Typography variant="h4" component="h1" padding={4}>
        Crear nuevo usuario
      </Typography>
      <Logout />
      </Box>
    <Paper
    elevation={3}
    sx={{
      p: 4,
      mt: 8,
      mx: "auto",
      maxWidth: 550,
      borderRadius: '16px'
    }}>
    <Box
      component="form"
      action={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Usuario creado correctamente.</Alert>} 

      <TextField name="name" label="Nombre" required />
      <TextField name="file" label="Legajo" required />
      <TextField name="dni" label="DNI" required />
      <TextField name="site" label="Site" required />

      <FormControl required>
        <InputLabel id="supervisor-label">Supervisor/a</InputLabel>
        <Select
          labelId="supervisor-label"
          name="supervisor"
          label="Supervisor"
          defaultValue=""
        >
          <MenuItem value="" disabled>
            Seleccionar supervisor/a
          </MenuItem>
          {supervisorOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Creando..." : "Crear"}
      </Button>
    </Box>
    </Paper>
    </>
  );
}