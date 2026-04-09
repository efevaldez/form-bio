'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function updateUser(file: string, formData: FormData) {
  const name = formData.get('name') as string;
  // const dni = formData.get("dni") as string;
  // const file = formData.get("file") as string;
  const supervisor = formData.get('supervisor') as string;
  const site = formData.get('site') as string;

  if (!name || !supervisor || !site) {
    throw new Error('Todos los campos son obligatorios.');
  }

  try {
    await sql`
      UPDATE "Users"
      SET name = ${name}, supervisor = ${supervisor}, site = ${site}
      WHERE file = ${file}
    `;
    revalidatePath('/admin/users');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw new Error('Error al actualizar el usuario');
  }
}
