import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const GrowthTracker = ({ plantName, onClose }) => {
  const [growthData, setGrowthData] = useState([]);
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');

  const handleAddEntry = () => {
    if (!height || !date) return;

    setGrowthData([...growthData, { height: Number(height), date }]);
    setHeight('');
    setDate('');
  };

  const data = {
    labels: growthData.map(entry => entry.date),
    datasets: [
      {
        label: `${plantName} Growth (inches)`,
        data: growthData.map(entry => entry.height),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h3>Tracking Growth for {plantName}</h3>
      <button onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>Close</button>
      <input
        type="number"
        placeholder="Height in inches"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddEntry}>Add Growth Data</button>

      {growthData.length > 0 && <Line data={data} />}
    </div>
  );
};

export default GrowthTracker;