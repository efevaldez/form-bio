'use client';

import { useDebounce } from '@/hooks/useDebounce';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserSearch({ initialSearch = '' }: { initialSearch?: string }) {
  const [search, setSearch] = useState(initialSearch);
  const debouncedSearch = useDebounce(search, 1500);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    router.push(`/admin/users?${params.toString()}`);
  }, [debouncedSearch, router]);

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Buscar por nombre o legajo..."
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
    </Box>
  );
}
