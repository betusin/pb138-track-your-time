import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { App } from "./components/App";
import "./i18n/i18n";
import { Grid } from "@mui/material";

axios.defaults.baseURL = "http://localhost:3000/api/v1/";
axios.defaults.validateStatus = (status) => status !== 401;

export const axiosForRefresh = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          lg={10}
          xl={7}
          sx={{ backgroundColor: "var(--bg-color)" }}
        >
          <App />
        </Grid>
      </Grid>
    </RecoilRoot>
  </React.StrictMode>
);
