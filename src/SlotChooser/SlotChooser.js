import React, { useState, useEffect } from 'react';
import './SlotChooser.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const SlotBooking = () => {
  // Sample data for months, dates, and time slots
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  const navigate = useNavigate();
  // Function to generate time slots with 2-hour gaps
  const generateTimeSlots = () => {
    const startTime = 10; // 10:00 AM
    const endTime = 18; // 6:00 PM
    const timeSlots = [];
    for (let hour = startTime; hour <= endTime; hour += 2) {
      timeSlots.push(`${hour}:00 - ${hour + 2}:00`);
    }
    return timeSlots;
  };

  // State variables to store selected values and booked slots
  const [editSlots, seteditSlots] = useState(JSON.parse(localStorage.getItem('editDataIndex')));
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('form1')));
  const [edit, setEdit] = useState(false);
  // Additional state variables for separate filters
  const [filteredMonth, setFilteredMonth] = useState('');
  const [filteredDate, setFilteredDate] = useState('');
  const [filteredTimeSlot, setFilteredTimeSlot] = useState('');
   
  useEffect(() => {
    if (editSlots) {
      setEdit(true);
      setSelectedMonth(editSlots.user.month);
      setSelectedDate(editSlots.user.date);
      setSelectedTimeSlot(editSlots.user.timeSlot);
    }
  }, [editSlots]); // Include editSlots in the dependency array
  


  // Function to handle slot booking
  const handleSlotBooking = () => {
    // Check if all fields are selected
    if (selectedDate && selectedMonth && selectedTimeSlot) {
      // Check if the slot is already booked
      const isSlotBooked = bookedSlots.some(slot => slot.date === selectedDate && slot.month === selectedMonth && slot.timeSlot === selectedTimeSlot);
      if (!isSlotBooked) {
        // Add the booked slot to the list
        setBookedSlots([...bookedSlots, { date: selectedDate, month: selectedMonth, timeSlot: selectedTimeSlot }]);
        // Save booked slots to local storage
        localStorage.setItem('bookedSlots', JSON.stringify([...bookedSlots, { date: selectedDate, month: selectedMonth, timeSlot: selectedTimeSlot, user: userData }]));
        // Reset selected values
        setSelectedMonth('');
        setSelectedDate('');
        setSelectedTimeSlot('');
        alert('Slot booked successfully!');
        navigate('/daydashboard'); // Navigate to '/admin' page
      } else {
        alert('Slot is already booked. Please select another slot.');
      }
    } else {
      alert('Please select month, date, and time slot.');
    }
  };
   const handleeditSlotBooking = () =>{
    if (selectedDate && selectedMonth && selectedTimeSlot) {
      // Check if the slot is already booked
      const isSlotBooked = bookedSlots.some(slot => slot.date === selectedDate && slot.month === selectedMonth && slot.timeSlot === selectedTimeSlot);
    
      if (!isSlotBooked) {
        // Add the booked slot to the list
        setBookedSlots([...bookedSlots, { date: selectedDate, month: selectedMonth, timeSlot: selectedTimeSlot }]);

        const updatedData = [...bookedSlots];
        console.log(updatedData)

    updatedData.splice(editSlots.index, 1);

    updatedData.splice(editSlots.index, 0, { date: selectedDate, month: selectedMonth, timeSlot: selectedTimeSlot, user: userData });

         localStorage.setItem('bookedSlots', JSON.stringify(updatedData));
      
        setSelectedMonth('');
        setSelectedDate('');
        setSelectedTimeSlot('');
        alert('Slot edited successfully!');
        navigate('/daydashboard'); // Navigate to '/admin' page
      } else {
        alert('Slot is already booked. Please select another slot.');
      }
    } else {
      alert('Please select month, date, and time slot.');
    }

   }

  // Function to retrieve booked slots from local storage on component mount
  useEffect(() => {
    const storedBookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];
    setBookedSlots(storedBookedSlots);
  }, []);

  // Filter booked slots according to selected filters
  const filteredBookedSlots = bookedSlots.filter(slot => {
    return (
      (!filteredMonth || slot.month === filteredMonth) &&
      (!filteredDate || slot.date === filteredDate) &&
      (!filteredTimeSlot || slot.timeSlot === filteredTimeSlot)
    );
  });

  return (
    <div className="calendar-container">
      {edit ? <h2>Edit Slot Booking</h2> : <h2>Slot Booking</h2>}
      <div className="calendar">
        <div className="calendar-months">
          <label>Select Month:</label>
          <br/>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="calendar-dates">
          <label>Select Date:</label>
          <br/>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Select Date</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="calendar-slots">
          <label>Select Time Slot:</label>
          <br/>
          <select value={selectedTimeSlot} onChange={(e) => setSelectedTimeSlot(e.target.value)}>
            <option value="">Select Time Slot</option>
            {generateTimeSlots().map((timeSlot, index) => (
              <option key={index} value={timeSlot}>{timeSlot}</option>
            ))}
          </select>
        </div>
      </div>
      {edit ? <button onClick={handleeditSlotBooking}>Edit Book Slot</button> : <button onClick={handleSlotBooking}>Book Slot</button>  }
      <h2>Filter section</h2>
      <div className="filter-section">
        <label>Filter by Month:</label>
        <select value={filteredMonth} onChange={(e) => setFilteredMonth(e.target.value)}>
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Filter by Date:</label>
        <select value={filteredDate} onChange={(e) => setFilteredDate(e.target.value)}>
          <option value="">All Dates</option>
          {dates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Filter by Time Slot:</label>
        <select value={filteredTimeSlot} onChange={(e) => setFilteredTimeSlot(e.target.value)}>
          <option value="">All Time Slots</option>
          {generateTimeSlots().map((timeSlot, index) => (
            <option key={index} value={timeSlot}>{timeSlot}</option>
          ))}
        </select>
      </div>
      <div className="booked-slots">
        <h2>Booked Slots</h2>
        <ul>
          {filteredBookedSlots.map((slot, index) => (
            <li key={index}> {slot.date}, {slot.month}, {slot.timeSlot}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlotBooking;
