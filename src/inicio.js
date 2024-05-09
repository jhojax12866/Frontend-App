import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TextField } from '@mui/material';
import './styles/Inicio.css';


function Inicio() {
  const [loans, setLoans] = useState(() => {
    const storedLoans = localStorage.getItem('loans');
    return storedLoans ? JSON.parse(storedLoans) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    amount: '',
  });

  const [editingLoanId, setEditingLoanId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProductDialogOpen, setNewProductDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingLoanId !== null) {
      const updatedLoans = loans.map((loan) =>
        loan.id === editingLoanId ? { ...loan, ...formData } : loan
      );
      setLoans(updatedLoans);
      setEditingLoanId(null);
      setIsEditing(false);
    } else {
      const newLoan = {
        id: loans.length + 1,
        name: formData.name,
        date: formData.date,
        amount: parseFloat(formData.amount),
      };
      setLoans([...loans, newLoan]);
      setFormData({ name: '', date: '', amount: '' });
    }
  };

  const handleEdit = (id) => {
    const editedLoan = loans.find((loan) => loan.id === id);
    if (editedLoan) {
      setFormData({ name: editedLoan.name, date: editedLoan.date, amount: editedLoan.amount });
      setEditingLoanId(id);
      setIsEditing(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres borrar este préstamo?')) {
      setLoans(loans.filter((loan) => loan.id !== id));
    }
  };

  return (
    <div className="Home">
      <h1 className="title">Manejo de Cuentas - Tienda Tita</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Valor Prestado:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn">
          {isEditing ? 'Guardar Cambios' : 'Agregar Préstamo'}
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Valor Prestado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.name}</td>
              <td>{loan.date}</td>
              <td>{loan.amount}</td>
              <td>
                <button onClick={() => handleEdit(loan.id)}>Editar</button>
                <button onClick={() => handleDelete(loan.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={newProductDialogOpen} onClose={() => setNewProductDialogOpen(false)}>
        <DialogTitle>Editar Préstamo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Valor Prestado"
            type="number"
            fullWidth
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewProductDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Inicio;
