import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/login";
import AddClub from "./pages/Admin/AddClub/AddClub";
import Contact from "./pages/Admin/Contact/Contact";
import Settings from "./pages/Admin/Settings/Settings";
import DashboardStructure from "./pages/Structure/dashboardStrucure";
import DashboardPartner from "./pages/Partner/dashboardPartner";
import Dashboard from "./pages/Admin/Home/dashboard";
import AddClubPartner from './pages/Partner/AddClub/AddClub';
import ContactPartner from './pages/Partner/Contact/Contact';
import SettingsPartner from './pages/Partner/Settings/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/ajouter_club" element={<AddClub />} />
          <Route path="/admin/contact" element={<Contact />} />
          <Route path="/admin/parametres" element={<Settings />} />
          <Route path="/admin/fiche/:id" element={<Settings />} />



          <Route path="/partenaire/dashboard" element={<DashboardPartner />} />
          <Route path="/partenaire/ajouter_club" element={<AddClubPartner />} />
          <Route path="/partenaire/contact" element={<ContactPartner />} />
          <Route path="/partenaire/parametres" element={<SettingsPartner />} />

          <Route path="/structure/dashboard" element={<DashboardStructure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
