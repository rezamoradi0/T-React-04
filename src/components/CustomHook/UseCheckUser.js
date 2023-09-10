import React, { useEffect, useState } from "react";
import axios from "axios";
import { SaveToLocal,GetToLocal } from "../PublicMethods";
export const UseCheckUserHaveInfo = () => {
  const [haveUserInfo, setHaveUserInfo] = useState(undefined);
  async function CheckUserHaveInfo() {
    const userId = await localStorage.getItem("userId");
    const userPass = await localStorage.getItem("userPass");
    if (userId != null && userId.length > 1 && userId != undefined&&userPass!=null&&userPass.length>0) {
      setHaveUserInfo(true);
    } else {
      setHaveUserInfo(false);
    }
  }
  useEffect(() => {
    CheckUserHaveInfo();
  }, []);

  return [haveUserInfo];
};
export const UseCheckUserPass = (_userId, _userPass) => {
  const [canPass, setCanPass] = useState(0);
  const [userIdPass, setUserIdPass] = useState({
    id: _userId,
    pass: _userPass,
  });
  async function CheckUserCanPass() {
    setCanPass(1);
    const userInfo = await axios.get(
      `http://localhost:3001/users/${userIdPass.id}`
    ).then(res=>res.data);
    console.log(userInfo);
    console.log(userInfo.id);
    alert("going to check");
    if (userIdPass.pass == userInfo.pass) {
      SaveToLocal("userId",userIdPass.id);
      SaveToLocal("userPass",userIdPass.pass);
      SaveToLocal("token",userInfo.token);
      setCanPass(3);  
   
    } else {
      setCanPass(2);
      console.log(`userIdPass.pass : ${userIdPass.pass} |  userInfo.pass : ${ userInfo.pass}`)
    }
  }
  useEffect(() => {
    if (
      userIdPass.id != null &&
      userIdPass.pass != null &&
      userIdPass.id.length > 0 &&
      userIdPass.pass.length > 0
    ) {
      setCanPass(0);
      CheckUserCanPass();
    }
  }, [userIdPass]);
  return [setUserIdPass, canPass];
};
