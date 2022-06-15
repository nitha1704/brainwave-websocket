import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import CBuffer from 'CBuffer'

const socket = io("http://localhost:4200", {
  transports: ["websocket", "polling"],
});

const CpuChartBuffer = () => {
  const [cpuUsageData, setCpuUsageData] = useState([]);

  const [color, setColor] = useState({
    redActive: false,
    yellowActive: false,
    greenActive: false,
  });

  useEffect(() => {
    var myBuff = CBuffer(10);
    myBuff.overflow = function (data) {
      console.log(data);
    };

    console.log("myBuff", myBuff);

    socket.on("getCpuUsageInfo", (item) => {
      console.log(item);
      let value = Number(item.cpuUsageValue.toFixed(2));

      myBuff.push(value);
      let myBuff2 = myBuff.data
      let myBuff3 = myBuff2.map(xx => {
        return {name: item.name, value: xx}
      });
      console.log(myBuff3);


      //setCpuUsageData((prevValue) => [...prevValue, item]);

      setCpuUsageData((prevValue) => [...myBuff3]);


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

  useEffect(() => {
    console.log("cpuUsageData", cpuUsageData);
  }, [cpuUsageData]);

  return (
    <CpuSection>
      <LineChart
        width={1000}
        height={300}
        data={cpuUsageData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>

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
  .attentions {
    margin-top: 50px;
    padding: 20px;
    display: inline-block;
    background-color: black;
    color: white;
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

export default CpuChartBuffer;
