"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id?: string;
  label: string;
  options: { value: string; label: string }[];
  value?: string | number;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const optionsExtended = [
    // {
    //   value: "",
    //   label: "Seleccione una opción",
    // },
    ...options,
  ];
  return (
    <Box sx={{ m: 1, minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="basic-select-label">{label}</InputLabel>
        <Select
          labelId="basic-select-label"
          id={id}
          value={value}
          label={label}
          // displayEmpty
          onChange={(event) => onChange(event.target.value as string)}
        >
          {optionsExtended.map(({ value, label }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
