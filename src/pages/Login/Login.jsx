import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();

  const validateData = () => {
     // This functions validates the data of the inputs, it checks if the inputs are empty,
    
  
    if (password != "" && email != "") {
      return true;
    } else {
      setAlertText("Please entry the email and password correctly");
      setAlert(true);
      return false;
    }
  };

  const handleLogin = async () => {
    setAlert(false);
    if (validateData()) {
      try {
        const res = await login({ email, password });
        if (res) {
          //store the tokens
          localStorage.setItem("token", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          navigate("/");
        } else {
          setAlertText("Incorrect email or password!");
          setAlert(true);
        }
      } catch (error) {
        setAlertText("There was an error trying to log in, please try later");
        setAlert(true);
      }
    }
  };

  return (
    <>
      <div id="loginCard" className="card">
        <h2>Login</h2>
        <div id="loginForm">
          <div className="inputContainer">
            <label>Email:</label>
            <input
              name="userEmail"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label>Password:</label>
            <input
              name="userPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="cardActions">
            <a href="/signUp"> I don't have an account</a>
            <button 
              className="actionButton"
              type="submit"
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          </div>
        </div>
        {alert && (
          <div className="warningAlert">
            <p>{alertText}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
