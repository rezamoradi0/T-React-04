import logo from "./logo.svg";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { Link, Route, Router, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import "./css/all.css"
export const userAllData = new createContext();
function App() {
  const [userData,setUserData]=useState({});
  return (
    <>
      <userAllData.Provider value={{userData:userData,setUserData:setUserData}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </userAllData.Provider>
    </>
  );
}

export default App;
