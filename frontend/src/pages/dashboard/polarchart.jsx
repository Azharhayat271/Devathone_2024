// src/PolarChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);

const PolarChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',  // solid colors
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
      delay: 500,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 20,
      },
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ marginTop: '50px', backgroundColor: 'white' }}  // Set plain white background
    >
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <PolarArea
          data={data}
          options={options}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
    </motion.div>
  );
};

export default PolarChart;
