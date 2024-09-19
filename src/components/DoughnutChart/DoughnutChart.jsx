import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ orders }) => {
  // Sipariş durumları
  const statuses = [
    'Ödeme Beklemede',
    'Ödeme Başarısız',
    'Sipariş Hazırlanıyor',
    'Kargoya Verildi',
    'Teslim Edildi'
  ];

  // Sipariş verilerini işle
  const data = statuses.map(status => {
    const filteredOrders = orders.filter(order => order.status === status);
    const totalAmount = filteredOrders.reduce((total, order) => total + order.price, 0);
    const orderCount = filteredOrders.length;

    return {
      total: totalAmount,
      count: orderCount
    };
  });

  const chartData = {
    labels: statuses,
    datasets: [
      {
        label: 'Sipariş Durumları',
        data: data.map(item => item.total),
        backgroundColor: [
          '#FFA500',  // Ödeme Beklemede (Turuncu)
          '#FF0000',  // Ödeme Başarısız (Kırmızı)
          '#0000FF',  // Sipariş Hazırlanıyor (Mavi)
          '#800080',  // Kargoya Verildi (Mor)
          '#008000'   // Teslim Edildi (Yeşil)
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const statusIndex = tooltipItem.dataIndex;
            const count = data[statusIndex].count;
            const total = data[statusIndex].total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
            return `${statuses[statusIndex]}: ${count} adet, Toplam: ${total}`;
          }
        }
      }
    }
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
