import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { CreateProject } from './components/CreateProject';
import { CreateSession } from './components/CreateSession';
import { EditProject } from './components/EditProject';
import { EditSession } from './components/EditSession';
import { Project } from "./components/Project";

export const RouterLinks = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/project/add" element={<CreateProject />}/>
        <Route path="/project/edit/:id" element={<EditProject />}/>
        <Route path="/project/:id" element={<Project />}/>
        <Route path="/session/edit/:id" element={<EditSession />}/>
        <Route path="/session/add" element={<CreateSession />}/>
      </Routes>
    </BrowserRouter>
  );
}