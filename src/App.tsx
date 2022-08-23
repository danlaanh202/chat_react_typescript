import { useSelector } from "react-redux";
import {
  BrowserRouter,
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
export const socket = io(`${process.env.REACT_APP_API_URL}`);
const App = () => {
  const { currentUser } = useSelector((state: IRootState) => state.user);

  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
};

export default App;
