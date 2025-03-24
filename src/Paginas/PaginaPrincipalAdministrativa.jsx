"use client"

import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faChartBar,
  faCog,
  faChartPie,
  faLifeRing,
  faBell,
  faShieldAlt,
  faLock,
  faKey,
} from "@fortawesome/free-solid-svg-icons"

const PaginaPrincipalAdministrativa = () => {
  const [visibleWidgets, setVisibleWidgets] = useState([])
  const [showVaultAnimation, setShowVaultAnimation] = useState(true)

  const widgetsData = [
    {
      title: "Gestión de Usuarios",
      description: "Administra los usuarios con acceso a la caja fuerte.",
      icon: faUsers,
      color: "#64b5f6",
    },
    {
      title: "Informes de Seguridad",
      description: "Accede a los informes de actividad y accesos a la caja.",
      icon: faChartBar,
      color: "#64b5f6",
    },
    {
      title: "Configuraciones",
      description: "Ajusta las configuraciones de seguridad del sistema.",
      icon: faCog,
      color: "#64b5f6",
    },
    {
      title: "Estadísticas",
      description: "Revisa las estadísticas de uso y eventos de seguridad.",
      icon: faChartPie,
      color: "#64b5f6",
    },
    {
      title: "Soporte Técnico",
      description: "Accede a recursos y asistencia técnica para tu caja fuerte.",
      icon: faLifeRing,
      color: "#64b5f6",
    },
    {
      title: "Alertas de Seguridad",
      description: "Mantente al tanto de los eventos críticos del sistema.",
      icon: faBell,
      color: "#64b5f6",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleWidgets((prev) => {
        if (prev.length < widgetsData.length && prev.length < 12) {
          return [...prev, widgetsData[prev.length]]
        }
        return []
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Ocultar la animación de la caja fuerte después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVaultAnimation(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      {showVaultAnimation ? (
        <VaultAnimation>
          <VaultDoor>
            <VaultHandle />
            <VaultLocks>
              <VaultLock />
              <VaultLock />
              <VaultLock />
            </VaultLocks>
          </VaultDoor>
          <VaultText>Accediendo al panel administrativo seguro...</VaultText>
        </VaultAnimation>
      ) : (
        <>
          <Header>
            <h1>Panel Administrativo de Caja Fuerte</h1>
            <SecurityBanner>
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Área restringida - Acceso solo para administradores autorizados</span>
            </SecurityBanner>
          </Header>

          <QuickAccess>
            <QuickAccessButton>
              <FontAwesomeIcon icon={faLock} />
              <span>Control de Acceso</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <FontAwesomeIcon icon={faKey} />
              <span>Gestión de Claves</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Protocolos</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <FontAwesomeIcon icon={faBell} />
              <span>Alertas</span>
            </QuickAccessButton>
          </QuickAccess>

          <Widgets>
            {visibleWidgets.map((widget, index) => (
              <Widget key={index}>
                <Icon>
                  <FontAwesomeIcon icon={widget.icon} size="2x" />
                </Icon>
                <h2>{widget.title}</h2>
                <p>{widget.description}</p>
                <AnimatedButton>{`Acceder`}</AnimatedButton>
              </Widget>
            ))}
          </Widgets>

          <SecurityFooter>
            <SecurityMetric>
              <div className="metric-value">256-bit</div>
              <div className="metric-label">Encriptación</div>
            </SecurityMetric>
            <SecurityMetric>
              <div className="metric-value">24/7</div>
              <div className="metric-label">Monitoreo</div>
            </SecurityMetric>
            <SecurityMetric>
              <div className="metric-value">99.9%</div>
              <div className="metric-label">Uptime</div>
            </SecurityMetric>
            <SecurityMetric>
              <div className="metric-value">
                <FontAwesomeIcon icon={faCog} />
              </div>
              <div className="metric-label">Configuración</div>
            </SecurityMetric>
          </SecurityFooter>
        </>
      )}
    </Container>
  )
}

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const moveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const unlockAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(-100%);
  }
`

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%);
  color: #e0e0e0;
  padding: 20px;
  min-height: 100vh;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  width: 100%;
  max-width: 1000px;

  h1 {
    font-size: 2.5rem;
    color: #e0e0e0;
    margin: 0 0 20px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`

const SecurityBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 128, 0, 0.2);
  border: 1px solid rgba(0, 128, 0, 0.5);
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  width: 100%;
  animation: ${pulseAnimation} 2s infinite ease-in-out;

  svg {
    margin-right: 10px;
    color: #00c853;
  }

  span {
    color: #00c853;
    font-weight: 500;
  }
`

const QuickAccess = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 800px;
`

const QuickAccessButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 60, 90, 0.5);
  border: 1px solid rgba(100, 150, 200, 0.3);
  border-radius: 12px;
  padding: 15px;
  min-width: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    background-color: rgba(40, 80, 120, 0.7);
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  svg {
    margin-bottom: 8px;
    color: #64b5f6;
    font-size: 1.5rem;
  }

  span {
    font-size: 0.9rem;
    color: #e0e0e0;
  }
`

const Widgets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`

const Widget = styled.div`
  background: linear-gradient(145deg, rgba(30, 60, 90, 0.4), rgba(20, 40, 60, 0.4));
  border: 1px solid rgba(100, 150, 200, 0.2);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    color: #64b5f6;
    margin: 15px 0 10px;
    font-size: 1.3rem;
  }

  p {
    color: #a0a0a0;
    margin-bottom: 20px;
    flex-grow: 1;
  }
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(30, 60, 90, 0.6);
  border-radius: 50%;
  margin-bottom: 15px;
  color: #64b5f6;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`

const AnimatedButton = styled.button`
  background: linear-gradient(90deg, #1976d2, #64b5f6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: linear-gradient(90deg, #64b5f6, #1976d2);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`

const SecurityFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
  margin-top: 40px;
  padding: 20px;
  background: rgba(20, 40, 60, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(100, 150, 200, 0.2);
`

const SecurityMetric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  text-align: center;

  .metric-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #64b5f6;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }

  .metric-label {
    font-size: 0.9rem;
    color: #a0a0a0;
  }
`

// Animación de la caja fuerte
const VaultAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

const VaultDoor = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(145deg, #2c3e50, #1a2a3a);
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  animation: ${pulseAnimation} 1s infinite ease-in-out;
  overflow: hidden;
  border: 5px solid #34495e;
`

const VaultHandle = styled.div`
  width: 40px;
  height: 40px;
  background: #64b5f6;
  border-radius: 50%;
  border: 5px solid #3498db;
  position: absolute;
  animation: ${rotateAnimation} 3s infinite linear;
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.7);
`

const VaultLocks = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const VaultLock = styled.div`
  width: 15px;
  height: 15px;
  background: #e74c3c;
  border-radius: 50%;
  animation: ${pulseAnimation} 1s infinite ease-in-out;
  box-shadow: 0 0 10px rgba(231, 76, 60, 0.7);
`

const VaultText = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
  color: #64b5f6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`

export default PaginaPrincipalAdministrativa

