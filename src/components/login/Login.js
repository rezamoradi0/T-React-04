import React, { useEffect, useRef, useState } from "react";
import { UseCheckUserPass } from './../CustomHook/UseCheckUser';
import MainLoading from "../loading/MainLoading";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
    const userId=localStorage.getItem("userId");
    const userPassword=localStorage.getItem("userPass");


    const [userIdInput,setUserIdInput] =useState("");
    const [userPassInput,setUserPassInput] =useState("");

    const [cSetUserIdPass,canPass]=UseCheckUserPass(userId,userPassword);
    const testNavigate=useNavigate();
   const idChangeHandler=(event)=>{
  
    setUserIdInput(event.target.value);
   }    
   const passChangeHandler=(event)=>{
    setUserPassInput(event.target.value);
   } 
   useEffect(()=>{
    if(canPass==0&&userId!=null&&userId!=undefined&&userId.length>0&&userPassword&&userPassword.length>0){
       checking(userId,userPassword);

  }
   },[])
   useEffect(()=>{
    if(canPass==1){
      
    }else if(canPass===2){
    alert(" رمز و پسورد اشتباه است");
    }else if(canPass===3){
      alert(" رمز و پسورد درسته بزن بریم ؟ ");
     return testNavigate("/");
    }
   },[canPass]);

    const    checking =(_userId,_userPassword)=>{
    console.log(`here  user info =>:  ${_userId}  ${_userPassword}`)
    cSetUserIdPass({id:_userId,pass:_userPassword});
    console.log(`can pass => ${canPass}`)
  
   }
    if(canPass==0&&userId!=null&&userId!=undefined&&userId.length>0&&userPassword&&userPassword.length>0){
        // checking(userId,userPassword);

    }
    else{
   
        return (
            <div className="w-full border-2 bg-black border-black h-screen flex items-center justify-center">
              <div className="relative w-full h-full  bg-gradient-to-t from-transparent to-gray-900 flex items-center justify-center">
                <form onSubmit={(event)=>{event.preventDefault();
                  return false;
                }} className="flex flex-col items-center justify-center w-1/2 border-8 shadow-2xl bg-gradient-to-t from-gray-900 to-transparent bg-opacity-80 rounded-3xl border-gray-700 h-2/3">
                  <div className="flex text-gray-900 items-center justify-center w-3/4 rounded-lg bg-gray-200 my-5 h-12">
                    <span className="min-w-fit mx-2">User ID : </span>
                    <input
                      type="text"
                      name="id"
                      value={userIdInput}
                      placeholder="Enter Your ID Here ..."
                      onChange={idChangeHandler}
                      className="w-full   outline-none bg-transparent"

                    />
                  </div>
                  <div className="flex items-center justify-center w-3/4 rounded-lg bg-gray-200 my-5 h-12">
                    <span className="min-w-fit mx-2">Password : </span>
                    <input
                      type="password"
                      name="password"
                      value={userPassInput}
                      onChange={passChangeHandler}
                      placeholder="Enter Your Password Here ..."
                      className="w-full  outline-none bg-transparent"
                    />
                  </div>
                  <button onClick={(e)=>{
                    e.preventDefault();
                   const test= checking(userIdInput,userPassInput);
                   return test;
                  }} type="submit" className="bg-gray-200 w-24 h-10 rounded-r-2xl rounded-l-lg"> Login <i className="fa-regular fa-arrow-right"></i></button>
                </form>
                <div className={`my-loading ${canPass===1?"block":"hidden"} bg-red-500 w-full h-full absolute` }>
             
                </div>
              </div>
            </div>
          );
    }

};

export default Login;
