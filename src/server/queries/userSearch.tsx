import { sql } from '@vercel/postgres';
import UserSearch,{ type User } from '@/components/Searchbar';

export default async function Page() {
  const { rows: users } = await sql`
    SELECT
      usr.*,
      sup.name  AS supervisorname,
      sup.email AS supervisoremail
    FROM "Users" usr
    JOIN "Users" sup ON usr.supervisor = sup.file
    ORDER BY usr.name ASC
  ` as { rows: User[] };

  return <UserSearch users={users} />;
}