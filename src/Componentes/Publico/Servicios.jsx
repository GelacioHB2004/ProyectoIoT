import React, { useState } from "react";
import serviceImage1 from "../Imagenes/Terapia fisica.jpg";
import serviceImage2 from "../Imagenes/Estimulacion temprana.jpg";
import serviceImage3 from "../Imagenes/Masajes terapeuticos.jpg";
import serviceImage4 from "../Imagenes/Vendaje Neu.jpg";
import serviceImage5 from "../Imagenes/Masajes redu.jpg";
import serviceImage6 from "../Imagenes/Derma.jpg";

const Servicios = () => {
  const [selectedService, setSelectedService] = useState(null);

  const servicios = [
    {
      id: 1,
      nombre: "Terapia fisica",
      imagen: serviceImage1,
      descripcion: "Descripción del Servicio 1.",
      precio: "$50.00",
    },
    {
      id: 2,
      nombre: "Estimulacion temprana",
      imagen: serviceImage2,
      descripcion: "Descripción del Servicio 2.",
      precio: "$60.00",
    },
    {
      id: 3,
      nombre: "Masajes terapeuticos",
      imagen: serviceImage3,
      descripcion: "Descripción del Servicio 3.",
      precio: "$70.00",
    },
    {
      id: 4,
      nombre: "Vendaje neuromuscular",
      imagen: serviceImage4,
      descripcion: "Descripción del Servicio 4.",
      precio: "$80.00",
    },
    {
      id: 5,
      nombre: "Masajes reductivos",
      imagen: serviceImage5,
      descripcion: "Descripción del Servicio 5.",
      precio: "$85.00",
    },
    {
      id: 6,
      nombre: "Fisioterapia dermatofuncional",
      imagen: serviceImage6,
      descripcion: "Descripción del Servicio 6.",
      precio: "$90.00",
    },
  ];

  const styles = {
    container: {
      padding: "40px 20px",
      backgroundColor: "#f4f4f9",
      minHeight: "100vh",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      justifyItems: "center",
    },
    servicio: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    servicioHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
      backgroundColor: "#e0f7fa",
    },
    servicioImagen: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    precio: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "black", // Color negro para el precio
      margin: "10px 0",
    },
    detalle: {
      textAlign: "center",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      maxWidth: "700px",
      margin: "0 auto",
      backgroundColor: "#e0f7fa",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    detalleImagen: {
      width: "100%",
      height: "300px",
      objectFit: "cover",
      borderRadius: "12px",
      marginBottom: "20px",
    },
    descripcion: {
      fontSize: "16px",
      color: "black", // Color negro para la descripción
      marginBottom: "20px",
    },
    botonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
    },
    boton: {
      padding: "12px 25px",
      backgroundColor: "#00796b",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s ease",
      margin: "10px",
    },
    botonHover: {
      backgroundColor: "#00796b",
    },
    h3: {
      color: "black", // Color negro para los títulos
    },
    h2: {
      color: "black", // Color negro para el título del detalle
    },
  };

  return (
    <div style={styles.container}>
      {selectedService ? (
        <div style={styles.detalle}>
          <h2 style={styles.h2}>{selectedService.nombre}</h2>
          <img
            src={selectedService.imagen}
            alt={selectedService.nombre}
            style={styles.detalleImagen}
          />
          <p style={styles.descripcion}>{selectedService.descripcion}</p>
          <p style={styles.precio}>{selectedService.precio}</p>
          <div style={styles.botonContainer}>
            <button
              style={styles.boton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.botonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              onClick={() => alert("Cita solicitada para " + selectedService.nombre)}
            >
              Sacar cita
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.grid}>
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              style={styles.servicio}
              onClick={() => setSelectedService(servicio)} // Mostrar detalles del servicio
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={servicio.imagen}
                alt={servicio.nombre}
                style={styles.servicioImagen}
              />
              <h3 style={styles.h3}>{servicio.nombre}</h3>
              <p style={styles.precio}>{servicio.precio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Servicios;
