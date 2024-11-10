import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ hourlyTemps }) => {
  const chartData = {
    labels: hourlyTemps.map((data) => data.time),
    datasets: [
      {
        label: "Temperature (°C)",
        data: hourlyTemps.map((data) => data.temp),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Hourly Temperature for Today" },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Temperature (°C)" },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default TemperatureChart;
