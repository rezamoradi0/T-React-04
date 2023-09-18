import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UseCheckUserHaveInfo } from "../CustomHook/UseCheckUser";
import MainLoading from "../loading/MainLoading";
import { userAllData } from "../../App";
import { GetPersonalData } from "../PublicMethods";
import AdminPage from "../admin/AdminPage";
import StudentDashboard from "../../real_pages/student/StudentDashboard";
const Home = () => {
  const [haveInfo] = UseCheckUserHaveInfo();
  const [haveUserInfo, setHaveUserInfo] = useState(false);
  const userAllDataContext = useContext(userAllData);
 const use_navigate=useNavigate();
  useEffect(() => {

    if (haveInfo == 2) {
      console.log("line 16: GetUserData");
      GetUserData();
    }
  }, [haveInfo]);
  async function GetUserData() {
    
    
    const personalData = await GetPersonalData();
    
    userAllDataContext.setUserData({
      ...userAllDataContext.userData,
    personalData: personalData,
    });
    setHaveUserInfo(true);
    console.log("After personalID");

  }
  //user haveInfo in localStorage 0 =>Loading 1=>false 2=>true
  //server haveUserInfo (token) => true or error => forward to /login page and setting New Token (after password checked)
  if (haveInfo == 0&&!haveUserInfo) {
    return <MainLoading Text="User Info Checking"/>;
  } else if (haveInfo == 1) {
    // return <Navigate to={"/login"} />;
    return use_navigate("/login");
  } else if (haveUserInfo&&haveInfo==2) {
    console.log("line 40: ");
    console.log( userAllDataContext.userData);

    if (userAllDataContext.userData.personalData.type == "admin") {
      console.log("line 43: ");
      console.log( userAllDataContext.userData);
      return <AdminPage  PersonalData={userAllDataContext.userData.personalData}/>;
    } else if (userAllDataContext.userData.personalData.type == "teacher") {
      return <div> Teacher Page</div>;
    } else if (userAllDataContext.userData.personalData.type == "student") {
    
      console.log(userAllDataContext.userData);
      return <StudentDashboard  PersonalData={userAllDataContext.userData.personalData}/>;
    }
  } else {
    return <MainLoading Text={"Loading"} />;
  }
};

export default Home;
