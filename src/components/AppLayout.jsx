
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout({ onLogout }) {
  return (
    <div className="app-layout">
      <Navbar onLogout={onLogout} />

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

