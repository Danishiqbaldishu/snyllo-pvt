import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import './DayDashboard.css';

const DayDashBoard = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('bookedSlots')) || []);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleEdit = (user, index) => {
    console.log('Edit clicked for index:', user, index);
    
     localStorage.setItem('editDataIndex', JSON.stringify({user, index}));
    navigate('/slotchooser');

  };

  const handleDelete = (index) => {
    const updatedData = [...userData];
    updatedData.splice(index, 1);
    setUserData(updatedData);
    localStorage.setItem('bookedSlots', JSON.stringify(updatedData));
  };

  const filteredData = userData.filter(user => {
    return (
      (!selectedMonth || user.month === selectedMonth) &&
      (!selectedDate || user.date === selectedDate) &&
      (!selectedTime || user.timeSlot === selectedTime)
    );
  });
    const addNewData = () =>{
      localStorage.removeItem("editDataIndex");
          navigate('/telecaller')
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <div className='addData'><button className='addNewData' onClick={addNewData}>Add new Data</button></div>
      <div className="filter-section">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <label>Select Date:</label>
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">All Dates</option>
          {dates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <label>Select Time Slot:</label>
        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">All Time Slots</option>
          <option value="10:00 - 12:00">10:00 - 12:00</option>
          <option value="12:00 - 14:00">12:00 - 14:00</option>
          <option value="14:00 - 16:00">14:00 - 16:00</option>
          <option value="16:00 - 18:00">16:00 - 18:00</option>
          <option value="18:00 - 20:00">18:00 - 20:00</option>
        </select>
      </div>
      {filteredData.map((user, index) => (
        <div className='data-box' key={index}>
          <h2> {user.user.name}</h2>
          <p>Mobile No: {user.user.mobileNo}</p>
          <p>Email: {user.user.email}</p>
          <p>Address: {user.user.address}</p>
          <p>Option: {user.user.option}</p>
          <h5>{user.date}, {user.month}, {user.timeSlot}</h5>
          <div className='btn'><button className='edit-btn' onClick={() => handleEdit(user, index)}>Edit</button></div>
          <div className='btn'><button className='delete-btn' onClick={() => handleDelete(index)}>Delete</button></div>
        </div>
      ))}
    </div>
  );
}

export default DayDashBoard;
