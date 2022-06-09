import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { App } from "./components/App";
import "./i18n/i18n";

axios.defaults.baseURL = "http://localhost:3000/api/v1/";
axios.defaults.validateStatus = (status) => status !== 401;

export const axiosForRefresh = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
