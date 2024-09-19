// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = ({ orders }) => {
  // Filter out orders with specific statuses
  const filteredOrders = orders.filter(order => 
    order.status !== 'Ödeme Beklemede' && order.status !== 'Ödeme Başarısız'
  );

  // Group by month and calculate total earnings
  const earningsByMonth = {};

  filteredOrders.forEach(order => {
    const date = new Date(order.createdAt);
    // Get the month and year
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Format: YYYY-MM

    if (!earningsByMonth[monthYear]) {
      earningsByMonth[monthYear] = 0;
    }
    earningsByMonth[monthYear] += order.price;
  });

  // Prepare data for the chart
  const labels = Object.keys(earningsByMonth).sort(); // Sort labels
  const data = labels.map(label => earningsByMonth[label]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Aylık Kazanç',
        data: data,
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
