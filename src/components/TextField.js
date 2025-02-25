import React, { useState } from 'react';

const TextField = ({ onSubmit, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;

    if (value.length > 50) {
      setError("Plant name cannot exceed 50 characters.");
      return;
    }

    value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    setInputValue(value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError("Please enter a valid plant name.");
      return;
    }

    onSubmit(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Species "
          maxLength="50"
          autoFocus
        />
        <button type="submit">Save</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TextField;