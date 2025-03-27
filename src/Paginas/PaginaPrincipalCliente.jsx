import { useState, useEffect } from "react"

const PaginaPrincipalCliente = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState("security")
  const [animateNumbers, setAnimateNumbers] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 500 && !animateNumbers) {
        setAnimateNumbers(true)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [animateNumbers])

  // Iconos SVG inline
  const Icons = {
    Shield: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    Lock: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    Fingerprint: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
        <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
        <path d="M2 16h.01" />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" />
        <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
      </svg>
    ),
    Smartphone: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
    Wifi: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12" y2="20" />
      </svg>
    ),
    Bell: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    ChevronRight: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    Cpu: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    Eye: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    BarChart3: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    Zap: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    Settings: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    Cloud: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    Server: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    Code: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    RefreshCw: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    Clock: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    CheckCircle2: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
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
    Layers: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    CircuitBoard: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <path d="M7 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 7h.01" />
        <path d="M17 7h.01" />
        <path d="M7 17h.01" />
        <path d="M17 17h.01" />
        <path d="M12 7v5" />
        <path d="M12 17v.01" />
        <path d="M17 12h-5" />
        <path d="M7 12h.01" />
      </svg>
    ),
    Lightbulb: (props) => (
      <svg style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 2, ...props.style }} viewBox="0 0 24 24">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
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
              <Icons.Cpu style={{ color: "#a78bfa", marginRight: "0.4rem", width: "14px", height: "14px" }} />
              <span style={{ color: "#c4b5fd", fontWeight: "500", fontSize: "0.875rem" }}>Tecnología IoT con Arduino</span>
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
              SmartVault IoT
            </h1>

            <p style={{ 
              maxWidth: "600px", 
              margin: "0 auto 1.5rem", 
              color: "#d1d5db", 
              fontSize: "1rem", 
              lineHeight: "1.5", 
              animation: "slideUp 1s ease-out" 
            }}>
              La primera caja fuerte inteligente basada en Arduino con IoT para seguridad y monitoreo en tiempo real.
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
                Ordenar Ahora
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
                Ver Especificaciones
                <Icons.ChevronRight style={{ marginLeft: "0.5rem", width: "14px", height: "14px" }} />
              </button>
            </div>

            <div style={{ 
              marginTop: "2rem", 
              maxWidth: "400px", 
              marginLeft: "auto", 
              marginRight: "auto", 
              perspective: "1000px", 
              position: "relative" 
            }}>
              <div style={{ 
                position: "absolute", 
                inset: "-2rem", 
                background: "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)", 
                filter: "blur(30px)", 
                zIndex: -1 
              }} />
              <div style={{ 
                padding: "1.5rem", 
                background: "linear-gradient(145deg, #1e293b, #111827)", 
                borderRadius: "1rem", 
                border: "1px solid rgba(67, 56, 202, 0.4)", 
                transform: isClient ? `rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * 0.01}deg)` : "none", 
                transition: "transform 0.2s ease-out", 
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", 
                animation: "float 6s ease-in-out infinite" 
              }}>
                <div style={{ 
                  padding: "1rem", 
                  background: "linear-gradient(145deg, #4338ca, #1e293b)", 
                  borderRadius: "0.75rem", 
                  textAlign: "center", 
                  color: "#22d3ee", 
                  fontFamily: "monospace", 
                  fontSize: "1rem", 
                  fontWeight: "600", 
                  boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)", 
                  position: "relative", 
                  overflow: "hidden" 
                }}>
                  <span style={{ position: "relative", zIndex: 1 }}>SISTEMA ACTIVO</span>
                  <span style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: "-100%", 
                    width: "100%", 
                    height: "100%", 
                    background: "linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.2), transparent)", 
                    animation: "scan 4s linear infinite" 
                  }} />
                </div>
              </div>
            </div>

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
              <p style={{ color: "#94a3b8", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Descubre más</p>
              <Icons.ChevronDown style={{ width: "16px", height: "16px", color: "#94a3b8" }} />
            </div>
          </div>
        </section>

        {/* Features Tabs Section */}
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
                <Icons.CircuitBoard style={{ color: "#22d3ee", marginRight: "0.4rem", width: "14px", height: "14px" }} />
                <span style={{ color: "#a5f3fc", fontWeight: "500", fontSize: "0.875rem" }}>Tecnología Revolucionaria</span>
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
                Seguridad Inteligente
              </h2>
              <p style={{ maxWidth: "700px", color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5" }}>
                Hardware Arduino con IoT para máxima seguridad.
              </p>
            </div>

            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              marginBottom: "1rem" 
            }}>
              <div style={{ 
                display: "inline-flex", 
                padding: "0.2rem", 
                borderRadius: "0.375rem", 
                background: "rgba(15, 23, 42, 0.5)", 
                border: "1px solid rgba(51, 65, 85, 0.5)", 
                backdropFilter: "blur(4px)" 
              }}>
                {["security", "connectivity", "arduino"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ 
                      padding: "0.4rem 0.75rem", 
                      borderRadius: "0.25rem", 
                      fontSize: "0.75rem", 
                      fontWeight: "500", 
                      transition: "all 0.2s", 
                      background: activeTab === tab ? "linear-gradient(to right, rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.8))" : "transparent", 
                      color: activeTab === tab ? "#ffffff" : "#94a3b8", 
                      "&:hover": activeTab !== tab ? { color: "#ffffff" } : {} 
                    }}
                  >
                    {tab === "security" ? "Seguridad" : tab === "connectivity" ? "Conectividad" : "Arduino"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "1rem", 
              marginBottom: "2rem" 
            }}>
              {activeTab === "security" && (
                <>
                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(139, 92, 246, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(139, 92, 246, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(139, 92, 246, 0.3)" 
                      }}>
                        <Icons.Lock style={{ color: "#a78bfa", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Seguridad Física
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Acero 5mm", "Anti-Manipulación", "Sensores", "Alarma"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#a78bfa", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(34, 211, 238, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(34, 211, 238, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(34, 211, 238, 0.3)" 
                      }}>
                        <Icons.Fingerprint style={{ color: "#22d3ee", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Biométrica
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Sensor R307", "20 Huellas", "Facial", "PIN"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#22d3ee", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "connectivity" && (
                <>
                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(16, 185, 129, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(16, 185, 129, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(16, 185, 129, 0.3)" 
                      }}>
                        <Icons.Wifi style={{ color: "#10b981", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Conectividad IoT
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["WiFi ESP8266", "Bluetooth", "GSM", "MQTT"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#10b981", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(139, 92, 246, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(139, 92, 246, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(139, 92, 246, 0.3)" 
                      }}>
                        <Icons.Cloud style={{ color: "#a78bfa", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Servicios Nube
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Cifrado", "Análisis IA", "API", "OTA"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#a78bfa", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "arduino" && (
                <>
                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(34, 211, 238, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(34, 211, 238, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(34, 211, 238, 0.3)" 
                      }}>
                        <Icons.Cpu style={{ color: "#22d3ee", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Hardware Arduino
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Mega 2560", "Sensores", "OLED", "72h"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#22d3ee", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ 
                    background: "linear-gradient(145deg, #1e293b, #111827)", 
                    borderRadius: "0.75rem", 
                    border: "1px solid rgba(67, 56, 202, 0.3)", 
                    padding: "1rem", 
                    transition: "all 0.3s", 
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(16, 185, 129, 0.2)" } 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "0.5rem", 
                        background: "rgba(16, 185, 129, 0.1)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        marginRight: "0.75rem", 
                        border: "1px solid rgba(16, 185, 129, 0.3)" 
                      }}>
                        <Icons.Code style={{ color: "#10b981", width: "20px", height: "20px" }} />
                      </div>
                      <h3 style={{ 
                        fontSize: "1.125rem", 
                        fontWeight: "700", 
                        background: "linear-gradient(90deg, #a78bfa, #22d3ee)", 
                        WebkitBackgroundClip: "text", 
                        color: "transparent" 
                      }}>
                        Software
                      </h3>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Abierto", "Optimizado", "Modos", "Comunidad"].map((item, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                          <Icons.CheckCircle2 style={{ color: "#10b981", width: "16px", height: "16px" }} />
                          <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
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
                <Icons.Lightbulb style={{ color: "#10b981", marginRight: "0.4rem", width: "14px", height: "14px" }} />
                <span style={{ color: "#a7f3d0", fontWeight: "500", fontSize: "0.875rem" }}>Características</span>
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
                Control Total
              </h2>
              <p style={{ maxWidth: "700px", color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5" }}>
                Funciones avanzadas con IoT para protección total.
              </p>
            </div>

            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
              gap: "1rem", 
              maxWidth: "1200px", 
              margin: "0 auto" 
            }}>
              {[
                { icon: Icons.Fingerprint, title: "Biométrico", desc: "Huella dactilar para 20 usuarios." },
                { icon: Icons.Smartphone, title: "App", desc: "Control y monitoreo en tiempo real." },
                { icon: Icons.Bell, title: "Alertas", desc: "Notificaciones instantáneas." },
                { icon: Icons.Eye, title: "Vigilancia", desc: "Cámara al abrirse." },
                { icon: Icons.BarChart3, title: "Historial", desc: "Registro de accesos." },
                { icon: Icons.Settings, title: "Personalización", desc: "Ajuste de seguridad." },
              ].map((feature, index) => (
                <div key={index} style={{ 
                  background: "linear-gradient(145deg, #1e293b, #111827)", 
                  borderRadius: "0.75rem", 
                  border: "1px solid rgba(67, 56, 202, 0.3)", 
                  padding: "1rem", 
                  transition: "all 0.3s", 
                  "&:hover": { transform: "scale(1.02)", boxShadow: "0 6px 20px rgba(16, 185, 129, 0.2)" } 
                }}>
                  <div style={{ paddingBottom: "0.25rem" }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "0.5rem", 
                      background: "rgba(16, 185, 129, 0.1)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      marginBottom: "0.75rem", 
                      border: "1px solid rgba(16, 185, 129, 0.3)" 
                    }}>
                      <feature.icon style={{ color: "#10b981", width: "20px", height: "20px" }} />
                    </div>
                    <h3 style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "700", 
                      color: "#ffffff", 
                      marginBottom: "0.25rem" 
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
                Seguridad del Futuro
              </h2>
              <p style={{ color: "#d1d5db", fontSize: "1rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                SmartVault IoT: seguridad física y tecnología avanzada.
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
                  Ordenar Ahora
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
                  Demostración
                </button>
              </div>

              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
                gap: "1rem", 
                paddingTop: "1.5rem" 
              }}>
                {[
                  { icon: Icons.Shield, text: "Garantía 2 Años" },
                  { icon: Icons.Cpu, text: "Soporte" },
                  { icon: Icons.RefreshCw, text: "Actualizaciones" },
                  { icon: Icons.Lock, text: "Instalación" },
                ].map((item, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ 
                      width: "40px", 
                      height: "40px", 
                      borderRadius: "9999px", 
                      background: "rgba(139, 92, 246, 0.1)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      marginBottom: "0.4rem", 
                      border: "1px solid rgba(139, 92, 246, 0.3)" 
                    }}>
                      <item.icon style={{ color: "#a78bfa", width: "20px", height: "20px" }} />
                    </div>
                    <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#ffffff" }}>{item.text}</h3>
                  </div>
                ))}
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
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * 0.01}deg); }
          50% { transform: translateY(-8px) rotateY(${scrollY * 0.03}deg) rotateX(${scrollY * 0.01}deg); }
        }
        @keyframes scan {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default PaginaPrincipalCliente;

