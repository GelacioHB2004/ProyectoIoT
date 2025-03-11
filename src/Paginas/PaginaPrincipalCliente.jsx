import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Calendar, List, CheckCircle, FileText } from 'react-feather'; 

const servicios = [

];

const historialesTerminos = [

];

const historialesPoliticas = [

];

const PaginaPrincipalCliente = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [servicesIndex, setServicesIndex] = useState(0);
  const [historialIndex, setHistorialIndex] = useState(0);
  const [clinicoIndex, setClinicoIndex] = useState(0);
  const [visibleServices, setVisibleServices] = useState([]);
  const [visibleHistorial, setVisibleHistorial] = useState([]); 
  const [visibleTerminos, setVisibleClinicos] = useState([]); 

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);
      setCurrentDate(nextDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDate]);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      if (servicesIndex < servicios.length) {
        setVisibleServices((prev) => [...prev, servicios[servicesIndex]]);
        setServicesIndex((prev) => prev + 1);
      } else {
        setVisibleServices([]); 
        setServicesIndex(0);
      }
    }, 1000); 

    return () => clearInterval(serviceInterval);
  }, [servicesIndex]);

  useEffect(() => {
    const historialInterval = setInterval(() => {
      if (historialIndex < historialesTerminos.length) {
        setVisibleHistorial((prev) => [...prev, historialesTerminos[historialIndex]]);
        setHistorialIndex((prev) => prev + 1);
      } else {
        setVisibleHistorial([]); 
        setHistorialIndex(0);
      }
    }, 1000); 

    return () => clearInterval(historialInterval);
  }, [historialIndex]);

  useEffect(() => {
    const clinicoInterval = setInterval(() => {
      if (clinicoIndex < historialesPoliticas.length) {
        setVisibleClinicos((prev) => [...prev, historialesPoliticas[clinicoIndex]]);
        setClinicoIndex((prev) => prev + 1);
      } else {
        setVisibleClinicos([]); 
        setClinicoIndex(0);
      }
    }, 5000);

    return () => clearInterval(clinicoInterval);
  }, [clinicoIndex]);

  return (
    <Container>
      <h1>Bienvenido ala cajas fuerte</h1>

      <Widgets>
        <Widget>
          <h2><Calendar /> Calendario</h2>
          <CalendarDisplay>
            <CalendarHeader>{currentDate.toLocaleDateString()}</CalendarHeader>
            <DateGrid>
              {Array.from({ length: 30 }, (_, index) => {
                const day = new Date(currentDate);
                day.setDate(currentDate.getDate() + index);
                return (
                  <DateCell key={index} isToday={day.toDateString() === currentDate.toDateString()}>
                    {day.getDate()}
                  </DateCell>
                );
              })}
            </DateGrid>
          </CalendarDisplay>
        </Widget>

        <Widget>
          <h2><CheckCircle /> Servicios Disponibles</h2>
          <ServiceList>
            {servicios.map((servicio, index) => (
              <ServiceItem key={index} visible={visibleServices.includes(servicio)}>
                {servicio}
              </ServiceItem>
            ))}
          </ServiceList>
        </Widget>

        <Widget>
          <h2><List /> Historial de terminos</h2>
          <HistorialList>
            { historialesTerminos.map((historial, index) => (
              <HistorialItem key={index} visible={visibleHistorial.includes(historial)}>
                {historial}
              </HistorialItem>
            ))}
          </HistorialList>
        </Widget>

        <Widget>
          <h2><FileText /> Historial politicas</h2>
          <ClinicosList>
            {historialesPoliticas.map((clinico, index) => (
              <ClinicoItem key={index} visible={visibleTerminos.includes(clinico)}>
                {clinico}
              </ClinicoItem>
            ))}
          </ClinicosList>
        </Widget>
      </Widgets>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const moveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #e8f5e9; 
  padding: 20px;
  min-height: 100vh; 
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    color: #00796b; 
    margin: 0; 
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const Widgets = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-around; 
  width: 100%;
  max-width: 1200px; 
  margin-top: 20px;
`;

const Widget = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  margin: 10px; 
  animation: ${fadeIn} 0.5s ease-in-out; 
  animation: ${moveAnimation} 3s ease-in-out infinite; 
`;

const CalendarDisplay = styled.div`
  margin-top: 10px;
`;

const CalendarHeader = styled.div`
  font-size: 1.5rem;
  color: #00796b; 
  margin-bottom: 10px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const DateCell = styled.div`
  background-color: ${(props) => (props.isToday ? '#ffeb3b' : '#e0e0e0')}; 
  border-radius: 50%;
  text-align: center;
  padding: 10px;
  transition: background-color 0.3s;
`;

const ServiceList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ServiceItem = styled.li`
  color: #00796b; 
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease; 
`;

const HistorialList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HistorialItem = styled.li`
  color: #d32f2f; 
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease; 
`;

const ClinicosList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ClinicoItem = styled.li`
  color: #1976d2; 
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.5s ease; 
`;

export default PaginaPrincipalCliente;