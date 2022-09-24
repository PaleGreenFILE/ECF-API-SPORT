import AccessDenied from '../../pages/AccesDenied/AccessDenied';
import Contact from '../../pages/Admin/Contact/Contact';
import Dashboard from '../../pages/Admin/Home/dashboard';
import Planning from '../../pages/Admin/Planning/Planning';
import Settings from '../../pages/Admin/Settings/Settings';
import Login from '../../pages/Login/login';
import NotFound from '../../pages/NotFound/NotFound';
import ContactPartner from '../../pages/Partner/Contact/ContactPartner';
import DashboardPartner from '../../pages/Partner/dashboardPartner';
import PlanningPartner from '../../pages/Partner/PlanningPartner/PlanningPartner';
import SettingsPartner from '../../pages/Partner/Settings/SettingsPartner';
import PasswordChange from '../../pages/Password/PasswordChange';
import ContactStructure from '../../pages/Structure/Contact/ContactStructure';
import DashboardStructure from '../../pages/Structure/dashboardStrucure';
import PlanningStructure from '../../pages/Structure/Planning/PlanningStructure';
import SettingsStructure from '../../pages/Structure/Settings/SettingsStructure';
import { userRoles } from './constants';
import ProtectedRoute from './protected-route';
import appRoutes from './routes';

const routesConfig = [
  {
    path: appRoutes.LOGIN,
    element: <Login />,
  },
  {
    path: appRoutes.PASSWORDCHANGE,
    element: <PasswordChange />,
  },
  {
    path: appRoutes.ACCESSDENIED,
    element: <AccessDenied />,
  },
  {
    path: appRoutes.ADMINDASH,
    element: (
      <ProtectedRoute >
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINPLANNING,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.admin]}>
        <Planning />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINCONTACT,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.admin]}>
        <Contact />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINSETTINGS,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.admin]}>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERDASH,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.partner]}>
        <DashboardPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERPLANNING,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.partner]}>
        <PlanningPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERCONTACT,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.partner]}>
        <ContactPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERSETTINGS,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.partner]}>
        <SettingsPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTUREDASH,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.structure]}>
        <DashboardStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTUREPLANNING,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.structure]}>
        <PlanningStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTURECONTACT,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.structure]}>
        <ContactStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTURESETTINGS,
    element: (
      <ProtectedRoute expectedRoles={[userRoles.structure]}>
        <SettingsStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.NOTFOUND,
    element: <NotFound />,
  },
];

export default routesConfig;
