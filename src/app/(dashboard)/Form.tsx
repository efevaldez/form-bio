"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid, styled } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Daypicker from "@/components/Daypicker";


const Report = () => {
  const excusesOptions = Object.entries(excuse).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const [selectedExcuse, setSelectedExcuse] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
  const handleSubmit = () => {
    submitExcuse({ selectedExcuse }); //llame a files y esta mal verificar porq
  };

 

  return (
    <Grid container flexDirection={"column"} gap={2}>
      <BasicSelect
        label="Motivos"
        options={excusesOptions}
        value={selectedExcuse}
        onChange={setSelectedExcuse}
      />

       <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Cargar archivos
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {if (event.target.files) {
              setFiles(Array.from(event.target.files));}
        }}
      />
      </Button>

      <Daypicker />
    
    

  

      <Button variant="contained" onClick={() => handleSubmit()}>
        Enviar
      </Button>
    </Grid>
  );
};

export default Report;
