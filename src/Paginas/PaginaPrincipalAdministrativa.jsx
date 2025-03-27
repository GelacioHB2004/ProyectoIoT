import { useState, useEffect } from "react"

const PaginaPrincipalAdministrativa = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Iconos SVG inline
  const Icons = {
    Dashboard: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    User: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    Lock: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    BarChart: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    Settings: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l-.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    ArrowRight: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    ChevronDown: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)", 
      color: "#ffffff", 
      fontFamily: "'Inter', system-ui, sans-serif", 
      position: "relative", 
      overflow: "hidden" 
    }}>
      {/* Fondo decorativo */}
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        background: "radial-gradient(circle at top center, rgba(139, 92, 246, 0.15), transparent 70%)", 
        zIndex: 0 
      }} />

      <main style={{ padding: "2rem 0.5rem", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ position: "relative", padding: "3rem 0", textAlign: "center" }}>
          <div style={{ 
            position: "absolute", 
            top: "-5rem", 
            left: "50%", 
            transform: "translateX(-50%)", 
            width: "40rem", 
            height: "40rem", 
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)", 
            filter: "blur(80px)", 
            zIndex: -1 
          }} />

          <div style={{ position: "relative" }}>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              padding: "0.4rem 1rem", 
              borderRadius: "9999px", 
              background: "rgba(139, 92, 246, 0.1)", 
              border: "1px solid rgba(139, 92, 246, 0.3)", 
              marginBottom: "1rem", 
              backdropFilter: "blur(4px)" 
            }}>
              <Icons.Dashboard style={{ color: "#a78bfa", marginRight: "0.4rem", width: "14px", height: "14px" }} />
              <span style={{ color: "#c4b5fd", fontWeight: "500", fontSize: "0.875rem" }}>Panel Administrativo</span>
            </div>

            <h1 style={{ 
              fontSize: "clamp(2rem, 5vw, 3.5rem)", 
              fontWeight: "900", 
              background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
              WebkitBackgroundClip: "text", 
              color: "transparent", 
              marginBottom: "1rem", 
              textShadow: "0 3px 10px rgba(139, 92, 246, 0.3)", 
              animation: "fadeIn 1s ease-in" 
            }}>
              Gestión SmartVault IoT
            </h1>

            <p style={{ 
              maxWidth: "600px", 
              margin: "0 auto 1.5rem", 
              color: "#d1d5db", 
              fontSize: "1rem", 
              lineHeight: "1.5", 
              animation: "slideUp 1s ease-out" 
            }}>
              Administra, monitorea y configura tus sistemas SmartVault desde un solo lugar.
            </p>

            <button style={{ 
              fontMedium: "true", 
              borderRadius: "1rem", 
              transition: "all 0.3s", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", 
              color: "#ffffff", 
              boxShadow: "0 3px 10px rgba(139, 92, 246, 0.3)", 
              padding: "0.75rem 1.5rem", 
              fontSize: "0.875rem", 
              margin: "0 auto", 
              "&:hover": { 
                background: "linear-gradient(135deg, #7c3aed, #0891b2)", 
                boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)", 
                transform: "translateY(-2px)" 
              } 
            }}>
              Ir al Dashboard
              <Icons.ArrowRight style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }} />
            </button>

            <div style={{ 
              position: "absolute", 
              bottom: "1rem", 
              left: "50%", 
              transform: "translateX(-50%)", 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              animation: "bounce 2s infinite" 
            }}>
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Explora Funciones</p>
              <Icons.ChevronDown style={{ width: "16px", height: "16px", color: "#94a3b8" }} />
            </div>
          </div>
        </section>

        {/* Admin Features Section */}
        <section style={{ padding: "3rem 0", position: "relative", overflow: "hidden" }}>
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, #0f172a, #1e1b4b)" 
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              marginBottom: "1.5rem", 
              textAlign: "center" 
            }}>
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                padding: "0.4rem 1rem", 
                borderRadius: "9999px", 
                background: "rgba(34, 211, 238, 0.1)", 
                border: "1px solid rgba(34, 211, 238, 0.3)", 
                marginBottom: "0.75rem" 
              }}>
                <Icons.Settings style={{ color: "#22d3ee", marginRight: "0.4rem", width: "14px", height: "14px" }} />
                <span style={{ color: "#a5f3fc", fontWeight: "500", fontSize: "0.875rem" }}>Herramientas Admin</span>
              </div>
              <h2 style={{ 
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)", 
                fontWeight: "800", 
                background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                WebkitBackgroundClip: "text", 
                color: "transparent", 
                marginBottom: "0.75rem", 
                textShadow: "0 3px 10px rgba(139, 92, 246, 0.2)" 
              }}>
                Control Total del Sistema
              </h2>
              <p style={{ maxWidth: "700px", color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5" }}>
                Gestiona usuarios, monitorea accesos y ajusta configuraciones en tiempo real.
              </p>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "1rem", 
              maxWidth: "1200px", 
              margin: "0 auto" 
            }}>
              {[
                {
                  icon: Icons.User,
                  title: "Gestión de Usuarios",
                  desc: "Administra permisos y registra nuevos usuarios con facilidad.",
                  color: "#a78bfa",
                },
                {
                  icon: Icons.Lock,
                  title: "Control de Accesos",
                  desc: "Monitorea y registra cada intento de acceso al sistema.",
                  color: "#22d3ee",
                },
                {
                  icon: Icons.BarChart,
                  title: "Estadísticas",
                  desc: "Analiza datos de uso y seguridad en tiempo real.",
                  color: "#10b981",
                },
                {
                  icon: Icons.Settings,
                  title: "Configuración",
                  desc: "Personaliza alertas, modos y parámetros del sistema.",
                  color: "#a78bfa",
                },
              ].map((feature, index) => (
                <div key={index} style={{ 
                  background: "linear-gradient(145deg, #1e293b, #111827)", 
                  borderRadius: "0.75rem", 
                  border: "1px solid rgba(67, 56, 202, 0.3)", 
                  padding: "1rem", 
                  transition: "all 0.3s", 
                  "&:hover": { transform: "scale(1.02)", boxShadow: `0 6px 20px rgba(${feature.color.slice(1, 3)}, ${feature.color.slice(3, 5)}, ${feature.color.slice(5, 7)}, 0.2)` } 
                }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "0.5rem", 
                      background: `rgba(${feature.color.slice(1, 3)}, ${feature.color.slice(3, 5)}, ${feature.color.slice(5, 7)}, 0.1)`, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      marginRight: "0.75rem", 
                      border: `1px solid rgba(${feature.color.slice(1, 3)}, ${feature.color.slice(3, 5)}, ${feature.color.slice(5, 7)}, 0.3)` 
                    }}>
                      <feature.icon style={{ color: feature.color, width: "20px", height: "20px" }} />
                    </div>
                    <h3 style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "700", 
                      background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                      WebkitBackgroundClip: "text", 
                      color: "transparent" 
                    }}>
                      {feature.title}
                    </h3>
                  </div>
                  <p style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: "1.4" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section style={{ padding: "3rem 0", position: "relative", overflow: "hidden" }}>
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, #1e1b4b, #0f172a)" 
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              marginBottom: "1.5rem", 
              textAlign: "center" 
            }}>
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                padding: "0.4rem 1rem", 
                borderRadius: "9999px", 
                background: "rgba(16, 185, 129, 0.1)", 
                border: "1px solid rgba(16, 185, 129, 0.3)", 
                marginBottom: "0.75rem" 
              }}>
                <Icons.BarChart style={{ color: "#10b981", marginRight: "0.4rem", width: "14px", height: "14px" }} />
                <span style={{ color: "#a7f3d0", fontWeight: "500", fontSize: "0.875rem" }}>Estadísticas Rápidas</span>
              </div>
              <h2 style={{ 
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)", 
                fontWeight: "800", 
                background: "linear-gradient(90deg, #10b981, #22d3ee)", 
                WebkitBackgroundClip: "text", 
                color: "transparent", 
                marginBottom: "0.75rem", 
                textShadow: "0 3px 10px rgba(16, 185, 129, 0.2)" 
              }}>
                Estado del Sistema
              </h2>
              <p style={{ maxWidth: "700px", color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5" }}>
                Información clave para mantener todo bajo control.
              </p>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "1rem", 
              maxWidth: "1200px", 
              margin: "0 auto" 
            }}>
              {[
                { label: "Usuarios Activos", value: "150", color: "#a78bfa" },
                { label: "Accesos Hoy", value: "42", color: "#22d3ee" },
                { label: "Alertas Pendientes", value: "3", color: "#10b981" },
                { label: "Sistemas Online", value: "98%", color: "#a78bfa" },
              ].map((stat, index) => (
                <div key={index} style={{ 
                  background: "linear-gradient(145deg, #1e293b, #111827)", 
                  borderRadius: "0.75rem", 
                  border: "1px solid rgba(67, 56, 202, 0.3)", 
                  padding: "1rem", 
                  textAlign: "center", 
                  transition: "all 0.3s", 
                  "&:hover": { transform: "scale(1.02)", boxShadow: `0 6px 20px rgba(${stat.color.slice(1, 3)}, ${stat.color.slice(3, 5)}, ${stat.color.slice(5, 7)}, 0.2)` } 
                }}>
                  <p style={{ color: "#d1d5db", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{stat.label}</p>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: stat.color }}>{stat.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section style={{ padding: "3rem 0", position: "relative", overflow: "hidden" }}>
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, #0f172a, #1e1b4b)", 
            opacity: 0.9 
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <h2 style={{ 
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)", 
                fontWeight: "800", 
                background: "linear-gradient(90deg, #a78bfa, #22d3ee, #10b981)", 
                WebkitBackgroundClip: "text", 
                color: "transparent", 
                marginBottom: "1rem", 
                textShadow: "0 3px 10px rgba(139, 92, 246, 0.2)" 
              }}>
                Optimiza tu Gestión
              </h2>
              <p style={{ color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                Toma el control total de SmartVault IoT con herramientas avanzadas de administración.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button style={{ 
                  fontMedium: "true", 
                  borderRadius: "1rem", 
                  transition: "all 0.3s", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", 
                  color: "#ffffff", 
                  boxShadow: "0 3px 10px rgba(139, 92, 246, 0.3)", 
                  padding: "0.75rem 1.5rem", 
                  fontSize: "0.875rem", 
                  "&:hover": { 
                    background: "linear-gradient(135deg, #7c3aed, #0891b2)", 
                    boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)", 
                    transform: "translateY(-2px)" 
                  } 
                }}>
                  Empezar Ahora
                  <Icons.ArrowRight style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }} />
                </button>

                <button style={{ 
                  fontMedium: "true", 
                  borderRadius: "1rem", 
                  transition: "all 0.3s", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  background: "transparent", 
                  border: "1px solid rgba(139, 92, 246, 0.5)", 
                  color: "#c4b5fd", 
                  backdropFilter: "blur(4px)", 
                  padding: "0.75rem 1.5rem", 
                  fontSize: "0.875rem", 
                  "&:hover": { 
                    background: "rgba(139, 92, 246, 0.1)", 
                    borderColor: "rgba(139, 92, 246, 0.8)", 
                    color: "#ddd6fe" 
                  } 
                }}>
                  Ver Documentación
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Animaciones CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

export default PaginaPrincipalAdministrativa;
