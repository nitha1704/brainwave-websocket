import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { LineCharts } from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const CpuChartJsBlack = () => {
  const [scoreValueNumber, setScoreValueNumber] = useState();
  const [cpuUsageData, setCpuUsageData] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "Cpu Usage",
          data: [],
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
          label: "Cpu Usage2",
          data: [],
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
          label: "Cpu Usage3",
          data: [],
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
          label: "Cpu Usage4",
          data: [],
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

  const [color, setColor] = useState({
    redActive: false,
    yellowActive: false,
    greenActive: false,
  });

  useEffect(() => {
    socket.on("getCpuUsageInfo", (item) => {
      console.log(item)
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
    console.log("updated", cpuUsageData);
  }, [cpuUsageData]);

  return (
    <CpuSection>
      <div className="chart-wrapper">
        <LineCharts chartData={cpuUsageData} />
      </div>
      <div className="attentions">
        <h1>Attentions</h1>
        <div className="wrapper">
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
    </CpuSection>
  );
};

const CpuSection = styled.section`
  text-align: center;
  position: relative;
  .chart-wrapper {
    width: 1200px !important;
  }
  .attentions {
    margin-top: 50px;
    padding: 20px;
    display: inline-block;
    background-color: crimson;
    color: white;
    position: absolute;
    top: 15%;
    right: 10%;
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

export default CpuChartJsBlack;
