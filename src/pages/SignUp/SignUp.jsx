import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/authService";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertClass, setAlertClass] = useState("warningAlert");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (password != "" && email != "") {
      if (
        !email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        setAlertClass("warningAlert");
        setAlertText("Please entry a valid email!");
        setAlert(true);
        return false;
      }

      if (
        !password.match(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/
        )
      ) {
        setAlertClass("warningAlert");
        setAlertText(
          "Please entry a password with atleast one uppercase leter, one number and a special character!"
        );
        setAlert(true);
        return false;
      }
      return true;
    } else {
      setAlertClass("warningAlert");
      setAlertText("Please entry all the inputs!");
      setAlert(true);

      return false;
    }
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      try {
        const res = await signUp({ email, password });
        console.log(res);
        if (res) {
          setAlertClass("successAlert");
          setAlertText("User created!");
          setAlert(true);
          setTimeout(() => navigate("/"), 4000);
        }else{
          setAlertClass("warningAlert");
          setAlertText("There seems to be an error, maybe try with another email, or try later");
          setAlert(true);

        }
      } catch (error) {
        setAlertClass("warningAlert");
        setAlertText("There was an error creating the user, please try later");
        setAlert(true);
      }
    }
  };

  return (
    <>
      <div id="signUpCard" className="card">
        <h2>Sign Up</h2>
        <div id="signUpForm">
          <div className="inputContainer">
            <label>Email:</label>
            <input
              name="userEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label>Password:</label>
            <input
              name="userPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="cardActions">
            <a href="/">I have an account</a>
            <button
              className="actionButton"
              type="submit"
              onClick={() => {
                handleSignUp();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        {alert && (
          <div className={alertClass}>
            <p>{alertText}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
