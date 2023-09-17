import React, { useContext, useEffect, useRef, useState } from "react";
import { userAllData } from "../../App";
import {
  GetAllUsers,
  GetAllTerms,
  RemoveSomeUser,
  RemoveSomeTerm,
  AddNewStudent,
} from "./../PublicMethods";
import { act } from "react-dom/test-utils";
import TableRowUser from "../../real_component/table/TableRowUser";
import TabelRowTerm from "../../real_component/table/TableRowTerm";
import TableRoHeader from "../../real_component/table/TableRowHeader";
import TableLoading from "../../real_component/table/TabelLoading";
import NewStudent from "../../real_component/popbox/NewStudent";
const AdminPage = (props) => {
  const userAllDataContext = useContext(userAllData);
  const [selectedSection, setSelectedSection] = useState(0);
  const adminTabs = ["All Users", "Admins", "Teachers", "Students", "Terms"];
  const adminTabsRef = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const dataBoxRef = useRef();
  const galanGadanRef = useRef();
  // let galanGadanTracker = null;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("loading");
  const [tabAllNumber, setTabAllNumber] = useState(0);
  const [tabPageNumber, setTabPageNumber] = useState(1);
  const [dataBoxHtml, setDataBoxHtml] = useState(<></>);
  const [newItemHtml, setNewItemHtml] = useState(<></>);
  const usersRowHeader = <TableRoHeader selectedSection={selectedSection} />;
  const someUserDiv = (userInfoObj) => {
    // const userId=userInfoObj.id;
    return (
      <TableRowUser
        key={crypto.randomUUID()}
        selectedSection={selectedSection}
        userInfoObj={userInfoObj}
        RemoveSomeUser={RemoveSomeUser}
        onRemoveSomeData={onRemoveSomeData}
        getTermInfoForStudent={getTermInfoForStudent}
        getTermInfo={getTermInfo}
      />
    );
  };
  const someTermDiv = (termInfoObj) => {
    // const userId=userInfoObj.id;
    return (
      <TabelRowTerm
        termInfoObj={termInfoObj}
        UsersList={userAllDataContext.userData.allUsersInfoData}
        RemoveSomeTerm={RemoveSomeTerm}
        onRemoveSomeData={onRemoveSomeData}
      />
    );
  };
  const changeTabLoadingDiv = <TableLoading loadingText={loadingText} />;
  useEffect(() => {
    // onChangeSelectedSection();
  }, []);
  useEffect(() => {
    onChangeSelectedSection();
  }, [selectedSection]);
  useEffect(() => {
    onChangeUserData();
  }, [userAllDataContext.userData]);

  // function arrowTracker(){
  //   if(galanGadanRef.current.offsetLeft!=galanGadanTracker){
  //     galanGadanRef.current.classList.add("rounded-3xl")
  //     galanGadanRef.current.classList.add("bg-red-500")
  //   }else {
  //     galanGadanRef.current.classList.remove("rounded-3xl")
  //     galanGadanRef.current.classList.remove("bg-red-500")
  //   }
  //   galanGadanTracker=galanGadanRef.current.offsetLeft;

  // }
  function getButtonName() {
    switch (selectedSection) {
      case 0:
        return "New User";

      case 1:
        return "New Admin";

      case 2:
        return "New Teacher";

      case 3:
        return "New Student";

      case 4:
        return "New Term";

      default:
        return "New Item";
    }
  }
  function createNewItem() {
    function Destroy() {
      setNewItemHtml(<></>);
    }
    async function fillInformation(NewStudentDataObj) {
      console.log(NewStudentDataObj);
      const newStudentObj = await AddNewStudent(NewStudentDataObj);
      if (newStudentObj != "error") {
        console.log(newStudentObj.id + "  " + newStudentObj.firstName);
        AddNewUserCallBack(newStudentObj);
      }
    }
    function AddNewUserCallBack(userObject) {
      userAllDataContext.setUserData({
        ...userAllDataContext.userData,
        allUsersInfoData: [
          ...userAllDataContext.userData.allUsersInfoData,
          userObject,
        ],
      });
    }
    Destroy();
    if (selectedSection == 3) {
      setNewItemHtml(
        <NewStudent
          AllUsersInfoData={userAllDataContext.userData.allUsersInfoData}
          AllTermsData={userAllDataContext.userData.allTermsData}
          Destroy={Destroy}
          FillInformation={fillInformation}
        />
      );
    } else if (selectedSection == 2) {
      alert("nothing");
    }
  }
  function getTermInfo(termId) {
    const foundedTerm = userAllDataContext.userData.allTermsData.find(
      (theTerm) => {
        return termId == theTerm.id;
      }
    );
    return foundedTerm;
  }
  function getTermInfoForStudent(userTermObj) {
    const foundedTerm = userAllDataContext.userData.allTermsData.find(
      (theTerm) => {
        return userTermObj.termId == theTerm.id;
      }
    );

    const foundedTeacher = userAllDataContext.userData.allUsersInfoData.find(
      (theTeacher) => {
        return userTermObj.termTeacherId == theTeacher.id;
      }
    );

    // console.log(foundedTerm.id);
    // console.log(foundedTeacher.id);
    const theOBJ = { term: foundedTerm, teacher: foundedTeacher };
    // alert(theOBJ.term.id);
    // alert(theOBJ.teacher.id);
    return theOBJ;
  }
  function onRemoveSomeData(type, id) {
    alert("type :" + type + "  id  : " + id);
    if (type == "term") {
      alert("in term" + id);
      userAllDataContext.setUserData({
        ...userAllDataContext.userData,
        allTermsData: userAllDataContext.userData.allTermsData.filter(
          (termInfo) => termInfo.id != id
        ),
      });
    } else {
      userAllDataContext.setUserData({
        ...userAllDataContext.userData,
        allUsersInfoData: userAllDataContext.userData.allUsersInfoData.filter(
          (userInfo) => userInfo.id != id
        ),
      });
    }
  }
  async function onChangeUserData() {
    function setTabsAllInfo() {
      if (userAllDataContext.userData.allUsersInfoData == null) return;

      if (selectedSection == 0) {
        setTabAllNumber(userAllDataContext.userData.allUsersInfoData.length);
        setDataBoxHtml(
          userAllDataContext.userData.allUsersInfoData.map((someUserData) => {
            return someUserDiv(someUserData);
          })
        );
      } else if (selectedSection == 1) {
        const outPutFilterd = userAllDataContext.userData.allUsersInfoData
          .filter((userInfo) => userInfo.type == "admin")
          .map((someUserData) => {
            return someUserDiv(someUserData);
          });
        setTabAllNumber(outPutFilterd.length);
        setDataBoxHtml(outPutFilterd);
      } else if (selectedSection == 2) {
        const outPutFilterd = userAllDataContext.userData.allUsersInfoData
          .filter((userInfo) => userInfo.type == "teacher")
          .map((someUserData) => {
            return someUserDiv(someUserData);
          });
        setTabAllNumber(outPutFilterd.length);
        setDataBoxHtml(outPutFilterd);
      } else if (selectedSection == 3) {
        const outPutFilterd = userAllDataContext.userData.allUsersInfoData
          .filter((userInfo) => userInfo.type == "student")
          .map((someUserData) => {
            return someUserDiv(someUserData);
          });
        setTabAllNumber(outPutFilterd.length);
        setDataBoxHtml(outPutFilterd);
      } else if (selectedSection == 4) {
        const outPut = userAllDataContext.userData.allTermsData.map(
          (someTermData) => {
            return someTermDiv(someTermData);
          }
        );
        setTabAllNumber(outPut.length);
        setDataBoxHtml(outPut);
      }
    }
    setTabsAllInfo();
  }
  var timeOutSaver = null;
  async function onChangeSelectedSection() {
    setIsLoading(true);
    setLoadingText("Api Requset ...");
    function galanGadanMove() {
      //   console.log( "width :"+ adminTabsRef[selectedSection].current.offsetWidth);
      galanGadanRef.current.style.left =
        adminTabsRef[selectedSection].current.offsetLeft + "px";
      galanGadanRef.current.style.width =
        adminTabsRef[selectedSection].current.offsetWidth + "px";
    }
    async function getTabInfo() {
      if (timeOutSaver != null) {
        clearTimeout(timeOutSaver);
      }
      const allUsersInfoData = await GetAllUsers();
      // await userAllDataContext.setUserData({
      //   ...userAllDataContext.userData,
      //   allUsersInfoData: allUsersInfoData,
      // });
      const allTermsData = await GetAllTerms();
      await userAllDataContext.setUserData({
        ...userAllDataContext.userData,
        allTermsData: allTermsData,
        allUsersInfoData: allUsersInfoData,
      });
      setLoadingText("Making Tabel ...");
      timeOutSaver = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    galanGadanMove();
    await getTabInfo();
  }
  return (
    <div className="w-full min-h-screen bg-[#18181B] text-gray-50 py-8 ">
      <div className="row-info flex flex-col w-full border-0 border-red-500  px-32">
        <div className="flex row justify-between items-center my-4">
          <span>Logo</span>
          <div className="user-info flex justify-between">
            <span className="user-pic rounded-full">
              <img src="" alt="user-pic" />
            </span>
            <span className="user-name mx-2">
              {props.PersonalData.firstName} {props.PersonalData.lastName}
            </span>
          </div>
        </div>
        <div className="text-lg my-8">Admin Management</div>
      </div>
      <div className="data-info">
        <div className="admin-tabs  relative text-gray-500 [&>button]:bg-opacity-40   flex items-center  py-4 border-b-2 border-gray-700  px-28">
          {adminTabs.map((tabName, i) => {
            return (
              <button
                ref={adminTabsRef[i]}
                key={crypto.randomUUID()}
                onClick={() => {
                  setSelectedSection(i);
                }}
                className={`button mx-6 px-5  transition-all duration-1000 ${
                  selectedSection == i && "text-gray-200"
                }`}
                type={"button"}
              >
                {tabName}
              </button>
            );
          })}
          <span
            ref={galanGadanRef}
            className=" galan-gadan transition-all duration-1000 absolute min-w-[60px] bg-[#3B82F6] bottom-0 translate-y-[2px] h-1"
          >
            {" "}
          </span>
        </div>
        <div ref={dataBoxRef} className="dataBox relative">
          <div className="firstRow flex justify-between py-8 px-32">
            <div className="countOfPages flex items-center rounded-3xl border border-gray-800 overflow-hidden p-[1px]">
              <span className="inline-block px-6 py-2  rounded-3xl bg-[#3B82F6]">
                Page {tabPageNumber}
              </span>
              <span className="inline-block px-6 py-2  rounded-3xl">
                All : {tabAllNumber}
              </span>
            </div>
            <div className="searchAndAddItems flex items-center ">
              <div className="searchBoxInput border rounded-3xl px-6 py-2 border-border-dark">
                <span className="mr-4 text-gray-300">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </span>
                <input
                  className="text-gray-300 bg-transparent outline-none"
                  type="text"
                  name="searchText"
                />
              </div>
              <button
                onClick={() => {
                  createNewItem();
                }}
                type="button"
                className="addNewItem flex justify-between items-center border rounded-3xl px-6 py-2 border-border-dark mx-4"
              >
                <span className="text-blue-500">
                  <i className="fa-solid fa-hexagon-plus"></i>
                </span>
                <span className="mx-2">{getButtonName()}</span>
              </button>
            </div>
          </div>
          <div className="dataBoxRow border border-gray-800 rounded-t-2xl  transition-all duration-1000 rounded-b-sm relative mx-auto w-10/12 min-h-[45vh]  flex flex-col overflow-y-auto">
            {usersRowHeader}
            {dataBoxHtml}
            {isLoading && changeTabLoadingDiv}
          </div>
        </div>
      </div>
      {newItemHtml}
    </div>
  );
};

export default AdminPage;
