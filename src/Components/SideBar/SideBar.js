// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'


function Sidebar() {
  return (
    <div className="sideBar">
      {/* Sidebar content */}
      <ul>
      <Link to ='#'> <li>OneDay Slot</li></Link>
      <Link to ='#'>  <li>Full Month Slot</li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;
