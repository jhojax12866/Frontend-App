import React, { useState } from 'react';
import { Button, Select, Typography, Grid, FormControl, InputLabel } from '@mui/material';
import './styles/Fecha.css'; 

function FormularioFecha() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const years = Array.from({ length: 50 }, (_, i) => String(2018 + i)); // Genera años desde 2018 hasta 2067

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year && month) {
      // Redirigir a la página Inicio con los datos seleccionados
      window.location.href = `/Inicio?year=${year}&month=${month}`;
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #2980B9, #6DD5FA)', minHeight: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '-10px 0' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={2.5} style={{ background: 'white', padding: '35px', borderRadius: '50px', boxShadow: '1px 15px 4px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Seleccione un mes y un año
          </Typography>
          <FormControl className="form-control" fullWidth>
            <InputLabel className="input-label">Año</InputLabel>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              native
              className="select"
            >
              <option value="">Seleccione un año</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl className="form-control" fullWidth>
            <InputLabel className="input-label">Mes</InputLabel>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              native
              className="select"
            >
              <option value="">Seleccione un mes</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={String(m).padStart(2, '0')}>{new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}</option>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            style={{ transition: 'background-color 0.3s', backgroundColor: '#2196F3', color: 'white' }}
            sx={{
              '&:hover': {
                backgroundColor: '#0D47A1',
              },
            }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FormularioFecha;
