import React, { useState } from 'react';

const Reminders = ({ plantName, onClose }) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminders, setReminders] = useState([]);

  const handleAddReminder = () => {
    if (!reminderDate) return;

    setReminders([...reminders, reminderDate]);
    setReminderDate('');
  };

  return (
    <div>
      <h3>Reminders for {plantName}</h3>
      <button onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>Close</button>
      <input
        type="date"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
      />
      <button onClick={handleAddReminder}>Set Reminder</button>

      <ul>
        {reminders.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;