import React, { useState } from 'react';
import { Button, Select, MenuItem, Typography, Grid, FormControl, InputLabel } from '@mui/material';


function FormularioFecha() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const years = Array.from({ length: 50 }, (_, i) => String(2022 + i)); // Genera años desde 2022 hasta 2071

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year && month) {
      // Redirigir a la página Inicio con los datos seleccionados
      window.location.href = `/Inicio?year=${year}&month=${month}`;
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Seleccione un mes y un año
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Año</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)} required>
            <MenuItem value="">Seleccione un año</MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Mes</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)} required>
            <MenuItem value="">Seleccione un mes</MenuItem>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <MenuItem key={m} value={String(m).padStart(2, '0')}>{new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button fullWidth type="submit" onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
}

export default FormularioFecha;
