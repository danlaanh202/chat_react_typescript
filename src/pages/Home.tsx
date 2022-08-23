import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import Profile from "../components/Profile";
import SideBar from "../components/SideBar";
import { IRootState } from "../redux/store";

const Home = () => {
  const { currentUser } = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const [showRight, setShowRight] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex h-screen dark:bg-cat-bg-dark bg-cat-bg-normal">
      <SideBar />
      <Main
        setShowRight={setShowRight}
        className="flex-grow h-full sm-scroll"
      />
      {showRight && <Profile setShowRight={setShowRight} />}
    </div>
  );
};

export default Home;
