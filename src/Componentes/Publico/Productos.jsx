import React, { useState } from "react";
import qrImage from "../Imagenes/images.jpg"; // Imagen del QR
import product1 from "../Imagenes/Himalaya.jpg"; // Ejemplo de producto
import product2 from "../Imagenes/Imala.jpg";
import product3 from "../Imagenes/Him.jpg";
import product4 from "../Imagenes/Hima.jpg";

const Productos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: "Himalaya Neem Scrub",
      imagen: product1,
      descripcion:
        "Suplemento de hierbas orgánicas de neem, para acné suave y piel clara, purificante, ayurvédico, certificado orgánico por USDA.",
      precio: "$189.07",
      stock: 2,
    },
    {
      id: 2,
      nombre: "Himalaya Skin Care",
      imagen: product2,
      descripcion: "Producto excelente para el cuidado de la piel.",
      precio: "$25.00",
      stock: 5,
    },
    {
      id: 3,
      nombre: "Himalaya Skin Wallnes",
      imagen: product3,
      descripcion: "Un producto imprescindible para tu rutina.",
      precio: "$15.00",
      stock: 3,
    },
    {
      id: 4,
      nombre: "Himalaya Sirup",
      imagen: product4,
      descripcion: "El mejor producto del mercado para tu salud.",
      precio: "$30.00",
      stock: 10,
    },
  ];

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f7f7f7",
      fontFamily: "'Roboto', sans-serif",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    producto: {
      backgroundColor: "#fff", // Blanco para los productos
      borderRadius: "10px",
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    productoImagen: {
      width: "100%",
      height: "200px",
      objectFit: "contain",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
    },
    productoNombre: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#333",
      marginTop: "10px",
    },
    precio: {
      fontSize: "16px", // Reducido el tamaño del precio
      fontWeight: "600",
      color: "#007bff",
      marginTop: "5px",
    },
    stock: {
      fontSize: "14px",
      color: "#666",
      marginTop: "5px",
    },
    detalleContainer: {
      maxWidth: "500px", // Reducido el ancho del contenedor
      height: "auto", // Ajusta automáticamente la altura según el contenido
      margin: "20px auto",
      backgroundColor: "#e0f7fa",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "15px", // Espaciado más pequeño entre los elementos
      position: "relative",
    },
    detalleTitulo: {
      fontSize: "22px", // Título un poco más pequeño
      fontWeight: "700",
      color: "#333",
    },
    detalleImagen: {
      width: "100%",
      maxWidth: "300px", // Reducción de la imagen
      height: "300px",
      objectFit: "cover",
      borderRadius: "10px",
      display: "block",
      margin: "0 auto",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    detalleDescripcion: {
      textAlign: "center", // Descripción centrada
      color: "#555",
      fontSize: "14px", // Texto más pequeño
      lineHeight: "1.6",
      maxWidth: "400px", // Limita el ancho de la descripción
      margin: "0 auto", // Centrado
    },
    qrImagen: {
      marginTop: "20px",
      maxWidth: "120px", // Tamaño del QR más pequeño
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    qrTexto: {
      fontSize: "16px", // Tamaño del texto del QR
      fontWeight: "600",
      color: "#333",
      marginTop: "10px",
    },
    botonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginTop: "15px",
    },
    boton: {
      padding: "10px 25px",
      backgroundColor: "#00796b",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s, transform 0.3s",
    },
    botonHover: {
      backgroundColor: "#00796b",
    
    },
    precioDetalle: {
      fontSize: "16px", // Igual al tamaño de la palabra "Precio"
      fontWeight: "600",
      color: "#007bff",
      display: "inline-block", // Mantiene el precio en la misma línea
      marginRight: "20px", // Espacio entre precio y stock
    },
    stockDetalle: {
      fontSize: "16px",
      color: "#888",
      display: "inline-block", // Mantiene el stock en la misma línea
    },
    precioTexto: {
      fontSize: "16px",
      color: "#333",
      fontWeight: "600",
    },
    stockTexto: {
      fontSize: "16px",
      color: "#333",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      {selectedProduct ? (
        <div style={styles.detalleContainer}>
          <h2 style={styles.detalleTitulo}>{selectedProduct.nombre}</h2>
          <img
            src={selectedProduct.imagen}
            alt={selectedProduct.nombre}
            style={styles.detalleImagen}
          />
          <p style={styles.detalleDescripcion}>{selectedProduct.descripcion}</p>
          <div>
            <span style={styles.precioTexto}>Precio:</span>
            <span style={styles.precioDetalle}>{selectedProduct.precio}</span>
            <span style={styles.stockTexto}>Disponibles:</span>
            <span style={styles.stockDetalle}>{selectedProduct.stock}</span>
          </div>
          
          {/* QR y texto */}
          <div>
            <p style={styles.qrTexto}>QR para modelo 3D</p>
            <img src={qrImage} alt="QR Code" style={styles.qrImagen} />
          </div>

          <div style={styles.botonContainer}>
            <button
              style={styles.boton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.botonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
              onClick={() => setSelectedProduct(null)} // Ocultar detalles y QR
            >
              Comprar ahora
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.grid}>
          {productos.map((producto) => (
            <div
              key={producto.id}
              style={styles.producto}
              onClick={() => setSelectedProduct(producto)} // Mostrar detalles
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={styles.productoImagen}
              />
              <h3 style={styles.productoNombre}>{producto.nombre}</h3>
              <div>
                <span style={styles.precioTexto}>Precio:</span>
                <span style={styles.precio}>{producto.precio}</span>
              </div>
              <div>
                <span style={styles.stockTexto}>Disponibles:</span>
                <span style={styles.stock}>{producto.stock}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
