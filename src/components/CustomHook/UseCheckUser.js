import React, { useEffect, useState } from "react";
import axios from "axios";
import { SaveToLocal, GetToLocal, RemvoeItemLocal } from "../PublicMethods";
/**
 *  user have required info in localstorage?
 * @returns 0=loading 1=false 2=true
 */
export const UseCheckUserHaveInfo = () => {
  const [tokenStatus, setHaveUserInfo] = useState(0);
  async function CheckUserHaveInfo() {
    const userToken = GetToLocal("token");
    const userId = GetToLocal("userId");
    if (
      userToken != null &&
      userToken.length > 1 &&
      userToken != 0 &&
      userId &&
      userId.length > 0
    ) {
      const userInfo = await axios
        .get(`http://localhost:3001/users/${userId}`)
        .then((res) => res.data);
      if (userInfo.id == userId && userInfo.token == userToken) {
        setHaveUserInfo(2);
      } else {
        setHaveUserInfo(1);
      }
    } else {
      setHaveUserInfo(1);
    }
  }
  useEffect(() => {
    CheckUserHaveInfo();
  }, []);

  return [tokenStatus];
};
/**
 * کاستوم هوک جهت ست و چک رمز و پسورد و اعتبارسنجی
 * @param {آیدی_کاربر} _userId یوزر آیدی
 * @param {رمز_کاربر} _userPass یوزر پسور
 * @returns {[setPassAndUseMethod,userCanPassOrNot]} 
 * ******
 * 1- متد ست استیت رمز و پسور
 * ******
 * 2-اعتبارسنجی :0 شروع نشده ،1 لودینگ ، 2 منفی ، 3 تایید
 */
export const UseCheckUserPass = (_userId, _userPass) => {
  const [canPass, setCanPass] = useState(0);
  const [userIdPass, setUserIdPass] = useState({
    id: _userId,
    pass: _userPass,
  });
  async function CheckUserCanPass() {
    setCanPass(1);
    const userInfo = await axios
      .get(`http://localhost:3001/users/${userIdPass.id}`)
      .then((res) => res.data);
    console.log(userInfo);
    console.log(userInfo.id);
    alert("going to check");
    if (userIdPass.pass == userInfo.pass) {
      SaveToLocal("userId", userIdPass.id);
      SaveToLocal("userPass", userIdPass.pass);
      SaveToLocal("token", userInfo.token);
      setCanPass(3);
    } else {
      setCanPass(2);
      RemvoeItemLocal("userId");
      RemvoeItemLocal("userPass");
      console.log(
        `userIdPass.pass : ${userIdPass.pass} |  userInfo.pass : ${userInfo.pass}`
      );
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
