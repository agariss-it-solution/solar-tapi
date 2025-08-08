import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, Legend);

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const EngagementChart = ({ data }) => {
  let dataArray = [];

  if (data && typeof data === 'object' && data.daily) {
    dataArray = WEEK_DAYS.map(day => ({
      day,
      visits: data.daily[day] || 0,
    }));
  } else if (Array.isArray(data)) {
    dataArray = data;
  }

  const visits = dataArray.map(d => d.visits);

  const chartData = {
    labels: WEEK_DAYS,
    datasets: [
      {
        label: 'Website Visits',
        data: visits,
        borderColor: '#2e7d32',
        backgroundColor: 'transparent',
        tension: 0.5,
        fill: true,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#2e7d32',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#3c3c3c',
          font: { size: 14 },
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: '#3c3c3c',
          font: { size: 14 },
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  return (
   <div >
     <div style={{ height: '300px', width: '100%' ,background:"#fafcf7" }}>
      {data?.total !== undefined && (
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          <span className="text-success">Total Visits This Week: {data.total}</span>
        </div>
      )}
      <Line data={chartData} options={options} />
    </div>
   </div>
  );
};

export default EngagementChart;
