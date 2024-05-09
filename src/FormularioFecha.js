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
    <div className="form-container">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4} className="form-content">
          <img src="/images/fecha.png" alt="Fecha" className="Fecha" />
          <Typography variant="h4" align="center" gutterBottom>
            Seleccione un mes y un año
          </Typography>
          <FormControl className="form-control" fullWidth>
            <InputLabel className={`input-label ${year ? 'shrink' : ''}`} shrink={false}>Año</InputLabel>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              native
              className="select"
              style={{ marginLeft: '55px' }}
            >
              <option value=""></option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
            </Select>
          </FormControl>
          <FormControl className="form-control" fullWidth>
            <InputLabel className={`input-label ${month ? 'shrink' : ''}`} shrink={false}>Mes</InputLabel>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              native
              className="select"
              style={{ marginLeft: '55px' }}
            >
              <option value=""></option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={String(m).padStart(2, '0')}>
                  {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="button"
            sx={{ mt: 2 }}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FormularioFecha;
