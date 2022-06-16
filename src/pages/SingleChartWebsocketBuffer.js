import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { BarChart, LineCharts } from "../components/Charts";
import CBuffer from "CBuffer";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const SingleChartWebSocketBuffer = () => {
  const mockNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let myBuff1 = CBuffer(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  let myBuff2 = CBuffer(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  let myBuff3 = CBuffer(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  let myBuff4 = CBuffer(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  let labelsBuffer = CBuffer(
    "x1",
    "x2",
    "x3",
    "x4",
    "x5",
    "x6",
    "x7",
    "x8",
    "x9",
    "x10"
  );

  const [totalValueGraph1, setTotalValueGraph1] = useState([]);
  const [totalValueGraph2, setTotalValueGraph2] = useState([]);
  const [totalValueGraph3, setTotalValueGraph3] = useState([]);
  const [totalValueGraph4, setTotalValueGraph4] = useState([]);

  const [scoreValueNumber, setScoreValueNumber] = useState();
  const [cpuUsageData, setCpuUsageData] = useState({
    data: {
      labels: labelsBuffer.data,
      datasets: [
        {
          label: "CH1",
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
        // {
        //   label: "CH2",
        //   data: [],
        //   backgroundColor: [
        //     "rgba(255, 99, 132, 0.2)",
        //     "rgba(255, 159, 64, 0.2)",
        //     "rgba(255, 205, 86, 0.2)",
        //     "rgba(75, 192, 192, 0.2)",
        //     "rgba(54, 162, 235, 0.2)",
        //     "rgba(153, 102, 255, 0.2)",
        //     "rgba(201, 203, 207, 0.2)",
        //   ],
        //   borderColor: [
        //     "rgb(255, 99, 132)",
        //     "rgb(255, 159, 64)",
        //     "rgb(255, 205, 86)",
        //     "rgb(75, 192, 192)",
        //     "rgb(54, 162, 235)",
        //     "rgb(153, 102, 255)",
        //     "rgb(201, 203, 207)",
        //   ],
        //   borderWidth: 1,
        // },
        // {
        //   label: "CH3",
        //   data: [],
        //   backgroundColor: [
        //     "rgba(255, 99, 132, 0.2)",
        //     "rgba(255, 159, 64, 0.2)",
        //     "rgba(255, 205, 86, 0.2)",
        //     "rgba(75, 192, 192, 0.2)",
        //     "rgba(54, 162, 235, 0.2)",
        //     "rgba(153, 102, 255, 0.2)",
        //     "rgba(201, 203, 207, 0.2)",
        //   ],
        //   borderColor: [
        //     "rgb(255, 99, 132)",
        //     "rgb(255, 159, 64)",
        //     "rgb(255, 205, 86)",
        //     "rgb(75, 192, 192)",
        //     "rgb(54, 162, 235)",
        //     "rgb(153, 102, 255)",
        //     "rgb(201, 203, 207)",
        //   ],
        //   borderWidth: 1,
        // },
        // {
        //   label: "CH4",
        //   data: [],
        //   backgroundColor: [
        //     "rgba(255, 99, 132, 0.2)",
        //     "rgba(255, 159, 64, 0.2)",
        //     "rgba(255, 205, 86, 0.2)",
        //     "rgba(75, 192, 192, 0.2)",
        //     "rgba(54, 162, 235, 0.2)",
        //     "rgba(153, 102, 255, 0.2)",
        //     "rgba(201, 203, 207, 0.2)",
        //   ],
        //   borderColor: [
        //     "rgb(255, 99, 132)",
        //     "rgb(255, 159, 64)",
        //     "rgb(255, 205, 86)",
        //     "rgb(75, 192, 192)",
        //     "rgb(54, 162, 235)",
        //     "rgb(153, 102, 255)",
        //     "rgb(201, 203, 207)",
        //   ],
        //   borderWidth: 1,
        // },
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

      myBuff1.push(cpuUsageValue);
      myBuff2.push(cpuUsageValue + 20);
      myBuff3.push(cpuUsageValue + 40);
      myBuff4.push(cpuUsageValue + 60);
      labelsBuffer.push(`x${item.name}`);

      let myBuffGraph1 = myBuff1.data;
      let myBuffGraph2 = myBuff2.data;
      let myBuffGraph3 = myBuff3.data;
      let myBuffGraph4 = myBuff4.data;

      let myBuffGraph1Refactor = myBuffGraph1.map((x) => x);
      let myBuffGraph2Refactor = myBuffGraph2.map((x) => x);
      let myBuffGraph3Refactor = myBuffGraph3.map((x) => x);
      let myBuffGraph4Refactor = myBuffGraph4.map((x) => x);

      if (myBuff1.start === 0) {
        setTotalValueGraph1((prevValue) => [
          ...prevValue,
          myBuffGraph1Refactor,
        ]);
      }

      if (myBuff2.start === 0) {
        setTotalValueGraph2((prevValue) => [
          ...prevValue,
          myBuffGraph2Refactor,
        ]);
      }

      if (myBuff3.start === 0) {
        setTotalValueGraph3((prevValue) => [
          ...prevValue,
          myBuffGraph3Refactor,
        ]);
      }

      if (myBuff4.start === 0) {
        setTotalValueGraph4((prevValue) => [
          ...prevValue,
          myBuffGraph4Refactor,
        ]);
      }

      setScoreValueNumber(scoreValue);
      setCpuUsageData((prevData) => {
        let newData = {
          data: {
            labels: labelsBuffer.data,
            datasets: [
              {
                label: "CH1",
                data: myBuffGraph1Refactor,
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
              // {
              //   label: "CH2",
              //   data: myBuffGraph2Refactor,
              //   backgroundColor: [
              //     "rgba(255, 99, 132, 0.2)",
              //     "rgba(255, 159, 64, 0.2)",
              //     "rgba(255, 205, 86, 0.2)",
              //     "rgba(75, 192, 192, 0.2)",
              //     "rgba(54, 162, 235, 0.2)",
              //     "rgba(153, 102, 255, 0.2)",
              //     "rgba(201, 203, 207, 0.2)",
              //   ],
              //   borderColor: [
              //     "rgb(255, 99, 132)",
              //     "rgb(255, 159, 64)",
              //     "rgb(255, 205, 86)",
              //     "rgb(75, 192, 192)",
              //     "rgb(54, 162, 235)",
              //     "rgb(153, 102, 255)",
              //     "rgb(201, 203, 207)",
              //   ],
              //   borderWidth: 1,
              // },
              // {
              //   label: "CH3",
              //   data: myBuffGraph3Refactor,
              //   backgroundColor: [
              //     "rgba(255, 99, 132, 0.2)",
              //     "rgba(255, 159, 64, 0.2)",
              //     "rgba(255, 205, 86, 0.2)",
              //     "rgba(75, 192, 192, 0.2)",
              //     "rgba(54, 162, 235, 0.2)",
              //     "rgba(153, 102, 255, 0.2)",
              //     "rgba(201, 203, 207, 0.2)",
              //   ],
              //   borderColor: [
              //     "rgb(255, 99, 132)",
              //     "rgb(255, 159, 64)",
              //     "rgb(255, 205, 86)",
              //     "rgb(75, 192, 192)",
              //     "rgb(54, 162, 235)",
              //     "rgb(153, 102, 255)",
              //     "rgb(201, 203, 207)",
              //   ],
              //   borderWidth: 1,
              // },
              // {
              //   label: "CH4",
              //   data: myBuffGraph4Refactor,
              //   backgroundColor: [
              //     "rgba(255, 99, 132, 0.2)",
              //     "rgba(255, 159, 64, 0.2)",
              //     "rgba(255, 205, 86, 0.2)",
              //     "rgba(75, 192, 192, 0.2)",
              //     "rgba(54, 162, 235, 0.2)",
              //     "rgba(153, 102, 255, 0.2)",
              //     "rgba(201, 203, 207, 0.2)",
              //   ],
              //   borderColor: [
              //     "rgb(255, 99, 132)",
              //     "rgb(255, 159, 64)",
              //     "rgb(255, 205, 86)",
              //     "rgb(75, 192, 192)",
              //     "rgb(54, 162, 235)",
              //     "rgb(153, 102, 255)",
              //     "rgb(201, 203, 207)",
              //   ],
              //   borderWidth: 1,
              // },
            ],
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

  useEffect(() => {
    console.log("totalValueGraph1", totalValueGraph1);
  }, [totalValueGraph1]);
  // useEffect(() => {
  //   console.log("totalValueGraph2", totalValueGraph2);
  // }, [totalValueGraph2]);
  // useEffect(() => {
  //   console.log("totalValueGraph3", totalValueGraph3);
  // }, [totalValueGraph3]);
  // useEffect(() => {
  //   console.log("totalValueGraph4", totalValueGraph4);
  // }, [totalValueGraph4]);

  return (
    <SingleChartWebSocketBufferSection>
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
    </SingleChartWebSocketBufferSection>
  );
};

const SingleChartWebSocketBufferSection = styled.section`
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

export default SingleChartWebSocketBuffer;
