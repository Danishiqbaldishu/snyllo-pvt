// AdminPanel.js
import React from 'react';
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header/Header';
import './Admin.css'

function AdminPanel() {  

  const navigate = useNavigate();
  const handleSubmit = () =>{
    navigate('/daydashboard'); // Navigate to '/daydashboard' page
  }

  return (
   
      <div className="main-content">
        <Header >DashBoard</Header>
        <div className="content">
          <button onClick={handleSubmit}>DashBoard</button>
        </div>
      </div>
  
  );
}

export default AdminPanel;
