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
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    file: '',
    dni: '',
    site: '',
    supervisor: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    file: '',
    dni: '',
    site: '',
    supervisor: ''
  });

  const formatFile = (value: string) => value.replace(/\D/g, "").slice(0, 4);
  const formatDni = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  };

  const validateFields = () => {
    const errors = { name: '', file: '', dni: '', site: '', supervisor: '' };
    let hasError = false;

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
      hasError = true;
    }

    if (!formData.file.trim()) {
      errors.file = 'El legajo es requerido';
      hasError = true;
    }

    if (!formData.dni.trim()) {
      errors.dni = 'El DNI es requerido';
      hasError = true;
    }

    if (!formData.site.trim()) {
      errors.site = 'El site es requerido';
      hasError = true;
    }

    if (!formData.supervisor) {
      errors.supervisor = 'Seleccionar un supervisor/a';
      hasError = true;
    }

    return { hasError, errors };
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { hasError, errors } = validateFields();
    if (hasError) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({ name: '', file: '', dni: '', site: '', supervisor: '' });
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('file', formData.file.replace(/\D/g, ''));
      fd.append('dni', formData.dni.replace(/\D/g, ''));
      fd.append('site', formData.site);
      fd.append('supervisor', formData.supervisor);
      await createUser(fd);
      setSuccess(true);
      setTimeout(() => {window.location.assign("/admin/users")}, 1500);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        setError("Error al crear el usuario. Intente nuevamente.");
      }
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
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Usuario creado correctamente.</Alert>} 

      <TextField
        name="name"
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        error={Boolean(fieldErrors.name)}
        helperText={fieldErrors.name}
      />
      <TextField
        name="file"
        label="Legajo"
        value={formData.file}
        onChange={(e) => setFormData(prev => ({ ...prev, file: formatFile(e.target.value) }))}
        required
        error={Boolean(fieldErrors.file)}
        helperText={fieldErrors.file}
        slotProps={{
          htmlInput: {
            maxLength: 4,
            inputMode: "numeric",
            pattern: "[0-9]*",
          },
        }}
      />
      <TextField
        name="dni"
        label="DNI"
        value={formData.dni}
        onChange={(e) => setFormData(prev => ({ ...prev, dni: formatDni(e.target.value) }))}
        required
        error={Boolean(fieldErrors.dni)}
        helperText={fieldErrors.dni}
        slotProps={{
          htmlInput: {
            maxLength: 11,
            inputMode: "numeric",
            pattern: "[0-9.]*",
          },
        }}
      />
      <TextField
        name="site"
        label="Site"
        value={formData.site}
        onChange={(e) => setFormData(prev => ({ ...prev, site: e.target.value }))}
        required
        error={Boolean(fieldErrors.site)}
        helperText={fieldErrors.site}
      />

      <FormControl required error={Boolean(fieldErrors.supervisor)}>
        <InputLabel id="supervisor-label">Supervisor/a</InputLabel>
        <Select
          labelId="supervisor-label"
          name="supervisor"
          label="Supervisor"
          value={formData.supervisor}
          onChange={(e) => setFormData(prev => ({ ...prev, supervisor: e.target.value }))}
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
        {fieldErrors.supervisor && <FormHelperText>{fieldErrors.supervisor}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Creando..." : "Crear"}
      </Button>
    </Box>
    </Paper>
    </>
  );
}