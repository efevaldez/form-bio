"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Paper, Typography } from "@mui/material";
import { updateUser } from "@/server/actions/updateUser/updateUser";
import Logout from "@/components/Logout";

interface User {
 // id: number;
  name: string;
  file: string;
  dni: string;
  supervisor: string;
  site: string;
}
export default function EditUserForm({
  user,
  supervisorOptions = [],
}: {
  user: User;
  supervisorOptions: { value: string; label: string }[];
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    file: '',
    site: '',
    supervisor: ''
  });

  const validateFields = (formData: FormData) => {
    const errors = { name: '', file: '', site: '', supervisor: '' };
    let hasError = false;

    const name = (formData.get('name') as string || '').trim();
   const file = (formData.get('file') as string || '').trim();
    const site = (formData.get('site') as string || '').trim();
    const supervisor = formData.get('supervisor') as string || '';

    if (!name) {
      errors.name = 'El nombre es requerido';
      hasError = true;
    }

    if (!file) {
      errors.file = 'El legajo es requerido';
      hasError = true;
    }

    if (!site) {
      errors.site = 'El site es requerido';
      hasError = true;
    }

    if (!supervisor) {
      errors.supervisor = 'Seleccionar un supervisor/a';
      hasError = true;
    }

    return { hasError, errors };
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { hasError, errors } = validateFields(formData);
    if (hasError) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({ name: '',  site: '', file: '', supervisor: '' });
    setError(null);
    setLoading(true);
    try {
      await updateUser(user.file, formData);
      setSuccess(true);
      setTimeout(() => window.location.assign("/admin/users"), 1500);
    } catch {
      setError("Error al actualizar el usuario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "flex-start", sm: "space-between" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 1, sm: 2 },
          padding: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          maxWidth: 900,                  
          mx: "auto"                      
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
          Editar usuario
        </Typography>
        <Logout />
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 4, sm: 6, md: 8 },
          mx: "auto",
          maxWidth: { xs: "95%", sm: 550 },
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: '16px'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Usuario actualizado correctamente.</Alert>}

          <TextField
            name="name"
            label="Nombre"
            defaultValue={user.name}
            required
            error={Boolean(fieldErrors.name)}
            helperText={fieldErrors.name}
            fullWidth
          />
          <TextField
            name="file"
            label="Legajo"
            defaultValue={user.file}
            required
            error={Boolean(fieldErrors.file)}
            helperText={fieldErrors.file}
            fullWidth
          /> 
          <TextField name="dni" label="DNI" defaultValue={user.dni} required fullWidth />
          <TextField
            name="site"
            label="Site"
            defaultValue={user.site}
            required
            error={Boolean(fieldErrors.site)}
            helperText={fieldErrors.site}
            fullWidth
          />

          <FormControl fullWidth required error={Boolean(fieldErrors.supervisor)}>
            <InputLabel id="supervisor-label">Supervisor/a</InputLabel>
            <Select labelId="supervisor-label" name="supervisor" label="Supervisor/a" defaultValue={user.supervisor}>
              {supervisorOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {fieldErrors.supervisor && <FormHelperText>{fieldErrors.supervisor}</FormHelperText>}
          </FormControl>

          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}