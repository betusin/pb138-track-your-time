import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Project } from "./components/Project";

export const RouterLinks = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/project/:id" element={<Project />}/>
      </Routes>
    </BrowserRouter>
  );
}