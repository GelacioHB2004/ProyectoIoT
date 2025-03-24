"use client"

import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Calendar, Shield, Lock, FileText, Key, User, Bell, Settings } from "react-feather"

// Datos de ejemplo relacionados con caja fuerte
const servicios = [
  "Apertura de caja fuerte",
  "Cambio de clave",
  "Mantenimiento preventivo",
  "Reparación de emergencia",
  "Instalación de caja fuerte",
]

const historiales = [
  "Política de seguridad actualizada",
  "Términos de custodia revisados",
  "Política de acceso modificada",
  "Normas de confidencialidad actualizadas",
  "Protocolo de emergencia revisado",
]

const historialesServicios = [
  "Términos de servicio de apertura",
  "Términos de cambio de clave",
  "Términos de mantenimiento",
  "Términos de reparación",
  "Términos de instalación",
]

const PaginaPrincipalCliente = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [servicesIndex, setServicesIndex] = useState(0)
  const [historialIndex, setHistorialIndex] = useState(0)
  const [clinicoIndex, setClinicoIndex] = useState(0)
  const [visibleServices, setVisibleServices] = useState([])
  const [visibleHistorial, setVisibleHistorial] = useState([])
  const [visibleClinicos, setVisibleClinicos] = useState([])
  const [showVaultAnimation, setShowVaultAnimation] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDate = new Date(currentDate)
      nextDate.setDate(currentDate.getDate() + 1)
      setCurrentDate(nextDate)
    }, 600)

    return () => clearInterval(interval)
  }, [currentDate])

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      if (servicesIndex < servicios.length) {
        setVisibleServices((prev) => [...prev, servicios[servicesIndex]])
        setServicesIndex((prev) => prev + 1)
      } else {
        setVisibleServices([])
        setServicesIndex(0)
      }
    }, 400)

    return () => clearInterval(serviceInterval)
  }, [servicesIndex])

  useEffect(() => {
    const historialInterval = setInterval(() => {
      if (historialIndex < historiales.length) {
        setVisibleHistorial((prev) => [...prev, historiales[historialIndex]])
        setHistorialIndex((prev) => prev + 1)
      } else {
        setVisibleHistorial([])
        setHistorialIndex(0)
      }
    }, 400)

    return () => clearInterval(historialInterval)
  }, [historialIndex])

  useEffect(() => {
    const clinicoInterval = setInterval(() => {
      if (clinicoIndex < historialesServicios.length) {
        setVisibleClinicos((prev) => [...prev, historialesServicios[clinicoIndex]])
        setClinicoIndex((prev) => prev + 1)
      } else {
        setVisibleClinicos([])
        setClinicoIndex(0)
      }
    }, 400)

    return () => clearInterval(clinicoInterval)
  }, [clinicoIndex])

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
          <VaultText>Accediendo a su sistema seguro...</VaultText>
        </VaultAnimation>
      ) : (
        <>
          <Header>
            <h1>Sistema de Gestión de Caja Fuerte</h1>
            <p>Su seguridad, nuestra prioridad.</p>
          </Header>

          <SecurityBanner>
            <Shield size={24} />
            <span></span>
          </SecurityBanner>

          <QuickAccess>
            <QuickAccessButton>
              <Lock size={20} />
              <span>Abrir Caja</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <Key size={20} />
              <span>Cambiar Clave</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <Bell size={20} />
              <span>Alertas</span>
            </QuickAccessButton>
            <QuickAccessButton>
              <User size={20} />
              <span>Usuarios</span>
            </QuickAccessButton>
          </QuickAccess>

          <Widgets>
            <Widget>
              <WidgetHeader>
                <Calendar size={20} />
                <h2>Calendario de Accesos</h2>
              </WidgetHeader>
              <CalendarDisplay>
                <CalendarHeader>{currentDate.toLocaleDateString()}</CalendarHeader>
                <DateGrid>
                  {Array.from({ length: 30 }, (_, index) => {
                    const day = new Date(currentDate)
                    day.setDate(currentDate.getDate() + index - 15)
                    return (
                      <DateCell key={index} isToday={day.toDateString() === new Date().toDateString()}>
                        {day.getDate()}
                      </DateCell>
                    )
                  })}
                </DateGrid>
              </CalendarDisplay>
            </Widget>

            <Widget>
              <WidgetHeader>
                <Lock size={20} />
                <h2>Servicios de Caja Fuerte</h2>
              </WidgetHeader>
              <ServiceList>
                {servicios.map((servicio, index) => (
                  <ServiceItem key={index} visible={visibleServices.includes(servicio)}>
                    <ServiceIcon>
                      <Key size={16} />
                    </ServiceIcon>
                    {servicio}
                  </ServiceItem>
                ))}
              </ServiceList>
            </Widget>

            <Widget>
              <WidgetHeader>
                <Shield size={20} />
                <h2>Políticas de Seguridad</h2>
              </WidgetHeader>
              <HistorialList>
                {historiales.map((historial, index) => (
                  <HistorialItem key={index} visible={visibleHistorial.includes(historial)}>
                    <HistorialIcon>
                      <Shield size={16} />
                    </HistorialIcon>
                    {historial}
                  </HistorialItem>
                ))}
              </HistorialList>
            </Widget>

            <Widget>
              <WidgetHeader>
                <FileText size={20} />
                <h2>Términos de Servicio</h2>
              </WidgetHeader>
              <ClinicosList>
                {historialesServicios.map((clinico, index) => (
                  <ClinicoItem key={index} visible={visibleClinicos.includes(clinico)}>
                    <ClinicoIcon>
                      <FileText size={16} />
                    </ClinicoIcon>
                    {clinico}
                  </ClinicoItem>
                ))}
              </ClinicosList>
            </Widget>
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
                <Settings size={20} />
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

  h1 {
    font-size: 2.5rem;
    color: #e0e0e0;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.2rem;
    color: #a0a0a0;
    margin-top: 10px;
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
  max-width: 800px;
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
  }

  span {
    font-size: 0.9rem;
    color: #e0e0e0;
  }
`

const Widgets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`

const Widget = styled.div`
  background: linear-gradient(145deg, rgba(30, 60, 90, 0.4), rgba(20, 40, 60, 0.4));
  border: 1px solid rgba(100, 150, 200, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  }
`

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(100, 150, 200, 0.3);

  svg {
    margin-right: 10px;
    color: #64b5f6;
  }

  h2 {
    font-size: 1.3rem;
    color: #e0e0e0;
    margin: 0;
  }
`

const CalendarDisplay = styled.div`
  margin-top: 10px;
`

const CalendarHeader = styled.div`
  font-size: 1.2rem;
  color: #64b5f6;
  margin-bottom: 15px;
  text-align: center;
`

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`

const DateCell = styled.div`
  background-color: ${(props) => (props.isToday ? "rgba(100, 181, 246, 0.3)" : "rgba(30, 60, 90, 0.3)")};
  border: 1px solid ${(props) => (props.isToday ? "rgba(100, 181, 246, 0.5)" : "rgba(100, 150, 200, 0.2)")};
  border-radius: 8px;
  text-align: center;
  padding: 8px 0;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(100, 181, 246, 0.2);
  }
`

const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ServiceItem = styled.li`
  display: flex;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.3);
  border: 1px solid rgba(100, 150, 200, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 10px;
  color: #e0e0e0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateX(0)" : "translateX(-20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover {
    background-color: rgba(40, 80, 120, 0.4);
  }
`

const ServiceIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #64b5f6;
`

const HistorialList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const HistorialItem = styled.li`
  display: flex;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.3);
  border: 1px solid rgba(100, 150, 200, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 10px;
  color: #e0e0e0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateX(0)" : "translateX(-20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover {
    background-color: rgba(40, 80, 120, 0.4);
  }
`

const HistorialIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #4caf50;
`

const ClinicosList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ClinicoItem = styled.li`
  display: flex;
  align-items: center;
  background-color: rgba(30, 60, 90, 0.3);
  border: 1px solid rgba(100, 150, 200, 0.2);
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 10px;
  color: #e0e0e0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "translateX(0)" : "translateX(-20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;

  &:hover {
    background-color: rgba(40, 80, 120, 0.4);
  }
`

const ClinicoIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color:rgb(35, 45, 58);
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

export default PaginaPrincipalCliente;

