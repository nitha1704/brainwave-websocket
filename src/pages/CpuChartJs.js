import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { LineCharts } from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const CpuChartJs = () => {
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
      let value = Number(item.value.toFixed(2));
      console.log("value", value);
      console.log(cpuUsageData.data.datasets[0].data);

      setCpuUsageData((prevData) => {
        let newData = {
          data: {
            labels: [...prevData.data.labels, item.name],
            datasets: prevData.data.datasets.map((item, index) => {
              if (index === 0) {
                return { ...item, data: [...item.data, value] };
              }
              if (index === 1) {
                return { ...item, data: [...item.data, value - 0.1] };
              }
              return item;
            }),
          },
        };
        return newData;
      });

      if (value > 0.2 && value <= 0.3) {
        setColor({
          redActive: false,
          yellowActive: false,
          greenActive: true,
        });
      }
      if (value > 0.3 && value <= 0.4) {
        setColor({
          redActive: false,
          yellowActive: true,
          greenActive: false,
        });
      }
      if (value > 0.4) {
        setColor({
          redActive: true,
          yellowActive: false,
          greenActive: false,
        });
      }
    });
  }, []);

  // useEffect(() => {
  //   const qwes = {
  //     data: {
  //       labels: [...cpuUsageData.data.labels, "qwes"],
  //       datasets: cpuUsageData.data.datasets.map((item, index) => {
  //         if (index === 0) {
  //           return { ...item, data: [...item.data, "zx"] };
  //         }
  //         return item;
  //       }),
  //     },
  //   };
  //   console.log("cpuUsageData", cpuUsageData);
  //   console.log("qwes", qwes);
  // }, []);

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
    background-color: black;
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
    }

    .red-light {
      .color.active {
        background-color: red;
      }
    }
    .yellow-light {
      .color.active {
        background-color: yellow;
      }
    }
    .green-light {
      .color.active {
        background-color: green;
      }
    }
  }
`;

export default CpuChartJs;
