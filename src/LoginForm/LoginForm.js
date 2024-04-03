// LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';



function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [idpass, setIdPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending data to the server
    console.log('Form submitted:', formData);
      // Check if the entered username and password meet the condition
      if (formData.username === 'admin' && formData.password === 'admin') {
        setIdPass(true);
        navigate('/admin'); // Navigate to '/admin' page
      } else if (formData.username === 'telecaller' && formData.password === 'telecaller') {
        setIdPass(true);
        navigate('/telecaller'); // Navigate to '/telecaller' page
      } else {
        setIdPass(false);
        // Handle invalid credentials here, show error message or something
      }
    };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
          <button type="submit">Login</button>
         
      </form>
    </div>
  );
}

export default LoginForm;
