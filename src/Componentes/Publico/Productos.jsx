import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Card, CardContent, Typography } from "@mui/material";
import product1 from "../Imagenes/cajalogin2.jpg";
import product2 from "../Imagenes/cajalogin3.jpg";
import product3 from "../Imagenes/cajalogin1.jpg";
import product4 from "../Imagenes/cajalogin3.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    telefono: "",
    correo: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const productos = [
    { id: 1, nombre: "Caja Fuerte Sapporo", imagen: product1, descripcion: "Caja fuerte de alta seguridad con cerradura electrónica, ideal para proteger documentos y objetos de valor.", precio: "$189.07", stock: 2 },
    { id: 2, nombre: "Caja Fuerte Milan Jumbo", imagen: product2, descripcion: "Modelo robusto con acceso digital y sistema de bloqueo automático para mayor seguridad.", precio: "$25.00", stock: 5 },
    { id: 3, nombre: "Caja Fuerte Reims Premium", imagen: product3, descripcion: "Caja fuerte compacta con apertura biométrica y diseño moderno para el hogar o la oficina.", precio: "$15.00", stock: 3 },
    { id: 4, nombre: "Caja Fuerte Hotelera", imagen: product4, descripcion: "Ideal para hoteles y departamentos, con código programable y doble mecanismo de seguridad.", precio: "$30.00", stock: 10 },
  ];

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Verificar si el nombre ya existe en la BD
  const verificarNombre = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comprasiot/verificar-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: formData.nombre }),
      });

      const data = await response.json();

      if (response.ok && data.existe) {
        registrarCompra(data.usuarioId);
      } else {
        // Cerramos el formulario y mostramos el mensaje de Swal
        setOpenForm(false);
        Swal.fire({
          title: "Usuario no encontrado",
          text: "Necesitas crear una cuenta. ¿Ir al login?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, ir al login",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.error("Error verificando el nombre:", error);
      Swal.fire({
        title: "Error",
        text: "Error al conectar con el servidor.",
        icon: "error"
      });
    }
  };

  // Registrar la compra en la BD
  const registrarCompra = async (usuarioId) => {
    try {
      const response = await fetch("http://localhost:5000/api/comprasiot/registrar-compra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, producto: selectedProduct.nombre, usuarioId }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Compra realizada",
          text: "Tu compra fue registrada con éxito.",
          icon: "success"
        }).then(() => {
          // Guardar los datos en el localStorage
          localStorage.setItem('usuario', JSON.stringify(formData));

          // Redirigir al componente de control de la caja fuerte
          navigate("/CajaFuerte");
        });

        // Limpiar el formulario después de la compra exitosa
        setOpenForm(false);
        setFormData({ nombre: "", apellidoPaterno: "", apellidoMaterno: "", telefono: "", correo: "", contraseña: "" });
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo completar la compra.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error registrando la compra:", error);
      Swal.fire({
        title: "Error",
        text: "Error al conectar con el servidor.",
        icon: "error"
      });
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      {selectedProduct ? (
        <Card sx={{ maxWidth: 500, margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary">{selectedProduct.nombre}</Typography>
          <img src={selectedProduct.imagen} alt={selectedProduct.nombre} style={{ width: "100%", height: "280px", objectFit: "cover", borderRadius: "10px", marginTop: "15px" }} />
          <CardContent>
            <Typography variant="body1" color="textSecondary" textAlign="justify">{selectedProduct.descripcion}</Typography>
            <Typography variant="h6" fontWeight="bold" color="primary" mt={2}>
              Precio: {selectedProduct.precio}
            </Typography>
            <Typography variant="body2" color="textSecondary">Disponibles: {selectedProduct.stock}</Typography>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
              <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>Comprar ahora</Button>
              <Button variant="outlined" color="secondary" onClick={() => setSelectedProduct(null)}>Volver</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {productos.map((producto) => (
            <Card key={producto.id} sx={{ borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", cursor: "pointer" }} onClick={() => setSelectedProduct(producto)}>
              <img src={producto.imagen} alt={producto.nombre} style={{ width: "100%", height: "220px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{producto.nombre}</Typography>
                <Typography variant="body2" color="textSecondary">{producto.descripcion}</Typography>
                <Typography variant="body1" color="primary" fontWeight="bold" mt={1}>
                  {producto.precio}
                </Typography>
                <Typography variant="body2" color="textSecondary">Disponibles: {producto.stock}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Formulario de compra */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Finalizar Compra</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {error && <Typography color="error">{error}</Typography>}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Apellido Paterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Apellido Materno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Teléfono" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Contraseña" name="contraseña" type="password" value={formData.contraseña} onChange={handleInputChange} required />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={verificarNombre} color="primary" variant="contained">Finalizar Compra</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Productos;
