// LoginForm.js
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import "./TeleCaller.css";
// import SlotChooser from '../SlotChooser/SlotChooser';

function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    option: "",
  });

  const saveData = () => {
    console.log(formData);
    let data = JSON.stringify(formData);
    localStorage.setItem("form1", data);
  };

  const getDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("form1");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can handle form submission here, like sending data to the server
  //   console.log("Form submitted:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://example.com/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        console.log("Form submitted successfully");
        // Clear form fields after submission
        setFormData({
          name: "",
          mobileNo: "",
          email: "",
          address: "",
          option: "",
        });
        alert("Form submitted successfully. You will receive an SMS shortly.");
      } else {
        // Handle error
        console.error("Error submitting form:", response.statusText);
        alert("An error occurred while submitting the form. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("An error occurred while submitting the form. Please try again later.");
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>TeleCaller</h2>
        <div className="input-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">MobileNo:</label>
          <input
            type="number"
            id="number"
            name="number"
            placeholder="Mobile Number"
            value={formData.mobileNo}
            onChange={(e) => {
              setFormData({ ...formData, mobileNo: e.target.value });
            }}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Address:</label>
          <input
            type="text"
            id="Address"
            name="Address"
            placeholder="Full Address"
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
            required
          />
        </div>
        <div className="input-group">
          <label for="service">Service:</label>
          <br></br>
          <select
            name="service"
            onChange={(e) => {
              setFormData({ ...formData, option: e.target.value });
            }}
            id="services"
            className="form-control"
          >
            <option value="Hand hair remove">Hand hair remove</option>
            <option value="Chest hair remove">Chest hair remove</option>
            <option value="Leg hair remove">Leg hair remove</option>
            <option value="full body hair remove">full body hair remove</option>
          </select>
          <span className="cat_error"></span>
        </div>
        <Link to="/slotchooser">
          <button type="submit" onClick={saveData}>
            Next
          </button>
        </Link>
        {/* <div>
          <h2>Saved Data</h2>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div> */}
      </form>
    </div>
  );
}

export default LoginForm;
