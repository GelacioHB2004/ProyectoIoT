import React, { useEffect, useState } from 'react';
import { message } from 'antd'; 

const MisionF = () => {
  const [misiones, setMisiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMisiones = async () => {
      try {
        const response = await fetch('https://backendiot-h632.onrender.com/api/mision');
        if (!response.ok) {
          throw new Error('Error al cargar las misiones');
        }
        const data = await response.json();
        setMisiones(data);
      } catch (err) {
        setError(err.message);
        message.error('Error al cargar las misiones');
      } finally {
        setLoading(false);
      }
    };

    fetchMisiones();
  }, []);

  if (loading) {
    return <div style={styles.loadingMessage}>Cargando misiones...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>Error: {error}</div>;
  }

  return (
    <div style={styles.politicasContainer}>
      <h2 style={styles.politicasTitle}>Misión</h2>
      {misiones.length > 0 ? (
        misiones.map((mision, index) => (
          <div key={index} style={styles.misionContainer}>
            <h3 style={styles.misionTitle}>{mision.titulo}</h3>
            <p style={styles.misionContent}>{mision.contenido}</p>
            {mision.secciones && mision.secciones.length > 0 ? (
              mision.secciones.map((section, idx) => (
                <div key={idx} style={styles.section}>
                  <h4 style={styles.sectionTitle}>{section.titulo}</h4>
                  <p style={styles.sectionContent}>{section.contenido}</p>
                </div>
              ))
            ) : (
              <p style={styles.noDataMessage}></p>
            )}
          </div>
        ))
      ) : (
        <p style={styles.noDataMessage}>No hay misiones disponibles.</p>
      )}
    </div>
  );
};

const styles = {
  politicasContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    background: 'linear-gradient(145deg, #1e293b, #111827)', // Fondo oscuro con gradiente
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Sombra más pronunciada
    border: '1px solid rgba(67, 56, 202, 0.3)', // Borde sutil morado
    color: '#ffffff', // Texto blanco por defecto
  },
  politicasTitle: {
    fontSize: '2rem',
    background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', // Gradiente morado a cian
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    textShadow: '0 3px 10px rgba(139, 92, 246, 0.2)', // Sombra sutil
  },
  misionContainer: {
    marginTop: '20px',
    padding: '15px',
    background: 'rgba(15, 23, 42, 0.5)', // Fondo semitransparente oscuro
    borderRadius: '8px',
    border: '1px solid rgba(139, 92, 246, 0.2)', // Borde morado tenue
  },
  misionTitle: {
    fontSize: '1.5rem',
    background: 'linear-gradient(90deg, #a78bfa, #22d3ee)', // Gradiente morado a cian
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    marginBottom: '10px',
  },
  misionContent: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#d1d5db', // Gris claro para texto secundario
    margin: '15px 0',
  },
  section: {
    marginTop: '20px',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    background: 'linear-gradient(90deg, #10b981, #22d3ee)', // Gradiente verde a cian
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    marginBottom: '10px',
  },
  sectionContent: {
    fontSize: '1rem',
    lineHeight: '1.4',
    color: '#d1d5db', // Gris claro para texto secundario
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#22d3ee', // Cian para mensajes de carga
    padding: '20px',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ff4d4f', // Rojo para errores (coherente con Ant Design)
    padding: '20px',
  },
  noDataMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#a78bfa', // Morado para mensajes de "sin datos"
    padding: '10px',
  },
};

export default MisionF;