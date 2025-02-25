import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const GrowthChart = ({ growthData }) => {
  const data = {
    labels: growthData.map(entry => entry.date),
    datasets: [
      {
        label: 'Plant Growth (inches)',
        data: growthData.map(entry => entry.height),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h3>Plant Growth Tracker</h3>
      <Line data={data} />
    </div>
  );
};

export default GrowthChart;