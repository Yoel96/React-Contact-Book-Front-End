import { useNavigate } from "react-router";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div id="header">
      <div id="mainLogo">
        <h1>Contact Book</h1>
      </div>

      <div id="mainMenu">
        {localStorage.getItem("token") && (
          <button onClick={(e) => logOut()} className="actionButton">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
