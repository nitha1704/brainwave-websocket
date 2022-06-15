import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { BarChart, LineCharts } from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const SingleChartWebSocket = () => {
  const mockNumber = [9, 1, 8, 0, 4, 8, 3, 2, 7, 4];
  const [scoreValueNumber, setScoreValueNumber] = useState();
  const [cpuUsageData, setCpuUsageData] = useState({
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

  const [color, setColor] = useState({
    redActive: false,
    yellowActive: false,
    greenActive: false,
  });

  useEffect(() => {
    socket.on("getCpuUsageInfo", (item) => {
      console.log(item);
      let cpuUsageValue = Number(item.cpuUsageValue.toFixed(2));
      let scoreValue = Number(item.scoreValue.toFixed(2));

      setScoreValueNumber(scoreValue);
      setCpuUsageData((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              if (index === 0) {
                return { ...item, data: [...item.data, cpuUsageValue] };
              }
              if (index === 1) {
                return { ...item, data: [...item.data, cpuUsageValue + 20] };
              }
              if (index === 2) {
                return {
                  ...item,
                  data: [...item.data, cpuUsageValue + 40],
                };
              }
              if (index === 3) {
                return {
                  ...item,
                  data: [...item.data, cpuUsageValue + 60],
                };
              }
              return item;
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

  useEffect(() => {
    console.log("cpuUsageData", cpuUsageData);
  }, [cpuUsageData]);

  return (
    <SingleChartWebSocketSection>
      <div className="wrapper">
        <LineCharts chartData={cpuUsageData} />
        <div className="attentions">
          <h1>Attention</h1>
          <div className="light-wrapper">
            <div className="light red-light">
              <div
                className={"color " + (color.redActive ? "active" : "")}
              ></div>
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
          <div style={{ fontSize: "1.5vw" }}>
            <span>Value: </span>
            <span style={{ fontWeight: "bold" }}>{scoreValueNumber}</span>
          </div>
        </div>
      </div>
    </SingleChartWebSocketSection>
  );
};

const SingleChartWebSocketSection = styled.section`
  .wrapper {
    width: 83vw;
    height: auto;
    position: relative;
  }
  .attentions {
    margin-top: 50px;
    padding: 1.5vw;
    display: inline-block;
    background-color: crimson;
    color: white;
    position: absolute;
    top: 15%;
    right: -18%;
    text-align: center;
    h1 {
      font-size: 2vw;
    }
    .light {
      width: 2.5vw;
      height: 2.5vw;
      margin: 3vw auto;
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

export default SingleChartWebSocket;
