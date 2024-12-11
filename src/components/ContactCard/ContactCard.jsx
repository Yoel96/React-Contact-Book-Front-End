import React, { useState } from "react";
import {
  deleteUserContact,
  editUserContact,
} from "../../services/contactService";
import "./ContactCard.css";

const ContactCard = ({ contactData, onDelete }) => {
  const [alert, setAlert] = useState(false);
  const [inputEdit, setInputEdit] = useState(true);
  const [alertClass, setAlertClass] = useState("warningAlert");
  const [alertText, setAlertText] = useState("");
  const [contactName, setContactName] = useState(contactData.name);
  const [contactPhone, setcontactPhone] = useState(
    contactData.phoneNumber.toString()
  );
  const [contactEmail, setcontactEmail] = useState(contactData.email);
  const [contactAdress, setcontactAdress] = useState(contactData.address);

  const deleteContact = async () => {
    if (inputEdit) { //check if the user is not editing
      if (!alert) { //check if the deletion alert is activated, if so delete the contact or show the alert
        setAlertText("Press the delete button again to confirm");
        setAlert(true);
      } else {
        try {
          const res = await deleteUserContact(contactData.id);
          setAlert(false);
          onDelete(contactData.id); // delete the contact from the list
        } catch (error) {
          
          setAlertText("An error ocurred! please try later");


        }
      }
    }
  };

  const validateData = (newContactData) => {

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

  const resetEdit = () => {
    // function that just reset the data of the inputs to the original data
    setContactName(contactData.name);
    setcontactPhone(contactData.phoneNumber.toString());
    setcontactEmail(contactData.email);
    setcontactAdress(contactData.address);
    setAlert(false);
    setInputEdit(true);
  };

  const editContact = async () => {
    if (inputEdit) {
      //reset the alerts and make the inputs writtable
      setAlert(false);
      setInputEdit(false);
    } else {
      const newContactData = {
        name: contactName,
        phoneNumber: contactPhone,
        email: contactEmail,
        address: contactAdress,
      };
      if (validateData(newContactData)) { // if data is correct, send the new data to API
        try {
          const res = await editUserContact(contactData.id, newContactData);
          if (res) {
            setAlertClass("successAlert");
            setAlertText("New contact data saved!");
            setAlert(true);
            setInputEdit(true);
            setTimeout(() => {
              setAlert(false);
            }, 6000);
          }
        } catch (error) { // If the data is incorrect, alert the user
          setAlertClass("warningAlert");
          setAlertText("It seems there has been an error, try later!");
          setAlert(true);
        }
      }
    }
  };

  return (
    <div className="contactCard card">
      <div className="cardForm ">
        <div className="cardHeader">
          <input
            className="contactName"
            type="text"
            value={contactName}
            readOnly={inputEdit}
            onChange={(e) => setContactName(e.target.value)}
          />
          <button onClick={(e) => deleteContact()}>x</button>
        </div>
        <div className="inputContainer">
          <label>Phone:</label>
          <input
            type="phone"
            value={contactPhone}
            readOnly={inputEdit}
            onChange={(e) => setcontactPhone(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label>Email:</label>
          <input
            type="email"
            value={contactEmail}
            readOnly={inputEdit}
            onChange={(e) => setcontactEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label>Address:</label>
          <input
            type="text"
            value={contactAdress}
            readOnly={inputEdit}
            onChange={(e) => setcontactAdress(e.target.value)}
          />
        </div>
      </div>
      <div className="cardActions">
        {alert && (
          <div className={alertClass}>
            <p>{alertText}</p>
          </div>
        )}
        {!inputEdit ? (
          <>
            <button className="cancelEditButton" onClick={(e) => resetEdit()}>
              Cancel
            </button>
            <button
              className="saveEditButton actionButton"
              onClick={(e) => editContact()}
            >
              Save
            </button>
          </>
        ) : (
          <button className="editButton" onClick={(e) => editContact()}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
