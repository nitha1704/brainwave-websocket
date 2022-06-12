import React from "react";
import { Chart } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return <Bar data={chartData.data} options={chartData.options} />;
};

const LineCharts = ({ chartData }) => {
  return <Line data={chartData.data} options={chartData.options} />;
};

export { BarChart, LineCharts };
