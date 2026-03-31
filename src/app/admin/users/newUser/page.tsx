import { sql } from "@vercel/postgres";
import UserForm from "./userForm";

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

// "use client";

// import { useState } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Button from "@mui/material/Button";
// import Alert from "@mui/material/Alert";
// import { createUser } from "@/server/actions/createUser/createUser";

// export default function UserForm({
//   supervisorOptions= [],
// }: {
//   supervisorOptions: { value: string; label: string }[];
// }) {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(formData: FormData) {
//     setError(null);
//     setLoading(true);
//     try {
//       await createUser(formData);
//     } catch (error) {
//       setError("Error al crear el usuario. Intente nuevamente.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box
//       component="form"
//       action={handleSubmit}
//       sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}
//     >
//       {error && <Alert severity="error">{error}</Alert>}

//       <TextField name="name" label="Nombre" required />
//       <TextField name="file" label="Legajo" required />
//       <TextField name="dni" label="DNI" required />
//       <TextField name="site" label="Site" required />

//       <FormControl required>
//         <InputLabel id="supervisor-label">Supervisor</InputLabel>
//         <Select
//           labelId="supervisor-label"
//           name="supervisor"
//           label="Supervisor"
//           defaultValue=""
//         >
//           <MenuItem value="" disabled>
//             Seleccionar supervisor
//           </MenuItem>
//           {supervisorOptions.map((opt) => (
//             <MenuItem key={opt.value} value={opt.value}>
//               {opt.label}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Button type="submit" variant="contained" disabled={loading}>
//         {loading ? "Creando..." : "Crear"}
//       </Button>
//     </Box>
//   );
// }
// export default function UserForm({ supervisorOptions }: { supervisorOptions: { value: string, label: string }[] }) {

//   const [supervisor, setSupervisor] = useState("");

//   return (
//     <Box component="form" action={createUser} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      
//       <TextField label="Nombre Completo" name="name" required fullWidth />
//       <TextField label="Legajo" name="file" required fullWidth />
//       <TextField label="DNI" name="dni" required fullWidth />
//       <TextField label="Site" name="site" required fullWidth />

   
//       <Select
//         id="supervisor-select"
//   label="Seleccionar supervisor/a"
//   name="supervisor"
//   value={supervisor}
//   onChange={(val) => setSupervisor(val)}
//   options={supervisorOptions}
//   required
//       />

//     </Box>
//   );
// }