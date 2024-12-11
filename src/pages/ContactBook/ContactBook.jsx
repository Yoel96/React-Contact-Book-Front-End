import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { getUserContacts } from "../../services/contactService";
import { getNewToken } from "../../services/config";

const ContactBook = () => {
  const [contactData, setContactData] = useState(null);

  const TokenCheck = (intervalTime = 10 * 60 * 1000) => {
    //This functions sets an interval to refresh the token each 10 minutes
    useEffect(() => {
      const interval = setInterval(async () => {
        try {
          await getNewToken();
        } catch (error) {
          localStorage.clear()
          Navigate("/")
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }, [intervalTime]);
  };

  TokenCheck();

  const getContactData = async () => {
    const res = await getUserContacts();

    if (res) {
      setContactData(res);
    }
  };

  useEffect(() => {
    if (contactData == null) {
      getContactData();
    }
  }, [contactData]);

  return (
    <>
      <ContactForm contactData={contactData} setContactData={setContactData} />
      {contactData && (
        <ContactList
          contactListData={contactData}
          setContactList={setContactData}
        />
      )}
    </>
  );
};

export default ContactBook;
