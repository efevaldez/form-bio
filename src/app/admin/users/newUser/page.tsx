import { sql } from '@vercel/postgres';
import UserForm from './userForm';

export default async function NewUserPage() {
  const { rows } = await sql`
    SELECT file, name FROM "Users" ORDER BY name ASC
  `;

  const supervisorOptions = rows.map((s) => ({
    value: s.file,
    label: s.name,
  }));

  return <UserForm supervisorOptions={supervisorOptions} />;
}
