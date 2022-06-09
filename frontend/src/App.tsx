import "./App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { CreateProject } from "./components/CreateProject";
import { CreateSession } from "./components/CreateSession";
import { EditProject } from "./components/EditProject";
import { EditSession } from "./components/EditSession";
import { Navbar } from "./components/Navbar";
import { Project } from "./components/Project";
import { accessTokenAtom } from "./state/atom";
import { theme } from "./styles/theme";
import { Toaster } from "react-hot-toast";
import { AxiosInterceptorsSetup } from "./AxiosInterceptorsSetup";
import { NoPath } from "./components/NoPath";
import { ProjectList } from "./components/ProjectList";
import { useEffect, useState } from "react";
import { axiosForRefresh } from "./main";

export const App = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get jwt on page reload
    axiosForRefresh
      .post("auth/refresh", { skipAuthRefresh: true })
      .then(({ data }) => {
        const { accessToken } = data;
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <AxiosInterceptorsSetup />
          {accessToken && <Navbar />}
          <Routes>
            {!accessToken ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<ProjectList />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/project/add" element={<CreateProject />} />
                <Route path="/project/:id/edit" element={<EditProject />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/session/:id/edit" element={<EditSession />} />
                <Route path="/session/add" element={<CreateSession />} />
                <Route path="*" element={<NoPath />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};
