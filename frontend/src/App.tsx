import "./App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { CreateProject } from "./components/CreateProject";
import { CreateSession } from "./components/CreateSession";
import { EditProject } from "./components/EditProject";
import { EditSession } from "./components/EditSession";
import { Navbar } from "./components/Navbar";
import { Project } from "./components/Project";
import { ProjectList } from "./components/ProjectList";
import { accessTokenAtom } from "./state/atom";
import { theme } from "./styles/theme";

export const App = () => {
  const token = useRecoilValue(accessTokenAtom);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toaster position="bottom-center" />
        <BrowserRouter>
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
                <Route path="/project/edit/:id" element={<EditProject />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/session/edit/:id" element={<EditSession />} />
                <Route path="/session/add" element={<CreateSession />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};
