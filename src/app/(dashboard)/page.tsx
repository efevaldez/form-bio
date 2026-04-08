import Logout from '@/components/Logout';
import { loginAuth } from '@/pages/api/auth/[...nextauth]';
import capitalize from '@/utils/capitalize';
import { Box } from '@mui/material';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Report from './Form';

export default async function Dashboard() {
  const session = await getServerSession(loginAuth);

  const hash = (await cookies()).get('hash')?.value;
  // if (!hash) return redirect("/login");

  let userName = '';

  if (session) {
    return redirect('/admin/users');
  } else if (hash) {
    const result = await sql`SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`;

    if (result.rows.length > 0) {
      userName = result.rows[0].name;
    } else {
      return redirect('/login');
    }
  } else {
    return redirect('/login');
  }

  // const result =
  //   await sql`SELECT name FROM "Users" WHERE file = ${hash} LIMIT 1`;

  // const userName = result.rows[0].name;

  return (
    <Box
      component={'main'}
      sx={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1> ¡Hola {capitalize(userName)}! </h1>
        <Logout />
      </Box>
      <Report />
    </Box>
  );
}
