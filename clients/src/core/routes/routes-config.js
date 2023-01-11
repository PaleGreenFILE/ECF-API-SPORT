import AccessDenied from "../../pages/AccesDenied/AccessDenied";
import Contact from "../../pages/Admin/Contact/Contact";
import Dashboard from "../../pages/Admin/Home/dashboard";
import Planning from "../../pages/Admin/Planning/Planning";
import Settings from "../../pages/Admin/Settings/Settings";
import Login from "../../pages/Login/login";
import NotFound from "../../pages/NotFound/NotFound";
import ContactPartner from "../../pages/Partner/Contact/ContactPartner";
import DashboardPartner from "../../pages/Partner/dashboardPartner";
import PlanningPartner from "../../pages/Partner/PlanningPartner/PlanningPartner";
import SettingsPartner from "../../pages/Partner/Settings/SettingsPartner";
import PasswordChange from "../../pages/Password/PasswordChange";
import DashboardStructure from "../../pages/Structure/dashboardStrucure";
import PlanningStructure from "../../pages/Structure/Planning/PlanningStructure";
import SettingsStructure from "../../pages/Structure/Settings/SettingsStructure";
import appRoutes from "./routes";
import ProtectedRoute from "./protected.route";

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
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINPLANNING,
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Planning />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINCONTACT,
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Contact />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.ADMINSETTINGS,
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERDASH,
    element: (
      <ProtectedRoute allowedRoles={["partenaire"]}>
        <DashboardPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERPLANNING,
    element: (
      <ProtectedRoute allowedRoles={["partenaire"]}>
        <PlanningPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERCONTACT,
    element: (
      <ProtectedRoute allowedRoles={["partenaire"]}>
        <ContactPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.PARTNERSETTINGS,
    element: (
      <ProtectedRoute allowedRoles={["partenaire"]}>
        <SettingsPartner />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTUREDASH,
    element: (
      <ProtectedRoute allowedRoles={["structure"]}>
        <DashboardStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTUREPLANNING,
    element: (
      <ProtectedRoute allowedRoles={["structure"]}>
        <PlanningStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTURECONTACT,
    element: (
      <ProtectedRoute allowedRoles={["structure"]}>
        <PlanningStructure />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.STRUCTURESETTINGS,
    element: (
      <ProtectedRoute allowedRoles={["structure"]}>
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
