import React, { useState, useEffect } from 'react';

const ControlIoT = () => {
  const [ws, setWs] = useState(null);
  const [nombreDispositivo, setNombreDispositivo] = useState('');
  const [password, setPassword] = useState('');
  const [estadoCaja, setEstadoCaja] = useState('Cerrada');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const conectarWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8080');

      socket.onopen = () => {
        console.log('Conectado al servidor WebSocket');
        setWs(socket);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Mensaje recibido:', data);

        if (data.status === 'OK') {
          setMensaje(data.message);
          setEstadoCaja('Abierta');
        } else {
          setMensaje(data.message);
          setEstadoCaja('Cerrada');
        }
      };

      socket.onerror = (error) => {
        console.error('Error en WebSocket:', error);
        setMensaje('Error de conexión');
      };

      socket.onclose = () => {
        console.log('Conexión WebSocket cerrada');
        setWs(null);
        setTimeout(conectarWebSocket, 1000);
      };
    };

    conectarWebSocket();

    return () => {
      if (ws) {
        console.log('Cerrando conexión WebSocket...');
        ws.close();
      }
    };
  }, []);

  const abrirCajaFuerte = () => {
    if (!nombreDispositivo || !password) {
      setMensaje('Por favor ingresa todos los datos');
      return;
    }

    const data = {
      command: 'VALIDAR_PASSWORD',
      nombre: nombreDispositivo,
      password: password,
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Enviando datos al servidor:', data);
      ws.send(JSON.stringify(data));
    } else {
      setMensaje('Error: No se puede conectar al servidor WebSocket');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: 'auto',
      transition: 'background-color 0.3s ease',
    },
    inputGroup: {
      margin: '10px 0',
      width: '100%',
    },
    inputLabel: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    openButton: {
      padding: '10px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    openButtonHover: {
      backgroundColor: '#218838',
    },
    caja: {
      marginTop: '20px',
      width: '100%',
      minHeight: '100px',
      border: '2px solid #007bff',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'all 0.5s',
      backgroundColor: '#e9ecef',
    },
    cajaAbierta: {
      backgroundColor: '#d4edda',
      color: '#155724',
      borderColor: '#c3e6cb',
    },
    cajaCerrada: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderColor: '#f5c6cb',
    },
    cajaContent: {
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Control de Caja Fuerte IoT</h2>
      <div style={styles.inputGroup}>
        <label style={styles.inputLabel}>Nombre del Dispositivo:</label>
        <input
          type="text"
          value={nombreDispositivo}
          onChange={(e) => setNombreDispositivo(e.target.value)}
          placeholder="Nombre del dispositivo"
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.inputLabel}>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa la contraseña"
          style={styles.input}
        />
      </div>

      <button
        style={styles.openButton}
        onClick={abrirCajaFuerte}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.openButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.openButton.backgroundColor)}
      >
        Abrir Caja Fuerte
      </button>

      <div style={{ ...styles.caja, ...(estadoCaja === 'Abierta' ? styles.cajaAbierta : styles.cajaCerrada) }}>
        <div style={styles.cajaContent}>
          <h3>Estado de la Caja Fuerte: {estadoCaja}</h3>
          {mensaje && <p>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default ControlIoT;