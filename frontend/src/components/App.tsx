import "../App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { CreateProject } from "./project/CreateProject";
import { CreateSession } from "./session/CreateSession";
import { EditProject } from "./project/EditProject";
import { EditSession } from "./session/EditSession";
import { Navbar } from "./Navbar";
import { Project } from "./project/Project";
import { ProjectList } from "./home/ProjectList";
import { accessTokenAtom } from "../state/atom";
import { theme } from "../styles/theme";
import { Toaster } from "react-hot-toast";
import { AxiosInterceptorsSetup } from "./AxiosInterceptorsSetup";

export const App = () => {
  const token = useRecoilValue(accessTokenAtom);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <AxiosInterceptorsSetup />
          {token && <Navbar />}
          <Routes>
            {token === "" ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProjectList />} />
                <Route path="/project/add" element={<CreateProject />} />
                <Route path="/project/:id/edit" element={<EditProject />} />
                <Route path="/project/:id" element={<Project />} />
                <Route
                  path="/project/:id/session/add"
                  element={<CreateSession />}
                />
                <Route path="/session/:id/edit" element={<EditSession />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};