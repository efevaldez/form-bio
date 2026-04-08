'use client';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';

type Option = {
  value: string;
  label: string;
};

export default function Select({
  id,
  label,
  options,
  onChange,
  name,
  value,
  error,
  helperText,
}: {
  id?: string;
  label: string;
  options: Option[];
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth size="small" error={Boolean(error)}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>

        <MuiSelect
          labelId={`${id}-label`}
          id={id}
          name={name}
          value={value ?? ''}
          label={label}
          onChange={(e) => onChange?.(e.target.value as string)}
          required
        >
          <MenuItem value="">Seleccionar</MenuItem>

          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

// "use client";

// import * as React from "react";
// import { FormControl, InputLabel, Select as MuiSelect, MenuItem, SelectChangeEvent } from "@mui/material";

// export default function Select({
//   id = "supervisor-select", // Le damos un ID por defecto si no viene uno
//   label,
//   options,
//   value,
//   onChange,
//   name,
// }: {
//   id?: string;
//   label: string;
//   options: { value: string; label: string }[];
//   value: string;
//   onChange: (val: string) => void;
//   name?: string;
// }) {
//   // Creamos un ID único para el label que coincida con el Select
//   const labelId = `${id}-label`;

//   const handleChange = (event: SelectChangeEvent<string>) => {
//     // Esto asegura que el cambio se procese de inmediato
//     onChange(event.target.value);
//   };

//   return (
//     <FormControl fullWidth size="small" required>
//       {/* 1. El ID del Label debe ser el labelId */}
//       <InputLabel id={labelId}>{label}</InputLabel>

//       <MuiSelect
//         labelId={labelId} // 2. El Select debe referenciar ese mismo labelId
//         id={id}
//         name={name}
//         value={value ?? ""}
//         label={label}
//         onChange={handleChange}
//         required
//         sx={{
//           borderRadius: "10px",
//           "& .MuiSelect-select": {
//             padding: "16px 14px",
//           },
//         }}
//       >
//         <MenuItem value="" disabled>
//           <em>Seleccione un supervisor</em>
//         </MenuItem>

//         {options.map((opt) => (
//           <MenuItem key={opt.value} value={opt.value}>
//             {opt.label}
//           </MenuItem>
//         ))}
//       </MuiSelect>
//     </FormControl>
//   );
// }

// "use client";

// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { SxProps } from "@mui/material";
// import { Theme } from "@mui/material/styles";

// export default function BasicSelect({
//   id,
//   label,
//   options,
//   value,
//   onChange,
//   name
// }: {
//   id?: string;
//   label: string;
//   options: { value: string; label: string }[];
//   value?: string | number;
//   //onChange?: React.Dispatch<React.SetStateAction<string>>;
//   onChange?:    (value: string) => void;
//   name?: string;
//   sx?: SxProps<Theme>;
// }) {
//   const optionsExtended = [
//     // {
//     //   value: "",
//     //   label: "Seleccione una opción",
//     // },
//     ...options,
//   ];
//   return (
//     <Box sx={{// m: 1, minWidth: 120
//       width: "100%"}}>
//       <FormControl fullWidth size="small">
//         <InputLabel id="basic-select-label">{label}</InputLabel>
//         <Select
//           labelId="basic-select-label"
//           id={id}
//           name={name}
//           value={value ?? ""}
//           label={label}
//           onChange={(event) => onChange?.(event.target.value as string)}
//           required
//           sx={{
//             borderRadius: "10px",
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "10px",
//               height: 56,
//             },

//           }}
//         >
//           {optionsExtended.map(({ value, label }) => (
//             <MenuItem key={value} value={value}>{label}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }
