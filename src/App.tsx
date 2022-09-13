import { useSelector } from "react-redux";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import io from "socket.io-client";
import { IRootState } from "./redux/store";
import Register from "./pages/Register";
import { useEffect } from "react";
import _ from "lodash";
import { IUser } from "./types";
import { useDispatch } from "react-redux";
import { showSidebar } from "./redux/screenRedux";
export const socket = io(`${process.env.REACT_APP_API_URL}`);
const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: IRootState) => state.user);
  const show = useSelector((state: IRootState) => state.screen);
  const theme = useSelector((state: IRootState) => state.theme);

  useEffect(() => {
    dispatch(showSidebar());
  }, []);
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme.isDark]);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/r/:id"
            element={
              !_.isEmpty(currentUser) ? <Home /> : <Navigate to="/login" />
            }
          ></Route>
          <Route
            path="/login"
            element={_.isEmpty(currentUser) ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/register"
            element={
              _.isEmpty(currentUser) ? <Register /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/"
            element={
              !_.isEmpty(currentUser) ? <Home /> : <Navigate to="/login" />
            }
          ></Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
