import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from 'recoil';
import { RouterLinks } from "./RouterLinks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterLinks />
    </RecoilRoot>
  </React.StrictMode>
);
