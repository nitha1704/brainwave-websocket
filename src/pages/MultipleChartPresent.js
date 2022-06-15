import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BarChart, LineCharts } from "../components/Charts";
import thaiCovidDataJSON from "../data/today-cases-by-provinces.json";

const MultipleChartPresent = () => {
  const mockNumber = [9, 1, 8, 0, 4, 8, 3, 2, 7, 4];

  const [thaiCovidData, setThaiCovidData] = useState({
    data: {
      labels: [2018, 2019, 2020, 2021, 2022],
      datasets: [
        {
          label: "CH1",
          data: mockNumber,
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
      labels: [2018, 2019, 2020, 2021, 2022],
      datasets: [
        {
          label: "CH2",
          data: mockNumber.map((x) => x + 20),
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
      labels: [2018, 2019, 2020, 2021, 2022],
      datasets: [
        {
          label: "CH3",
          data: mockNumber.map((x) => x + 40),
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
      labels: [2018, 2019, 2020, 2021, 2022],
      datasets: [
        {
          label: "CH4",
          data: mockNumber.map((x) => x + 60),
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

  return (
    <MultipleChartPresentSection>
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
        <h1>Attention</h1>
        <div className="light-wrapper">
          <div className="light red-light">
            <div className="color"></div>
          </div>
          <div className="light yellow-light">
            <div className="color"></div>
          </div>
          <div className="light green-light">
            <div className="color"></div>
          </div>
        </div>
      </div>
    </MultipleChartPresentSection>
  );
};

const MultipleChartPresentSection = styled.section`
  position: relative;
  .wrapper {
    display: grid;
    grid-template-columns: 40vw 40vw;
    gap: 3vw;
  }
  .attentions {
    margin-top: 50px;
    padding: 1.5vw;
    display: inline-block;
    background-color: crimson;
    color: white;
    position: absolute;
    top: 15%;
    right: 0%;
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

  @media (max-width: 1200px) {
    .wrapper {
      grid-template-columns: 80vw;
    }
  }
`;

export default MultipleChartPresent;
