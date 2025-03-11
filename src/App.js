import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutConEncabezado from './Componentes/Layouts/LayoutConEncabezado';
import PaginaPrincipal from './Paginas/PaginaPrincipal';
import PaginaPrincipalAdministrativa from './Paginas/PaginaPrincipalAdministrativa';
import PaginaPrincipalCliente from './Paginas/PaginaPrincipalCliente';
import Login from './Componentes/Autenticacion/Login';
import Registro from './Componentes/Autenticacion/Registro';
import Politicas from './Componentes/Administrativo/Politicas';
import Terminos from './Componentes/Administrativo/Terminos';
import Perfil from './Componentes/Administrativo/Perfil';
import Deslinde from './Componentes/Administrativo/Deslinde';
import { ThemeProvider } from './Componentes/Temas/ThemeContext';
import ValidarCodigo from './Componentes/Autenticacion/ValidarCodigo';
import CambiarPassword from './Componentes/Autenticacion/CambiarPassword';
import SolicitarCodigo from './Componentes/Autenticacion/SolicitarCodigo';
import VerificarCorreo from './Componentes/Autenticacion/VerificarCorreo';
import ActividadLogeo from './Componentes/Administrativo/ActividadLogeo';
import RegistroCambioPassw from './Componentes/Administrativo/RegistroCambioPassw';
import TerminosF from './Componentes/Compartidos/TerminosF';
import PoliticasF from './Componentes/Compartidos/PoliticasF';
import DeslindeF from './Componentes/Compartidos/DeslindeF';
import RolesF from './Componentes/Administrativo/RolesF';
import { AuthProvider } from './Componentes/Autenticacion/AuthContext';
import TerminosHi from './Componentes/Administrativo/TerminosHi';
import PoliticasHi from './Componentes/Administrativo/PoliticasHi';
import DeslindesHi from './Componentes/Administrativo/DeslindesHi';
import UserSospechosos from './Componentes/Administrativo/UserSospechosos';
import MFASetup from './Componentes/Autenticacion/MFASetup';
import VerifyMFA from './Componentes/Autenticacion/VerifyMFA';
import Productos from './Componentes/Publico/Productos';
import Servicios from './Componentes/Publico/Servicios';
import Registroiot from './Componentes/Cliente/RegistroIot';
import CajaFuerteControl from './Componentes/Cliente/CajaFuerteControl';
import ControlIoT from './Componentes/Cliente/ControlIoT';




const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutConEncabezado>
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/admin" element={<PaginaPrincipalAdministrativa />} />
            <Route path="/admin/politicas" element={<Politicas />} />
            <Route path="/admin/terminos" element={<Terminos />} />
            <Route path="/admin/perfil" element={<Perfil />} />
            <Route path="/admin/deslinde" element={<Deslinde />} />
            <Route path="/admin/activity-log" element={<ActividadLogeo />} />
            <Route path="/admin/registro-password" element={<RegistroCambioPassw />} />
            <Route path="/admin/roles" element={<RolesF />} />
            <Route path="/admin/terminos-condiciones" element={<TerminosF />} />
            <Route path="/admin/politicass" element={<PoliticasF />} />
            <Route path="/admin/deslindes" element={<DeslindeF />} />
            <Route path="/admin/historial-terminos" element={<TerminosHi />} />
            <Route path="/admin/historial-politicas" element={<PoliticasHi />} />
            <Route path="/admin/historial-deslindes" element={<DeslindesHi />} />
            <Route path="/admin/registro-sospechosos" element={<UserSospechosos />} />

            <Route path="/admin/iot" element={<Terminos />} />
            
            <Route path="/cliente" element={<PaginaPrincipalCliente />} />
            <Route path="/cliente/terminos-condiciones" element={<TerminosF />} />
            <Route path="/cliente/politicass" element={<PoliticasF />} />
            <Route path="/cliente/deslindes" element={<DeslindeF />} />
            <Route path="/verificar_correo" element={<SolicitarCodigo />} />
            <Route path="/validar_codigo" element={<ValidarCodigo />} />
            <Route path="/cambiar_password" element={<CambiarPassword />} />
            <Route path="/verificar-correo" element={<VerificarCorreo />} />
            <Route path="/terminos-condiciones" element={<TerminosF />} />
            <Route path="/politicass" element={<PoliticasF />} />
            <Route path="/deslindes" element={<DeslindeF />} />
            <Route path="/MFAS" element={<MFASetup />} />
            <Route path="/codigo-mfa" element={<VerifyMFA />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/cliente/RegistroIoT" element={<Registroiot />} />
            <Route path="/cliente/CajaFuerteControl" element={<CajaFuerteControl />} />
            <Route path="/cliente/ControlCajaFuerte" element={<ControlIoT />} />
            
          </Routes>
        </LayoutConEncabezado>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
