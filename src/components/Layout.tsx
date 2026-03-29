import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CalculatorModal from "./CalculatorModal";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent={isHome} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CalculatorModal />
    </div>
  );
};

export default Layout;
