"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { io } from "socket.io-client"

const ControlMqtt = () => {
  const [status, setStatus] = useState("Desconocido")
  const [buzzerStatus, setBuzzerStatus] = useState("Desactivado")
  const [isHovering, setIsHovering] = useState(null)
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  // Referencias para animaciones
  const scanLineRef = useRef(null)
  const pulseRef = useRef(null)
  const rotateRef = useRef(null)
  const buttonGlowRef = useRef(null)

  useEffect(() => {
    const socket = io("https://backendiot-h632.onrender.com")

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket")
    })

    socket.on("cajaStatus", (newStatus) => {
      console.log("Estado recibido:", newStatus)
      setStatus(newStatus)
    })

    socket.on("buzzerStatus", (newBuzzerStatus) => {
      console.log("Estado del buzzer recibido:", newBuzzerStatus)
      setBuzzerStatus(newBuzzerStatus)
    })

    socket.on("connect_error", (err) => {
      console.error("Error de conexión WebSocket:", err)
    })

    return () => {
      socket.disconnect()
      console.log("Desconectado del servidor WebSocket")
    }
  }, [])

  // Agregar estilos CSS globales para animaciones
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = `
      @keyframes scanLine {
        0% { top: -50px; }
        100% { top: 100%; }
      }
      @keyframes rotate {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      @keyframes glow {
        0% { opacity: 0.3; }
        50% { opacity: 0.6; }
        100% { opacity: 0.3; }
      }
      @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
      }
    `
    document.head.appendChild(styleSheet)

    return () => {
      document.head.removeChild(styleSheet)
    }
  }, [])

  const handleOpenCaja = async () => {
    setIsButtonPressed(true)
    try {
      const response = await axios.post("https://backendiot-h632.onrender.com/api/mqtt/abrir")
      alert(response.data.message)
    } catch (error) {
      console.error("Error al abrir la caja:", error)
      alert("Error al abrir la caja")
    } finally {
      setTimeout(() => setIsButtonPressed(false), 300)
    }
  }

  // Obtener colores según el estado
  const getStatusColor = () => {
    if (status === "ABIERTA") {
      return "#00e5ff"
    } else if (status === "CERRADA") {
      return "#64ffda"
    } else {
      return "#b388ff"
    }
  }

  const getBuzzerColor = () => {
    return buzzerStatus === "ACTIVADO" ? "#ff4081" : "#64ffda"
  }

  const statusColor = getStatusColor()
  const buzzerColor = getBuzzerColor()

  // Generar un ID único para la sesión
  const sessionId = useRef(`ID: ${Math.random().toString(36).substring(2, 8).toUpperCase()}`)

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Roboto', 'Arial', sans-serif",
        background: "linear-gradient(145deg, #121212, #1e1e1e)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e0e0e0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Efectos de fondo */}
      <div
        ref={scanLineRef}
        style={{
          position: "absolute",
          width: "200%",
          height: "50px",
          backgroundColor: "rgba(0, 229, 255, 0.1)",
          left: "-50%",
          animation: "scanLine 2s linear infinite",
        }}
      ></div>

      <div
        ref={rotateRef}
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "rotate 20s linear infinite",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "80%",
            margin: "10%",
            border: "1px solid rgba(179, 136, 255, 0.1)",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      {/* Círculos decorativos adicionales */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          border: "1px solid rgba(255, 64, 129, 0.05)",
          borderRadius: "50%",
          top: "70%",
          left: "20%",
          animation: "rotate 15s linear infinite reverse",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          border: "1px solid rgba(100, 255, 218, 0.05)",
          borderRadius: "50%",
          top: "20%",
          right: "10%",
          animation: "rotate 10s linear infinite",
        }}
      ></div>

      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          background: "rgba(30, 30, 30, 0.9)",
          boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
          overflow: "hidden",
          border: "1px solid #333",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Encabezado con título y elementos decorativos */}
        <div
          style={{
            background: "linear-gradient(90deg, #121212, #1e1e1e, #121212)",
            padding: "30px 20px",
            textAlign: "center",
            borderBottom: "1px solid #333",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              margin: "10px auto",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#00e5ff",
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00e5ff",
                margin: "0 10px",
                boxShadow: "0 0 10px #00e5ff",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#00e5ff",
              }}
            ></div>
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: "10px 0 5px 0",
              color: "#fff",
              letterSpacing: "2px",
              textShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
            }}
          >
            SISTEMA DE SEGURIDAD
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#00e5ff",
              margin: "0 0 10px 0",
              letterSpacing: "1px",
            }}
          >
            CAJA FUERTE
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              margin: "10px auto",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#00e5ff",
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#00e5ff",
                margin: "0 10px",
                boxShadow: "0 0 10px #00e5ff",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#00e5ff",
              }}
            ></div>
          </div>

          {/* Indicador de conexión */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              display: "flex",
              alignItems: "center",
              fontSize: "12px",
              color: "#64ffda",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#64ffda",
                marginRight: "5px",
                animation: "blink 2s infinite",
              }}
            ></div>
            CONECTADO
          </div>
        </div>

        <div
          style={{
            padding: "30px",
            background: "linear-gradient(145deg, #1a1a1a, #121212)",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            {/* Indicador de estado de la caja */}
            <div
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "15px",
                padding: "15px",
                marginBottom: "15px",
                borderLeft: `3px solid ${statusColor}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: isHovering === "status" ? "translateY(-5px)" : "translateY(0)",
                boxShadow: isHovering === "status" ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "none",
              }}
              onMouseEnter={() => setIsHovering("status")}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    color: "#aaa",
                    letterSpacing: "1px",
                    margin: 0,
                  }}
                >
                  ESTADO
                </h3>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: statusColor,
                    color: statusColor,
                    boxShadow: `0 0 10px ${statusColor}`,
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  ref={pulseRef}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: `2px solid ${statusColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    animation: "pulse 2s infinite ease-in-out",
                    color: statusColor,
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    {status === "ABIERTA" ? "🔓" : status === "CERRADA" ? "🔒" : "❓"}
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      color: statusColor,
                    }}
                  >
                    {status}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#aaa",
                    }}
                  >
                    {status === "ABIERTA"
                      ? "Acceso permitido"
                      : status === "CERRADA"
                        ? "Acceso restringido"
                        : "Estado indeterminado"}
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de estado de la alarma */}
            <div
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.8)",
                borderRadius: "15px",
                padding: "15px",
                marginBottom: "15px",
                borderLeft: `3px solid ${buzzerColor}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: isHovering === "alarm" ? "translateY(-5px)" : "translateY(0)",
                boxShadow: isHovering === "alarm" ? "0 10px 20px rgba(0, 0, 0, 0.3)" : "none",
              }}
              onMouseEnter={() => setIsHovering("alarm")}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    color: "#aaa",
                    letterSpacing: "1px",
                    margin: 0,
                  }}
                >
                  ALARMA
                </h3>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: buzzerColor,
                    color: buzzerColor,
                    boxShadow: `0 0 10px ${buzzerColor}`,
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: `2px solid ${buzzerColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "15px",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    animation: buzzerStatus === "ACTIVADO" ? "pulse 1s infinite ease-in-out" : "none",
                    color: buzzerColor,
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    {buzzerStatus === "ACTIVADO" ? "🔔" : "🔕"}
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      color: buzzerColor,
                    }}
                  >
                    {buzzerStatus === "ACTIVADO" ? "ACTIVADO" : "DESACTIVADO"}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#aaa",
                    }}
                  >
                    {buzzerStatus === "ACTIVADO" ? "¡Alerta de seguridad!" : "Sistema en reposo"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de control */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div
              ref={buttonGlowRef}
              style={{
                position: "absolute",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundColor: "#00e5ff",
                opacity: 0.5,
                animation: "glow 2s infinite ease-in-out",
              }}
            ></div>

            <button
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "18px 40px",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #00e5ff",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                zIndex: 1,
                boxShadow: isHovering === "button" ? "0 0 20px rgba(0, 229, 255, 0.5)" : "none",
                transform: isButtonPressed ? "scale(0.98)" : "scale(1)",
              }}
              onClick={handleOpenCaja}
              onMouseEnter={() => setIsHovering("button")}
              onMouseLeave={() => setIsHovering(null)}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  marginRight: "10px",
                }}
              >
                ABRIR CAJA
              </span>
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                🚪
              </span>
            </button>
          </div>
        </div>

        {/* Pie de página con información de seguridad */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "15px 30px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              fontFamily: "monospace",
            }}
          >
            {sessionId.current}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              fontFamily: "monospace",
            }}
          >
            v2.0.4
          </p>
        </div>
      </div>
    </div>
  )
}

export default ControlMqtt;



