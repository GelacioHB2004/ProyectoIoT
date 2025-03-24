import React, { useEffect, useState } from 'react';
import { message } from 'antd'; 

const MisionF = () => {
  const [misiones, setMisiones] = useState([]); // Cambié de null a []
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
        setMisiones(data); // Aquí guardamos todas las misiones
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
      <h2 style={styles.politicasTitle}>Mision</h2>
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
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  politicasTitle: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
  },
  misionContainer: {
    marginTop: '20px',
  },
  misionTitle: {
    fontSize: '1.5rem',
    color: '#007bff',
  },
  misionContent: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
    margin: '15px 0',
  },
  section: {
    marginTop: '20px',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: '#007bff',
  },
  sectionContent: {
    fontSize: '1rem',
    lineHeight: '1.4',
    color: '#555',
  },
  loadingMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ff4d4f',
  },
  noDataMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#007bff',
  },
};

export default MisionF;
