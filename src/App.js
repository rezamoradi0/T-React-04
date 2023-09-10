import logo from "./logo.svg";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { Link, Route, Router, Routes } from "react-router-dom";
import { createContext } from "react";
import "./css/all.css"
export const userPassport = new createContext();
function App() {
  return (
    <>
      <userPassport.Provider value={""}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </userPassport.Provider>
    </>
  );
}

export default App;
