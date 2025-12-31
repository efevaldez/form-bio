"use client";

import BasicSelect from "@/components/Select";
import { submitExcuse } from "@/server/controllers/excuseController";
import { excuse } from "@/utils/const";
import { Button, Grid } from "@mui/material";
import { useState } from "react";

const Report = () => {
  const excusesOptions = Object.entries(excuse).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const [selectedExcuse, setSelectedExcuse] = useState("");

  const handleSubmit = () => {
    submitExcuse({ selectedExcuse });
  };

  return (
    <Grid container flexDirection={"column"} gap={2}>
      <BasicSelect
        label="Motivos"
        options={excusesOptions}
        value={selectedExcuse}
        onChange={setSelectedExcuse}
      />

      <Button variant="contained" onClick={() => handleSubmit()}>
        Enviar
      </Button>
    </Grid>
  );
};

export default Report;
