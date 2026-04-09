'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function deleteUser(file: string) {
  try {
    await sql`DELETE FROM "Users" WHERE file = ${file}`;
    revalidatePath('/admin/users');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw new Error('Error al eliminar el usuario');
  }
}
