import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { CreateSession } from './components/CreateSession';
import { Project } from "./components/Project";

export const RouterLinks = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/project/:id" element={<Project />}/>
        <Route path="/session/add" element={<CreateSession />}/>
      </Routes>
    </BrowserRouter>
  );
}