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
import { ThemeProvider, useTheme } from './Componentes/Temas/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
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
import ProtectedRoute from './Componentes/Autenticacion/ProtectedRoute';
import TerminosHi from './Componentes/Administrativo/TerminosHi';
import PoliticasHi from './Componentes/Administrativo/PoliticasHi';
import DeslindesHi from './Componentes/Administrativo/DeslindesHi';
import UserSospechosos from './Componentes/Administrativo/UserSospechosos';
import VerificarCodigo from './Componentes/Autenticacion/MFA';
import MFASetup from './Componentes/Autenticacion/MFASetup';
import VerifyMFA from './Componentes/Autenticacion/VerifyMFA';
import Productos from './Componentes/Publico/Productos';
import Servicios from './Componentes/Publico/Servicios';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LayoutConEncabezado>
         
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Rutas protegidas para la sección administrativa */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['Administrador']}><PaginaPrincipalAdministrativa /></ProtectedRoute>} />
            <Route path="/admin/politicas" element={<ProtectedRoute allowedRoles={['Administrador']}><Politicas /></ProtectedRoute>} />
            <Route path="/admin/terminos" element={<ProtectedRoute allowedRoles={['Administrador']}><Terminos /></ProtectedRoute>} />
            <Route path="/admin/perfil" element={<ProtectedRoute allowedRoles={['Administrador']}><Perfil /></ProtectedRoute>} />
            <Route path="/admin/deslinde" element={<ProtectedRoute allowedRoles={['Administrador']}><Deslinde /></ProtectedRoute>} />
            <Route path="/admin/activity-log" element={<ProtectedRoute allowedRoles={['Administrador']}><ActividadLogeo /></ProtectedRoute>} />
            <Route path="/admin/registro-password" element={<ProtectedRoute allowedRoles={['Administrador']}><RegistroCambioPassw /></ProtectedRoute>} />
            <Route path="/admin/roles" element={<ProtectedRoute allowedRoles={['Administrador']}><RolesF /></ProtectedRoute>} />
            <Route path="/admin/terminos-condiciones" element={<ProtectedRoute allowedRoles={['Administrador']}><TerminosF /></ProtectedRoute>} />
            <Route path="/admin/politicass" element={<ProtectedRoute allowedRoles={['Administrador']}><PoliticasF /></ProtectedRoute>} />
            <Route path="/admin/deslindes" element={<ProtectedRoute allowedRoles={['Administrador']}><DeslindeF /></ProtectedRoute>} />
            <Route path="/admin/historial-terminos" element={<ProtectedRoute allowedRoles={['Administrador']}><TerminosHi /></ProtectedRoute>} />
            <Route path="/admin/historial-politicas" element={<ProtectedRoute allowedRoles={['Administrador']}><PoliticasHi/></ProtectedRoute>} />
            <Route path="/admin/historial-deslindes" element={<ProtectedRoute allowedRoles={['Administrador']}><DeslindesHi/></ProtectedRoute>} />
            <Route path="/admin/registro-sospechosos" element={<ProtectedRoute allowedRoles={['Administrador']}><UserSospechosos/></ProtectedRoute>} />

            {/* Rutas protegidas para clientes */}
            <Route path="/cliente" element={<ProtectedRoute allowedRoles={['Cliente']}><PaginaPrincipalCliente /></ProtectedRoute>} />
            <Route path="/cliente/terminos-condiciones" element={<ProtectedRoute allowedRoles={['Cliente']}><TerminosF /></ProtectedRoute>} />
            <Route path="/cliente/politicass" element={<ProtectedRoute allowedRoles={['Cliente']}><PoliticasF /></ProtectedRoute>} />
            <Route path="/cliente/deslindes" element={<ProtectedRoute allowedRoles={['Cliente']}><DeslindeF /></ProtectedRoute>} />

            {/* Rutas públicas */}
            <Route path="/verificar_correo" element={<SolicitarCodigo />} />
            <Route path="/validar_codigo" element={<ValidarCodigo />} />
            <Route path="/cambiar_password" element={<CambiarPassword />} />
            <Route path="/verificar-correo" element={<VerificarCorreo />} />
            <Route path="/verificacion-codigo" element={<VerificarCodigo />} />
            <Route path="/terminos-condiciones" element={<TerminosF />} />
            <Route path="/politicass" element={<PoliticasF />} />
            <Route path="/deslindes" element={<DeslindeF />} />
            <Route path="/MFAS" element={<MFASetup />} />
            <Route path="/codigo-mfa" element={<VerifyMFA />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicios" element={<Servicios />} />


          </Routes>
        </LayoutConEncabezado>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
