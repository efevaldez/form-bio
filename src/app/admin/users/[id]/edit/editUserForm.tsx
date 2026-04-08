'use client';

import { updateUser } from '@/server/actions/updateUser/updateUser';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

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

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    try {
      await updateUser(user.file, formData);
      setSuccess(true);
      setTimeout(() => window.location.assign('/admin/users'), 1500);
    } catch {
      setError('Error al actualizar el usuario. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      action={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 480 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Usuario actualizado correctamente.</Alert>}

      <TextField name="name" label="Nombre" defaultValue={user.name} required />
      <TextField name="file" label="Legajo" defaultValue={user.file} required />
      {/* <TextField name="dni" label="DNI" defaultValue={user.dni} required /> */}
      <TextField name="site" label="Site" defaultValue={user.site} required />

      <FormControl required>
        <InputLabel id="supervisor-label">Supervisor/a</InputLabel>
        <Select labelId="supervisor-label" name="supervisor" label="Supervisor/a" defaultValue={user.supervisor}>
          {supervisorOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </Button>
    </Box>
  );
}
