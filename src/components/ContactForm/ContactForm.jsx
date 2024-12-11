import React, { useState } from "react";
import { uploadUserContact } from "../../services/contactService";
import { useNavigate } from "react-router";
import "./ContactForm.css";
const ContactForm = ({ contactData, setContactData }) => {

  const [buttonText, setButtonText] = useState("+");
  const [cardClass, setCardClass] = useState("hideCard");
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertClass, setAlertClass] = useState("warningAlert");
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newcontactEmail, setNewContactEmail] = useState("");
  const [newcontactAdress, setNewContactAdress] = useState("");

  const validateInputs = (newContactData) => {

    /*
    This functions validates the data of the inputs, first checks if the inputs are empty,
    and then checks that the data is correctly formated for email and phone
    
    */
    if (
      newContactData.name != "" &&
      newContactData.phoneNumber != "" &&
      newContactData.email != ""
    ) {
      if (
        !newContactData.phoneNumber.match(
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/
        )
      ) {
        setAlertClass("warningAlert");
        setAlertText("Please entry a valid phone!");
        setAlert(true);
        return false;
      }
      if (
        !newContactData.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        setAlertClass("warningAlert");
        setAlertText("Please entry a valid email!");
        setAlert(true);
        return false;
      }
      return true;
    } else {
      setAlertClass("warningAlert");
      setAlertText("Please entry atleast the name, email and phone!");
      setAlert(true);

      return false;
    }
  };

  const clearInputs = () => {
    // This function just clears the inputs
    setNewContactName("");
    setNewContactPhone("");
    setNewContactEmail("");
    setNewContactAdress("");
  };

  const submitNewContact = async () => {
    const newContactData = {
      name: newContactName,
      phoneNumber: newContactPhone,
      email: newcontactEmail,
      address: newcontactAdress,
    };

    if (validateInputs(newContactData)) { // If data is correctly formated, submit the data 
      try {
        const res = await uploadUserContact(newContactData);
        if (res) {
          newContactData.id = res.id;
          setContactData([...contactData, newContactData]);
          setAlertClass("successAlert");
          setAlertText("Contact saved!");
          clearInputs();
          setAlert(true);
        }
      } catch (err) {
        setAlertClass("warningAlert");
        setAlertText("It seems there has been an error, try later!");
        setAlert(true);
      }
    }
    setTimeout(() => {
      setAlert(false);
    }, 6000);
  };

  return (
    <>
      <div id="contactFormContainer" className={cardClass}>
        <div id="contactFormCard" className="card">
          <h2> Add New Contact </h2>
          <div className="contactForm">
            <div className="inputContainer">
              <label>Name:</label>
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>Phone:</label>
              <input
                type="phone"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>Email:</label>
              <input
                type="email"
                value={newcontactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>Address:</label>
              <input
                type="text"
                value={newcontactAdress}
                onChange={(e) => setNewContactAdress(e.target.value)}
              />
            </div>
            <button
              className="actionButton"
              onClick={(e) => submitNewContact()}
            >
              Save New Contact
            </button>
            {alert && (
              <div className={alertClass}>
                <p>{alertText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        id="showFormButton"
        onClick={() =>
          setCardClass(cardClass == "hideCard" ? "showCard" : "hideCard")
        }
      >
        <span         onClick={() =>
          setButtonText(buttonText == "+" ? "-" : "+")
        }>{buttonText}</span>
      </button>
    </>
  );
};

export default ContactForm;
