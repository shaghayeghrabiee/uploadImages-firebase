import "./App.css";
import Login from "./components/pages/registration/login";
import Register from "./components/pages/registration/register";
import Home from "./components/pages/home";
import { Navigate,Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageContextProvider from "./components/context/imageContextProvider";


function App() {
  const user = localStorage.getItem("currentUser");
  return (
    <div className="App">
      <ImageContextProvider>
        {user ? (
          <Routes>
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signUp" element={<Register />} />
            <Route path="/*" element={<Navigate to="/signUp" />} />
          </Routes>
        )}

        <ToastContainer autoClose={3000} />
      </ImageContextProvider>
    </div>
  );
}

export default App;
