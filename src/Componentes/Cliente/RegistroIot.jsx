import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegistroIot = () => {
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [devices, setDevices] = useState([]);
    const [step, setStep] = useState(1);
    const [emailVerified, setEmailVerified] = useState(false);

    // 🔹 Función para mostrar alertas con SweetAlert2
    const showAlert = (title, text, icon) => {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    };

    // Buscar dispositivos IoT asociados a un correo
    const handleGetDevices = async () => {
        if (!email) {
            showAlert('Error', 'Ingrese un correo electrónico', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/iot/devices/${email}`);
            const data = await response.json();

            if (response.ok) {
                setDevices(data.devices);
            } else {
                setDevices([]);
                showAlert('Atención', data.message, 'info');
            }
        } catch (error) {
            showAlert('Error', 'No se pudo obtener los dispositivos', 'error');
        }
    };

    // Verificar si el correo existe antes de registrar un dispositivo
    const handleVerifyEmail = async () => {
        if (!email) {
            showAlert('Error', 'Ingrese un correo electrónico', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/iot/devices/${email}`);
            const data = await response.json();

            if (response.ok) {
                setEmailVerified(true);
                showAlert('Éxito', 'Correo verificado correctamente', 'success');
            } else {
                setEmailVerified(false);
                showAlert('Error', data.message, 'error');
            }
        } catch (error) {
            showAlert('Error', 'No se pudo verificar el correo', 'error');
        }
    };

    // Registrar un nuevo dispositivo IoT
    const handleRegisterDevice = async () => {
        if (!nombre || !password) {
            showAlert('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/iot/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, nombre, password })
            });

            const data = await response.json();

            if (response.ok) {
                setNombre('');
                setPassword('');
                setEmailVerified(false);
                setStep(1);
                showAlert('Éxito', 'Dispositivo registrado correctamente', 'success');
            } else {
                showAlert('Error', data.message, 'error');
            }
        } catch (error) {
            showAlert('Error', 'No se pudo registrar el dispositivo', 'error');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gestión de Dispositivos IoT</h2>

            {step === 1 && (
                <>
                    <button onClick={() => setStep(2)} style={styles.primaryButton}>
                        🔍 Buscar Dispositivo IoT
                    </button>
                    <button onClick={() => setStep(3)} style={styles.secondaryButton}>
                        ➕ Registrar Dispositivo
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h3 style={styles.subtitle}>Buscar Dispositivo IoT</h3>
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleGetDevices} style={styles.primaryButton}>
                        🔍 Buscar
                    </button>
                    <button onClick={() => setStep(1)} style={styles.backButton}>
                        ⬅ Regresar
                    </button>

                    <ul style={styles.list}>
                        {devices.map((device, index) => (
                            <li key={index} style={styles.listItem}>{device.nombre}</li>
                        ))}
                    </ul>
                </>
            )}

            {step === 3 && (
                <>
                    <h3 style={styles.subtitle}>Registrar Dispositivo IoT</h3>

                    {!emailVerified ? (
                        <>
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={handleVerifyEmail} style={styles.primaryButton}>
                                ✅ Verificar Correo
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Nombre del Dispositivo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={handleRegisterDevice} style={styles.successButton}>
                                🚀 Registrar
                            </button>
                        </>
                    )}

                    <button onClick={() => setStep(1)} style={styles.backButton}>
                        ⬅ Regresar
                    </button>
                </>
            )}
        </div>
    );
};

// 🎨 Estilos en el mismo archivo
const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    },
    title: {
        color: '#333'
    },
    subtitle: {
        color: '#555'
    },
    input: {
        width: '90%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    primaryButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '10px'
    },
    secondaryButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    successButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#17a2b8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    backButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    list: {
        listStyle: 'none',
        padding: 0
    },
    listItem: {
        backgroundColor: '#fff',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    }
};

export default RegistroIot;
