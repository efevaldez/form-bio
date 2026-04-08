'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, TextField, InputAdornment, IconButton, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Stack, useMediaQuery, useTheme,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { deleteUser } from '@/server/actions/deleteUser/deleteUser';

export type User = {
  file: string;
  name: string;
  email: string;
  supervisor: string;
  supervisorname: string;
  supervisoremail: string;
};

export default function UserSearch({ users, initialSearch = '' }: { users: User[], initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams();
    if (value) params.set('search', value);
    router.push(`/admin/users?${params.toString()}`);
  };

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
        onChange={(e) => handleSearch(e.target.value)}
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
                  <Box sx={{ mb: 1 }}><strong>Nombre:</strong> {user.name}</Box>
                  <Box sx={{ mb: 1 }}><strong>Legajo:</strong> {user.file}</Box>
                  <Box sx={{ mb: 2 }}><strong>Supervisor/a:</strong> {user.supervisorname}</Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link href={`/admin/users/${user.file}/edit`}>
                    <IconButton size="small"><EditIcon color="success" /></IconButton>
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
                      <IconButton size="small"><EditIcon color="success" /></IconButton>
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
            ¿Estás seguro/a que querés eliminar a <strong>{userToDelete?.name}</strong>? 
            <br></br>
            ¡Esta acción no se puede deshacer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)} disabled={loading}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={loading}>
            {loading ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}



// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Stack,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Link from 'next/link';

// export type User = {
//   file: string;
//   name: string;
//   email: string;
//   supervisor: string;
//   supervisorname: string;
//   supervisoremail: string;
// };

// export default function UserSearch({ users, initialSearch = '' }: { users: User[], initialSearch?: string }) {
//   const [search, setSearch] = useState(initialSearch);
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleSearch = (value: string) => {
//     setSearch(value);
//     const params = new URLSearchParams();
//     if (value) params.set('search', value);
//     router.push(`/admin/users?${params.toString()}`);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <TextField
//         label="Buscar por nombre o legajo..."
//         variant="standard"
//         value={search}
//         onChange={(e) => handleSearch(e.target.value)}
//         slotProps={{
//           input: {
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonSearchIcon />
//               </InputAdornment>
//             ),
//           },
//         }}
//         sx={{
//           mb: 3,
//           width: { xs: '100%', sm: 300 },
//           maxWidth: '100%',
//         }}
//       />

//       {isMobile ? (
//         // Mobile Card View
//         <Stack spacing={2}>
//           {users.map((user) => (
//             <Card key={user.file} sx={{ mb: 2 }}>
//               <CardContent>
//                 <Box sx={{ mb: 2 }}>
//                   <Box sx={{ mb: 1 }}>
//                     <strong>Nombre:</strong> {user.name}
//                   </Box>
//                   <Box sx={{ mb: 1 }}>
//                     <strong>Legajo:</strong> {user.file}
//                   </Box>
//                   <Box sx={{ mb: 2 }}>
//                     <strong>Supervisor/a:</strong> {user.supervisorname}
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <Link href={`/admin/users/${user.file}/edit`}>
//                     <IconButton size="small">
//                       <EditIcon color="success" />
//                     </IconButton>
//                   </Link>
//                   <Link href={`/admin/users/${user.file}/delete`}>
//                     <IconButton size="small">
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   </Link>
//                 </Box>
//               </CardContent>
//             </Card>
//           ))}
//         </Stack>
//       ) : (
//         // Desktop Table View
//         <TableContainer component={Paper}>
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Nombre del colaborador/a</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Legajo</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Supervisor/a</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.file} hover>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.file}</TableCell>
//                   <TableCell>{user.supervisorname}</TableCell>
//                   <TableCell sx={{ textAlign: 'center' }}>
//                     <Link href={`/admin/users/${user.file}/edit`}>
//                       <IconButton size="small">
//                         <EditIcon color="success" />
//                       </IconButton>
//                     </Link>
//                     <Link href={`/admin/users/${user.file}/delete`}>
//                       <IconButton size="small">
//                         <DeleteIcon color="error" />
//                       </IconButton>
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Link from 'next/link';

// export type User = {
//   file: string;
//   name: string;
//   email: string;
//   supervisor: string;
//   supervisorname: string;
//   supervisoremail: string;
// };

// export default function UserSearch({ users, initialSearch = '' }: { users: User[], initialSearch?: string }) {
//   const [search, setSearch] = useState(initialSearch);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       const params = new URLSearchParams();
//       if (search) {
//         params.set('search', search);
//       }
//       router.replace(`${pathname}?${params.toString()}`);
//     }, 300); // Debounce 300ms

//     return () => clearTimeout(timeoutId);
//   }, [search, router, pathname]);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <TextField
//         label="Buscar por nombre, legajo o supervisor..."
//         variant="standard"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         slotProps={{
//           input: {
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonSearchIcon />
//               </InputAdornment>
//             ),
//           },
//         }}
//         sx={{ mb: 3, width: 300 }}
//       />

//      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
//             <th style={{ padding: '12px' }}>Nombre del colaborador/a</th>
//             <th style={{ padding: '12px' }}>Legajo</th>
//             <th style={{ padding: '12px' }}>Supervisor/a</th>
//             <th style={{ padding: '12px' }}>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.file} style={{ borderBottom: '1px solid #ddd' }}>
//               <td style={{ padding: '12px' }}>{user.name}</td>
//               <td style={{ padding: '12px' }}>{user.file}</td>
//               <td style={{ padding: '12px' }}>{user.supervisorname}</td>
//               <td style={{ padding: '12px' }}>
//                 <Link href={`/admin/users/${user.file}/edit`}>
//                   <IconButton>
//                     <EditIcon fontSize="large" color="success" />
//                   </IconButton>
//                 </Link>
//                 <Link href={`/admin/users/${user.file}/delete`}>
//                   <IconButton>
//                     <DeleteIcon fontSize="large" color="error" />
//                   </IconButton>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table> 
//     </Box>
//   );
// }
