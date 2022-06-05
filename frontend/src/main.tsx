import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { RouterLinks } from "./RouterLinks";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1/";
axios.defaults.validateStatus = () => true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterLinks />
    </RecoilRoot>
  </React.StrictMode>
);
