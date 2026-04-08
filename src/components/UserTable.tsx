import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

export type User = {
  file: number;
  name: string;
  email: string;
  supervisor: string;
  supervisorname: string;
  supervisoremail: string;
};

export default function UserTable({ users }: { users: User[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
            <TableCell style={{ padding: '12px' }}>Nombre del colaborador/a</TableCell>
            <TableCell style={{ padding: '12px' }}>Legajo</TableCell>
            <TableCell style={{ padding: '12px' }}>Supervisor/a</TableCell>
            <TableCell style={{ padding: '12px' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.file} style={{ borderBottom: '1px solid #ddd' }}>
              <TableCell style={{ padding: '12px' }}>{user.name}</TableCell>
              <TableCell style={{ padding: '12px' }}>{user.file}</TableCell>
              <TableCell style={{ padding: '12px' }}>{user.supervisorname}</TableCell>
              <TableCell style={{ padding: '12px' }}>
                <Link href={`/admin/users/${user.file}/edit`}>
                  <IconButton>
                    <EditIcon fontSize="large" color="success" />
                  </IconButton>
                </Link>
                <Link href={`/admin/users/${user.file}/delete`}>
                  <IconButton>
                    <DeleteIcon fontSize="large" color="error" />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
