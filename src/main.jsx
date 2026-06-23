import process from "process";

window.global = window;
window.process = process;
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";

import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import VideoCall from "./pages/VideoCall";

import "./index.css";

// Request Notification Permission

if ("Notification" in window) {

  Notification.requestPermission();

}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>

);