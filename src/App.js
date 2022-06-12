import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cpu from "./pages/Cpu";
import CpuChartJs from "./pages/CpuChartJs";
import CpuChartJsBlack from "./pages/CpuChartJsBlack";
import SingleChartPresent from "./pages/SingleChartPresent";
import MultipleChartPresent from "./pages/MultipleChartPresent";
import SingleChartWebSocket from "./pages/SingleChartWebsocket";
import MultipleChartWebSocket from "./pages/MultipleChartWebsocket";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cpu" element={<Cpu />} />
          <Route exact path="/cpuchartjs" element={<CpuChartJs />} />
          <Route exact path="/cpuchartjsblack" element={<CpuChartJsBlack />} />
          <Route
            exact
            path="/singlechartpresent"
            element={<SingleChartPresent />}
          />
          <Route
            exact
            path="/multiplechartpresent"
            element={<MultipleChartPresent />}
          />

          <Route
            exact
            path="/singlechartwebsocket"
            element={<SingleChartWebSocket />}
          />
          <Route
            exact
            path="/multiplechartwebsocket"
            element={<MultipleChartWebSocket />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
