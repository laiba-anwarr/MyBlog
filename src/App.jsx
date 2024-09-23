import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import authService from "./appwrite/Auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./components/loading/LoadingSpinner";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";

import ScrollTo from "./pages/ScrollTo";
import LocomotiveScroll from 'locomotive-scroll';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [showHome , setShowHome]=useState(false)
  const locomotiveScroll = new LocomotiveScroll();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);
const handleanimation=()=>{
setShowHome(true)
}

  return !loading ? (
    <div
      // style={{backgroundImage:` url(${landingImage})`}}
      className=" w-full bg-primary max-w-screen-2xl "
    >
      <Header handleanimation={handleanimation} />
      <ScrollTo />
      <main>
       
        <Outlet />
        <About />
      </main>
<Footer />
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default App;
