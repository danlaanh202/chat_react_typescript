import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../App";
import Main from "../components/Main";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import { IScreen, showMain, showProfile } from "../redux/screenRedux";
import { IRootState } from "../redux/store";
import { UserState } from "../redux/userRedux";

const Home = () => {
  const { currentUser } = useSelector(
    (state: IRootState) => state.user as UserState
  );

  //show.sidebar => translate-x-0
  //show.main => -translate-x-[100vw]
  //show.profile => -translate-x-[200vw]

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showRight, setShowRight] = useState(false);
  const topRef = useRef(null);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      //after home is mounted socket emit active users
      socket.emit("active", {
        userId: currentUser._id,
      });
    }
  }, []);

  useEffect(() => {
    if (showRight === true) {
      dispatch(showProfile());
    }
  }, [showRight]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-cover height-mobile-browser dark:bg-auto md:w-full md:flex bg-gradient-to-br dark:from-dark-gradient-from dark:to-dark-gradient-to from-light-gradient-from to-light-date-bg ">
      <SideBar />
      <Main topRef={topRef} setShowRight={setShowRight} className="" />
      {showRight && <Profile topRef={topRef} setShowRight={setShowRight} />}
    </div>
  );
};

export default Home;
