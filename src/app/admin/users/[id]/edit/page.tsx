import { Box, Container } from '@mui/material';
import { sql } from '@vercel/postgres';
import EditUserForm from './editUserForm';

interface User {
  id: string;
  name: string;
  file: string;
  dni: string;
  supervisor: string;
  site: string;
}
export default async function EditUserPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { rows } = await sql`SELECT * FROM "Users" WHERE file = ${id}`;
  const user = rows[0] as User;

  const { rows: supervisors } = await sql`SELECT file, name FROM "Users" ORDER BY name ASC`;
  const supervisorOptions = supervisors.map((s) => ({
    value: s.file,
    label: s.name,
  }));

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: { xs: 1.5, sm: 2, md: 2.5, lg: 3 }, px: { xs: 1, sm: 2 } }}>
        <EditUserForm user={user} supervisorOptions={supervisorOptions} />
      </Box>
    </Container>
  );
}
