import React, { useState, useEffect } from "react";

const CajaFuerteControl = () => {
    const [estado, setEstado] = useState("Desconocido");
    const [password, setPassword] = useState("");
    const [nombreIoT, setNombreIoT] = useState("");
    const [ws, setWs] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState("");

    // Conexión al WebSocket
    useEffect(() => {
        const socket = new WebSocket("ws://192.168.1.84:8080");

        socket.onopen = () => {
            console.log("Conectado al WebSocket");
            setWs(socket);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.sensor === "abierto") {
                    setEstado("Abierto");
                } else if (data.sensor === "cerrado") {
                    setEstado("Cerrado");
                }
            } catch (error) {
                console.error("Error al procesar mensaje WebSocket:", error);
            }
        };

        socket.onclose = () => {
            console.log("Desconectado del WebSocket");
            setWs(null);
            // Intentar reconectar después de 5 segundos
            setTimeout(() => setWs(new WebSocket("ws://192.168.1.84:8080")), 5000);
        };

        return () => socket.close();
    }, []);

    // Función para abrir la caja fuerte
    const abrirCajaFuerte = async () => {
        if (!nombreIoT || !password) {
            setError("Ingresa el nombre del IoT y la contraseña.");
            return;
        }

        setLoading(true);
        setError(null);
        setMensaje("");

        try {
            const response = await fetch("http://localhost:5000/api/controlcaja/abrir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: nombreIoT, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Error en la solicitud");
            }

            setMensaje(result.message);

            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ action: "open", nombre: nombreIoT }));
            } else {
                setError("WebSocket no está disponible en este momento.");
            }
        } catch (error) {
            console.error("Error al abrir la caja fuerte:", error);
            setError(error.message || "Error al comunicarse con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar la caja fuerte
    const cerrarCajaFuerte = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: "close" }));
            setEstado("Cerrado");
        } else {
            setError("WebSocket no está disponible en este momento.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Estado de la Caja Fuerte</h2>
            <p style={{ ...styles.estado, color: estado === "Abierto" ? "red" : "green" }}>
                {estado}
            </p>

            <h3>Ingresar nombre del IoT y contraseña</h3>
            <input
                type="text"
                placeholder="Nombre del IoT"
                value={nombreIoT}
                onChange={(e) => setNombreIoT(e.target.value)}
                style={styles.input}
            />
            <br />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <br />
            <button
                onClick={abrirCajaFuerte}
                disabled={loading}
                style={styles.button}
            >
                {loading ? "Cargando..." : "Abrir Caja Fuerte"}
            </button>

            <br />
            <button
                onClick={cerrarCajaFuerte}
                style={{ ...styles.button, marginTop: "10px" }}
            >
                Cerrar Caja Fuerte
            </button>

            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

// Estilos
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    estado: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        margin: "10px",
        width: "200px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default CajaFuerteControl;
