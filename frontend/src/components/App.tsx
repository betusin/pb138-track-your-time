import "../App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Toaster } from "react-hot-toast";
import { AxiosInterceptorsSetup } from "./AxiosInterceptorsSetup";
import { NoPath } from "./NoPath";
import { accessTokenAtom } from "../state/atom";
import { theme } from "../styles/theme";
import { Navbar } from "./Navbar";
import { ProjectList } from "./home/ProjectList";
import { CreateProject } from "./project/CreateProject";
import { EditProject } from "./project/EditProject";
import { Project } from "./project/Project";
import { CreateSession } from "./session/CreateSession";
import { EditSession } from "./session/EditSession";
import { useEffect, useState } from "react";
import { axiosForRefresh } from "../main";
import { useTranslation } from "react-i18next";
import { Profile } from "./profile/Profile";
import { EditProfile } from "./profile/EditProfile";
import { Session } from "./session/Session";
import { LoggedOutBar } from "./LoggedOutBar";
import { LoadingPlaceholder } from "./common/LoadingPlaceholder";
import { ChangePassword } from "./profile/ChangePassword";

export const App = () => {
  useTranslation();

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
    return <LoadingPlaceholder />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Toaster position="bottom-center" />
        <BrowserRouter>
          <AxiosInterceptorsSetup />
          {accessToken ? <Navbar /> : <LoggedOutBar />}
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
                <Route
                  path="/project/:id/session/add"
                  element={<CreateSession />}
                />
                <Route path="/session/:id" element={<Session />} />
                <Route path="/session/:id/edit" element={<EditSession />} />
                <Route path="/session/add" element={<CreateSession />} />
                <Route path="/me" element={<Profile />} />
                <Route path="/me/edit" element={<EditProfile />} />
                <Route path="/me/password" element={<ChangePassword />} />
                <Route path="*" element={<NoPath />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};
