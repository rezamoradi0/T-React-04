import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UseCheckUserHaveInfo } from "../CustomHook/UseCheckUser";
import MainLoading from "../loading/MainLoading";
import { userAllData } from "../../App";
import { GetPersonalData } from "../PublicMethods";
import AdminPage from "../admin/AdminPage";
const Home = () => {
  const [haveInfo] = UseCheckUserHaveInfo();
  const [haveUserInfo, setHaveUserInfo] = useState(false);
  const userAllDataContext = useContext(userAllData);
 const use_navigate=useNavigate();
  useEffect(() => {

    if (haveInfo == 2) {
      GetUserData();
    }
  }, [haveInfo]);
  async function GetUserData() {
    const personalData = await GetPersonalData();
    console.log(personalData);
    userAllDataContext.setUserData({
      ...userAllDataContext.userData,
    personalData: personalData,
    });
    setHaveUserInfo(true);
  }
  if (haveInfo == 0&&!haveUserInfo) {
    return <MainLoading />;
  } else if (haveInfo == 1) {
    // return <Navigate to={"/login"} />;
    return use_navigate("/login");
  } else if (haveUserInfo&&haveInfo) {
    console.log(userAllDataContext.userData);

    if (userAllDataContext.userData.personalData.type == "admin") {
      return <AdminPage  PersonalData={userAllDataContext.userData.personalData}/>;
    } else if (userAllDataContext.userData.personalData.type == "teacher") {
      return <div> Teacher Page</div>;
    } else if (userAllDataContext.userData.personalData.type == "student") {
    
      console.log(userAllDataContext.userData);
      return <div>Student page</div>;
    }
  } else {
    return <MainLoading Text={"Loading"} />;
  }
};

export default Home;
