import { onLogout } from "../api/auth";
import { useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState();

  const logout = async () => {
    try {
      await onLogout();
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="bg ">
      <h1>Dashboard</h1>
      <button onClick={() => logout()} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
