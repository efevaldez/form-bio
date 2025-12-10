import { sql } from "@vercel/postgres";

export default async function Home() {
  const result = await sql`select * from "Users" order by name DESC LIMIT 10;`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Users
          </h1>

          <div className="flex flex-col gap-4">
            {result.rows.map((user) => (
              <div
                key={user.file}
                className="flex items-center justify-between border-t border-zinc-200 py-4 dark:border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user.sector}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
