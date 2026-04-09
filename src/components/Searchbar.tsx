'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { deleteUser } from '@/server/actions/deleteUser/deleteUser';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type User = {
  file: string;
  name: string;
  email: string;
  supervisor: string;
  supervisorname: string;
  supervisoremail: string;
};

export default function UserSearch({ users, initialSearch = '' }: { users: User[]; initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    router.push(`/admin/users?${params.toString()}`);
  }, [debouncedSearch, router]);

  const handleDelete = async () => {
    if (!userToDelete) return;
    setLoading(true);
    await deleteUser(userToDelete.file);
    setUserToDelete(null);
    setLoading(false);
    router.refresh();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Buscar por nombre o legajo..."
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3, width: { xs: '100%', sm: 300 }, maxWidth: '100%' }}
      />

      {isMobile ? (
        <Stack spacing={2}>
          {users.map((user) => (
            <Card key={user.file} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ mb: 1 }}>
                    <strong>Nombre:</strong> {user.name}
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <strong>Legajo:</strong> {user.file}
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <strong>Supervisor/a:</strong> {user.supervisorname}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link href={`/admin/users/${user.file}/edit`}>
                    <IconButton size="small">
                      <EditIcon color="success" />
                    </IconButton>
                  </Link>
                  <IconButton size="small" onClick={() => setUserToDelete(user)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre del colaborador/a</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Legajo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Supervisor/a</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.file} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.file}</TableCell>
                  <TableCell>{user.supervisorname}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Link href={`/admin/users/${user.file}/edit`}>
                      <IconButton size="small">
                        <EditIcon color="success" />
                      </IconButton>
                    </Link>
                    <IconButton size="small" onClick={() => setUserToDelete(user)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog de confirmación */}
      <Dialog open={!!userToDelete} onClose={() => !loading && setUserToDelete(null)}>
        <DialogTitle>Confirmar eliminación de usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro/a que querés eliminar a <strong>{userToDelete?.name}</strong>?<br></br>
            ¡Esta acción no se puede deshacer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={loading}>
            {loading ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
