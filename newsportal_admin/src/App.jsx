import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/baseURL";
// import ChatIcon from "./components/common/chatIcon/ChatIcon";
// import CallIcon from "./components/common/callIcon/CallIcon";
// import TabIcon from "./components/common/tabIcon/TabIcon";
// import CallModal from "./components/common/modal/CallModal";

function App() {
  // const [openCallModal, setOpenCallModal] = useState(false);
  const [favicon, setFavicon] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/siteSetting`)
      .then((res) => res.json())
      .then((data) => {
        setFavicon(data?.data[0]?.favicon);
        setPhone(data?.data[0]?.emergency_contact);
      });
  }, []);

  // effect to update favicon
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = favicon;
  }, [favicon]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []);

  return (
    <div className="">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
