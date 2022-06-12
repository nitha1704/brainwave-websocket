import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Charts from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const Home = () => {
  const [mockData, setMockData] = useState([]);

  const [thaiCovidData, setThaiCovidData] = useState({
    data: {
      labels: thaiCovidDataJSON.map((item) => item.province),
      datasets: [
        {
          label: "Total Cases",
          data: thaiCovidDataJSON.map((item) => item.total_case),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });

  const [cpuUsageData, setCpuUsageData] = useState({
    data: {
      labels: "cpuUsageData",
      datasets: [
        {
          label: "cpu",
          data: thaiCovidDataJSON.map((item) => item.total_case),
        },
      ],
    },
  });


  return <div>Home</div>;
};

export default Home;
