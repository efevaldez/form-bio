'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

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
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams();
    if (value) params.set('search', value);
    router.push(`/admin/users?${params.toString()}`);
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
        sx={{ mb: 3, width: 300 }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Nombre del colaborador/a</th>
            <th style={{ padding: '12px' }}>Legajo</th>
            <th style={{ padding: '12px' }}>Supervisor/a</th>
            <th style={{ padding: '12px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.file} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{user.name}</td>
              <td style={{ padding: '12px' }}>{user.file}</td>
              <td style={{ padding: '12px' }}>{user.supervisorname}</td>
              <td style={{ padding: '12px' }}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}


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
