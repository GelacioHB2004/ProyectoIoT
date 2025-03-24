import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import Swal from "sweetalert2";

const CajaFuerte = () => {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  // Recuperar el nombre desde localStorage al cargar el componente
  useEffect(() => {
    const storedName = localStorage.getItem("nombre");
    if (storedName) {
      setNombre(storedName);  // Aquí ya no usamos JSON.parse, ya que el valor es una cadena simple
      console.log(storedName);  // Imprimir el nombre en la consola
    } else {
      setError("No se encontró el nombre en el almacenamiento local.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !contraseña) {
      setError("Por favor, ingresa la contraseña.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/caja/verificar-datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contraseña }),
      });

      const data = await response.json();

      if (response.ok && data.valido) {
        Swal.fire({
          title: "Abriendo caja fuerte",
          icon: "success",
        });
        // Aquí podrías redirigir a otro componente o realizar alguna acción.
      } else {
        Swal.fire({
          title: "Datos incorrectos",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al verificar los datos:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor.",
        icon: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Control de Caja Fuerte
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        {/* Ya no mostramos el campo de 'nombre' */}
        <TextField
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Abrir Caja Fuerte
        </Button>
      </form>
    </Container>
  );
};

export default CajaFuerte;
