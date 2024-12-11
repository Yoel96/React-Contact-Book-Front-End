import React, { useEffect, useState } from "react";
import ContactCard from "../ContactCard/ContactCard";
import "./ContactList.css";

const ContactList = ({ contactListData, setContactList }) => {
  const [index, setIndex] = useState(0);
  const [filterValue, setFilterValue] = useState("");
  const [filterType, setFilterType] = useState("name");
  const onDeleteContact = (id) => {
    const newList = contactListData.filter((element) => {
      return element.id != id;
    });
    setContactList(newList);
  };

  const getPages = () => { 
    // This functions creates the pagination buttons depending on the contacts
    const pages = [];
    for (let i = 1; i <= Math.ceil(contactListData.length / 8); i++) {
      pages.push(
        <button
          key={i}
          className={i - 1 == index ? "activeIndex" : ""}
          onClick={(e) => {
            setIndex(i - 1);
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (contactListData.length > 0) {
    return (
      <div id="contactList">
        
        <div id="formFilters"  >
        <div id="filterContainer" className=" card">
          <label>Filter by:</label>
          <select id="filterSelector" onChange={(e)=>{
            setFilterValue("")
            setFilterType(e.target.value)
          }}>
            <option value="Name" selected>Name</option>
            <option value="phoneNumber">Phone</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </select>
          
            <input
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </div>
        </div>
        {contactListData
          .filter((element, idx) => {
            // On this filter we check the filters type, value and according to the pagination value
            let filter= true
            if(filterValue!=""){
              filter= element[filterType].toString().includes(filterValue)
            }
            return idx >= index * 8 && idx < (index + 1) * 8 && filter;
          })
          .map((contact) => (
            <ContactCard
              key={contact.id}
              contactData={contact}
              onDelete={onDeleteContact}
            />
          ))}

        <div id="paginationContanier">{getPages()}</div>
      </div>
    );
  } else {
    return (
      <div id="noContactContainer">
        <h2>
          You dont have any contacts at this moment, try adding new contacts.
        </h2>
      </div>
    );
  }
};

export default ContactList;
