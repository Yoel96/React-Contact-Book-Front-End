import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import "./mainLayout.css";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div id="mainLayout">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
