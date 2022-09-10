import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import Contact from "./pages/Admin/Contact/Contact";
import Settings from "./pages/Admin/Settings/Settings";
import DashboardStructure from "./pages/Structure/dashboardStrucure";
import DashboardPartner from "./pages/Partner/dashboardPartner";
import Dashboard from "./pages/Admin/Home/dashboard";
import Planning from "./pages/Admin/Planning/Planning";
import PlanningPartner from "./pages/Partner/PlanningPartner/PlanningPartner";
import ContactPartner from "./pages/Partner/Contact/ContactPartner";
import SettingsPartner from "./pages/Partner/Settings/SettingsPartner";
import PlanningStructure from "./pages/Structure/Planning/PlanningStructure";
import ContactStructure from "./pages/Structure/Contact/ContactStructure";
import SettingsStructure from "./pages/Structure/Settings/SettingsStructure";
import Unauthorized from "./pages/Unauthorized/Unauthorized";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Route Public*/}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/*Route Admin*/}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/planning" element={<Planning />} />
        <Route path="/admin/contact" element={<Contact />} />
        <Route path="/admin/parametres" element={<Settings />} />
        {/*Route Partner*/}
        <Route path="/partenaire/dashboard" element={<DashboardPartner />} />
        <Route path="/partenaire/planning" element={<PlanningPartner />} />
        <Route path="/partenaire/contact" element={<ContactPartner />} />
        <Route path="/partenaire/parametres" element={<SettingsPartner />} />
        {/*Route Structure*/}
        <Route path="/structure/dashboard" element={<DashboardStructure />} />
        <Route path="/structure/planning" element={<PlanningStructure />} />
        <Route path="/structure/contact" element={<ContactStructure />} />
        <Route path="/structure/parametres" element={<SettingsStructure />} />
        {/*Route  unauthorized  404 */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
