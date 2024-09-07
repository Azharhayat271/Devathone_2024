// src/ProgressiveLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Register required components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const ProgressiveLineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 45, 35, 55, 60, 65, 70],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.3,
      },
      {
        label: 'Product B',
        data: [25, 40, 30, 50, 55, 60, 65],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: 'rgba(54, 162, 235, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.3,
      },
      {
        label: 'Product C',
        data: [20, 35, 25, 45, 50, 55, 60],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuad',
      delay: 500,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            weight: '600',
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} units`;
          },
        },
        backgroundColor: '#FFF',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#E0E0E0',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: '#E0E0E0',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales (units)',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: '#E0E0E0',
        },
        ticks: {
          color: '#333',
          stepSize: 10,
        },
      },
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
      },
      backgroundColor: '#fff', // This ensures that the background of the chart area is white

    },
    layout: {
      padding: 20,
    },
  
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{ height: '90%', width: '100%', background: '#ffffff' }} // Full screen and white background
    >
      <div style={{ height: '100%', width: '100%', padding: '20px', background: '#ffffff' }}>
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default ProgressiveLineChart;
