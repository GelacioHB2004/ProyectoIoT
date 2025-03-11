import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Spin, Alert } from 'antd'; // Usando componentes de Ant Design
import { MessageOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import io from 'socket.io-client'; // Usamos Socket.IO para WebSockets

const EstadoCaja = () => {
  const [estadoCaja, setEstadoCaja] = useState({
    abierta: false,
    alarmaActivada: false,
    mensajeAlarma: '',
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const socketRef = useRef(null);

  // Establecer conexión WebSocket con el backend
  useEffect(() => {
    socketRef.current = io('http://localhost:5000'); // URL del backend con WebSocket

    socketRef.current.on('estadoCaja', (estado) => {
      setEstadoCaja(estado); // Recibimos el estado de la caja en tiempo real
      setCargando(false);
    });

    socketRef.current.on('connect_error', (err) => {
      setError('Error de conexión con el servidor');
      console.error(err);
    });

    // Desconectar el socket al desmontar el componente
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Función para manejar la apertura/cierre de la caja fuerte
  const toggleCaja = async () => {
    try {
      setCargando(true);
      const response = await fetch('http://localhost:5000/api/estadoiot/cambiarEstadoCaja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setEstadoCaja(data.estado);
      setCargando(false);
    } catch (error) {
      console.error('Error al cambiar estado de la caja:', error);
      setError('Error al cambiar el estado de la caja');
      setCargando(false);
    }
  };

  // Función para manejar la activación/desactivación de la alarma
  const toggleAlarma = async () => {
    try {
      setCargando(true);
      const response = await fetch('http://localhost:5000/api/estadoiot/cambiarEstadoAlarma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setEstadoCaja(data.estado);
      setCargando(false);
    } catch (error) {
      console.error('Error al cambiar estado de la alarma:', error);
      setError('Error al cambiar el estado de la alarma');
      setCargando(false);
    }
  };

  // Modal para mostrar detalles de la alarma
  const showMessageAlarma = () => {
    Modal.info({
      title: 'Mensaje de la alarma',
      content: <div>{estadoCaja.mensajeAlarma || 'No hay mensaje de alarma.'}</div>,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Estado de la Caja Fuerte</h2>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '20px' }} />}

      {cargando ? (
        <Spin size="large" />
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Estado: {estadoCaja.abierta ? 'Abierta' : 'Cerrada'}</h3>
            <Button
              type={estadoCaja.abierta ? 'danger' : 'primary'}
              icon={estadoCaja.abierta ? <LockOutlined /> : <UnlockOutlined />}
              onClick={toggleCaja}
              loading={cargando}
            >
              {estadoCaja.abierta ? 'Cerrar Caja' : 'Abrir Caja'}
            </Button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>Alarma: {estadoCaja.alarmaActivada ? 'Activada' : 'Desactivada'}</h3>
            <Button
              type={estadoCaja.alarmaActivada ? 'danger' : 'default'}
              icon={<MessageOutlined />}
              onClick={toggleAlarma}
              loading={cargando}
            >
              {estadoCaja.alarmaActivada ? 'Desactivar Alarma' : 'Activar Alarma'}
            </Button>
          </div>

          {estadoCaja.mensajeAlarma && (
            <div>
              <Button
                type="default"
                icon={<MessageOutlined />}
                onClick={showMessageAlarma}
              >
                Ver mensaje de la alarma
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EstadoCaja;