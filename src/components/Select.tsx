'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
//   const [value, setValue] = React.useState('');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

  return (
    <Box sx={{ m: 1, minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="basic-select-label">Motivos:</InputLabel>
        <Select
          labelId="basic-select-label"
          id="basic-select"
          //value={value}
          label="Opciones"
         // onChange={handleChange}
        >
          <MenuItem value={10}>Enfermedad</MenuItem>
          <MenuItem value={20}>Enfermedad de familiar</MenuItem>
          <MenuItem value={30}>Día de estudio</MenuItem>
          <MenuItem value={40}>Otros</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
