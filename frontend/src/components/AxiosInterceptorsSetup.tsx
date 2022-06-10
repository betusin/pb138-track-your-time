import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { axiosForRefresh } from "../main";
import { accessTokenAtom } from "../state/atom";

export const AxiosInterceptorsSetup = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const navigate = useNavigate();

  // Intercept a 401 and try to get new jwt using refresh token
  const refreshAuthLogic = (failedRequest: any) =>
    axiosForRefresh
      .post("auth/refresh", { skipAuthRefresh: true })
      .then(({ data }) => {
        const { accessToken } = data;
        setAccessToken(accessToken);
        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
      })
      // Redirect to login
      .catch(() => {
        navigate("/login");
      });

  useEffect(() => {
    // Instantiate the interceptor
    createAuthRefreshInterceptor(axios, refreshAuthLogic);
  }, []);

  return <></>;
};
