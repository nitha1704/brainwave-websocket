import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { BarChart, LineCharts } from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const MultipleChartWebSocket = () => {
  const mockNumber = [9, 1, 8, 0, 4, 8, 3, 2, 7, 4];
  const [scoreValueNumber, setScoreValueNumber] = useState();

  const [thaiCovidData, setThaiCovidData] = useState({
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "CH1",
          data: [0.18, 0.38, 0.58, 0.78, 0.98],
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
    options: {
      scales: {
        x: {
          ticks: {
            display: true,
          },
        },
      },
    },
  });
  const [thaiCovidData2, setThaiCovidData2] = useState({
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "CH2",
          data: [1.8, 3.8, 5.8, 7.8, 9.8],
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
    options: {
      scales: {
        x: {
          ticks: {
            display: true,
          },
        },
      },
    },
  });
  const [thaiCovidData3, setThaiCovidData3] = useState({
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "CH3",
          data: [18, 25, 30, 35, 40],
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
    options: {
      scales: {
        x: {
          ticks: {
            display: true,
          },
        },
      },
    },
  });
  const [thaiCovidData4, setThaiCovidData4] = useState({
    data: {
      labels: [1, 2, 3, 4, 5],
      datasets: [
        {
          label: "CH4",
          data: [50, 55, 60, 65, 70],
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
    options: {
      scales: {
        x: {
          ticks: {
            display: true,
          },
        },
      },
    },
  });

  useEffect(() => {
    socket.on("getCpuUsageInfo", (item) => {
      console.log(item);
      let cpuUsageValue = Number(item.cpuUsageValue.toFixed(2));
      let scoreValue = Number(item.scoreValue.toFixed(2));

      setScoreValueNumber(scoreValue);

      setThaiCovidData((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              return { ...item, data: [...item.data, cpuUsageValue] };
            }),
          },
        };
        return newData;
      });

      setThaiCovidData2((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              return { ...item, data: [...item.data, cpuUsageValue + 20] };
            }),
          },
        };
        return newData;
      });

      setThaiCovidData3((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              return {
                ...item,
                data: [...item.data, cpuUsageValue + 40],
              };
            }),
          },
        };
        return newData;
      });

      setThaiCovidData4((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              return {
                ...item,
                data: [...item.data, cpuUsageValue + 60],
              };
            }),
          },
        };
        return newData;
      });

      if (scoreValue === 2) {
        setColor({
          redActive: true,
          yellowActive: true,
          greenActive: true,
        });
      }
      if (scoreValue === 1) {
        setColor({
          redActive: false,
          yellowActive: true,
          greenActive: true,
        });
      }
      if (scoreValue === 0) {
        setColor({
          redActive: false,
          yellowActive: false,
          greenActive: true,
        });
      }
    });
  }, []);

  const [color, setColor] = useState({
    redActive: false,
    yellowActive: false,
    greenActive: false,
  });

  return (
    <MultipleChartWebSocketSection>
      <div className="wrapper">
        <div>
          <LineCharts chartData={thaiCovidData} />
        </div>
        <div>
          <LineCharts chartData={thaiCovidData2} />
        </div>
        <div>
          <LineCharts chartData={thaiCovidData3} />
        </div>
        <div>
          <LineCharts chartData={thaiCovidData4} />
        </div>
      </div>
      <div className="attentions">
        <h1>Attentions</h1>
        <div className="light-wrapper">
          <div className="light red-light">
            <div className={"color " + (color.redActive ? "active" : "")}></div>
          </div>
          <div className="light yellow-light">
            <div
              className={"color " + (color.yellowActive ? "active" : "")}
            ></div>
          </div>
          <div className="light green-light">
            <div
              className={"color " + (color.greenActive ? "active" : "")}
            ></div>
          </div>
        </div>
        <p style={{ fontSize: "30px" }}>
          <span>Value: </span>
          <span style={{ fontWeight: "bold" }}>{scoreValueNumber}</span>
        </p>
      </div>
    </MultipleChartWebSocketSection>
  );
};

const MultipleChartWebSocketSection = styled.section`
  position: relative;
  .wrapper {
    display: grid;
    grid-template-columns: 700px 700px;
    gap: 50px;
  }
  .attentions {
    margin-top: 50px;
    padding: 20px;
    display: inline-block;
    background-color: crimson;
    color: white;
    position: absolute;
    top: 15%;
    right: 1%;
    text-align: center;
    h1 {
      font-size: 35px;
    }
    .light {
      width: 50px;
      height: 50px;
      margin: 20px auto;
      .color {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: white;
      }
      .color.active {
        background-color: black;
      }
    }
  }
`;

export default MultipleChartWebSocket;
