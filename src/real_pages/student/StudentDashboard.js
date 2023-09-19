import { useState, useContext, useRef, useEffect } from "react";
import { userAllData } from "../../App";
import TabelRowTerm from "../../real_component/table/TableRowTerm";
import TableLoading from "../../real_component/table/TabelLoading";
import TableRoHeader from "../../real_component/table/TableRowHeader";
import TableRowUserStudent from "../../real_component/table/TableRowUserStudnet";

import {
    GetAllTermsForStudent,
  GetAllTerms,
  RemoveSomeUser,
  RemoveSomeTerm,
  AddNewPerson,
  AddNewTerm,
} from "../../components/PublicMethods";

const StudentDashboard = (props) => {
  const userAllDataContext = useContext(userAllData);
  const [selectedSection, setSelectedSection] = useState(3);
  const adminTabs = ["Students"];
  const adminTabsRef = useRef();
  const dataBoxRef = useRef();
  const galanGadanRef = useRef();
  // let galanGadanTracker = null;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("loading");
  const [tabAllNumber, setTabAllNumber] = useState(0);
  const [tabPageNumber, setTabPageNumber] = useState(1);
  const [dataBoxHtml, setDataBoxHtml] = useState(<></>);
  const [newItemHtml, setNewItemHtml] = useState(<></>);

  const [allUsersInfoData,setAllUsersInfoData]=useState([]);
  const [allTermsData,setAllTermsData]=useState([]);

  useEffect(() => {
    onChangeSelectedSection();
  }, [selectedSection]);
  useEffect(()=>{
    lateUpdate();
  },[allUsersInfoData,allTermsData])
  async function onChangeSelectedSection() {
    setIsLoading(true);
    setLoadingText("Api Request ...");
    galanGadanRef.current.style.left = adminTabsRef.current.offsetLeft + "px";
    galanGadanRef.current.style.width = adminTabsRef.current.offsetWidth + "px";

    const allUsersInfoData = await GetAllTermsForStudent();
    const allTermsData = await GetAllTerms();
    setAllUsersInfoData(allUsersInfoData);
    setAllTermsData(allTermsData);
 
   
    //  userAllDataContext.setUserData({
    //    ...userAllDataContext.userData,
    //   allTermsData: allTermsData,
    //   allUsersInfoData: allUsersInfoData,
    // });
    setLoadingText("Making Tabel ...");


    setIsLoading(false);

    setDataBoxHtml(
      someUserDiv(props.PersonalData)
  );
  }
function lateUpdate() {
  setDataBoxHtml(
    someUserDiv(props.PersonalData)
);
}
  function getTermInfo(termId) {
    const foundedTerm = allTermsData.find(
      (theTerm) => {
        return termId == theTerm.id;
      }
    );
    return foundedTerm;
  }
  function getTermInfoForStudent(userTermObj) {

    if(allUsersInfoData.length<1&&allTermsData.length<1){
      const theOBJ = { term: "", teacher: "" };

      return theOBJ;
    }

    const foundedTerm =allTermsData.find(
      (theTerm) => {
        return userTermObj.termId == theTerm.id;
      }
    );

    const foundedTeacher =allUsersInfoData.find(
      (theTeacher) => {
        return userTermObj.termTeacherId == theTeacher.id;
      });
    const theOBJ = { term: foundedTerm, teacher: foundedTeacher };

    return theOBJ;
  }
  const usersRowHeader = <TableRoHeader selectedSection={selectedSection} />;
  const someUserDiv = (userInfoObj) => {
    // const userId=userInfoObj.id;
    return (
      <TableRowUserStudent
        key={crypto.randomUUID()}
        selectedSection={selectedSection}
        userInfoObj={userInfoObj}
        getTermInfoForStudent={ getTermInfoForStudent}
        getTermInfo={getTermInfo}
      />
    );
  };
  const someTermDiv = (termInfoObj) => {
    // const userId=userInfoObj.id;
    return (
      <TabelRowTerm
        key={crypto.randomUUID()}
        termInfoObj={termInfoObj}
        UsersList={allUsersInfoData}
      />
    );
  };
  const changeTabLoadingDiv = <TableLoading loadingText={loadingText} />;
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
        <div className="text-lg my-8">Student Management</div>
      </div>
      <div className="data-info">
        <div className="admin-tabs  relative text-gray-500 [&>button]:bg-opacity-40   flex items-center  py-4 border-b-2 border-gray-700  px-28">
          {
              <button
                ref={adminTabsRef}
                key={crypto.randomUUID()}
                className={`button mx-6 px-5  transition-all duration-1000 ${
                  selectedSection == 3 && "text-gray-200"
                }`}
                type={"button"}
              >
                {adminTabs}
              </button>
            
          }
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
              <div className="hidden searchBoxInput border rounded-3xl px-6 py-2 border-border-dark">
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
                onClick={() => {}}
                type="button"
                className="addNewItem flex justify-between items-center border rounded-3xl px-6 py-2 border-border-dark mx-4"
              >
                <span className="text-blue-500">
                  <i className="fa-solid fa-hexagon-plus"></i>
                </span>
                <span className="mx-2">Nothing</span>
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

export default StudentDashboard;
