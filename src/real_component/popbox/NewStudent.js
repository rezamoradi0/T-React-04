import { useEffect, useState } from "react";
import NewStudentTemButton from "./NewStudentTermButton";

const NewStudent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [personalId, setPersonalId] = useState("");
  const [mainTerm, setMainTerm] = useState("");
  const [password, setPassword] = useState("");
  const [animClass, setAnimClass] = useState("new-student-box");
  const [selectedTerms, setSelectedTerms] = useState([]);
//   console.log(props.AllTermsData);
//   console.log(props.AllUsersInfoData);
useEffect(()=>{
     console.log(selectedTerms);
},[selectedTerms])
  function ToggleTerm(event, termId, teacherId) {
    // event.target.style.backgroundColor = "green";
    // console.log(event.target);
    const searchRes = selectedTerms.find((termObject) => {
      return (termObject.termId == termId && termObject.teacherId == teacherId);
    });

    // console.log("search Res " + searchRes)
    if (searchRes==undefined) {

        // event.target.classList.remove("bg-blue-500") ;
    //   event.target.classList.add("bg-red-500") ;
      console.log(event.target);
      setSelectedTerms([
        ...selectedTerms,
        { termId: termId, teacherId: teacherId }
      ]);
      return true;
    //   console.log("Red");
    //   console.log(selectedTerms);
    } else {
        const newTerms=[...selectedTerms.filter((term)=>{
            return term.termId==termId&&term.teacherId== teacherId?false:true;
         })];
        setSelectedTerms([...newTerms]);
        return false;
        // event.target.classList.remove("bg-red-500") ;
    //   event.target.classList.add("bg-blue-500") ;
    //   console.log("Blue");
    //   console.log(newTerms);
      
    }
  }
  function TermCreator(termInfo, teacherId) {
    // if(props.AllUsersInfoData==null) { console.log("IS Null"); return<></>};
    const teacherInfo = props.AllUsersInfoData.find((_teacherInfo) => {
      return _teacherInfo.id == teacherId;
    });
    // console.log("teacherInfo  "  +teacherInfo.id)
    // console.log("teacherInfo  "  + teacherInfo.firstName)
    return <NewStudentTemButton ToggleTerm={ToggleTerm} teacherInfo={teacherInfo} termInfo={termInfo} />
  }

  return (
    <div
      className={`${animClass} student-box fixed flex flex-col justify-center items-center  w-full h-full bg-gray-950 top-0 left-0`}
    >
      <div className="middle-div w-2/3 h-2/3 border-2 border-t border-gray-700 flex flex-col justify-between ">
        <button
          className="px-5 py-2 border border-gray-700 hover:bg-gray-900 transition-colors duration-500 delay-75 "
          onClick={() => {
            setAnimClass("close-student-box");
            setTimeout(props.Destroy, 2000);
            //props.Destroy();
          }}
          type="button"
        >
          <i className="fa-sharp fa-regular fa-xmark"></i> Close
        </button>
        <div className="flex px-4 py-2 w-full max-h-[80%]">
          <div className="firstCol flex flex-col px-4 w-1/2 justify-between  items-start h-full [&>input]:my-2 [&>input]:inline-block [&>input]:outline-none [&>input]:w-full [&>input]:border-b">
            <input
              className="bg-transparent    py-2 border-gray-700"
              type="text"
              name="firstName"
              value={firstName}
              placeholder="FirstName"
              onChange={(e) => {
                setFirstName(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent   py-2 border-gray-700"
              type="text"
              name="firstName"
              value={lastName}
              placeholder="LastName"
              onChange={(e) => {
                setLastName(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent    py-2 border-gray-700"
              type="email"
              name="firstName"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent  py-2 border-gray-700"
              type="text"
              name="firstName"
              value={mainTerm}
              placeholder="MainTerm"
              onChange={(e) => {
                setMainTerm(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent    py-2 border-gray-700"
              type="text"
              name="firstName"
              value={personalId}
              placeholder="PersonalID"
              onChange={(e) => {
                setPersonalId(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent   py-2 border-gray-700"
              type="text"
              name="firstName"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
          <div className="  w-1/2 flex flex-col h-full p-2">
            <div className="selectable-terms h-max-[80%] overflow-auto flex flex-wrap border-blue-500  mt-2 ">
              {props.AllTermsData.map((termData) => {
                return termData.teacher.map((teacherId) => {
                  return <>{TermCreator(termData, teacherId)}</>;
                });
              })}
            </div>
          </div>
        </div>
        <button
          className="px-5 py-2 border  border-gray-700 hover:bg-green-900 transition-colors duration-700 delay-75 "
          onClick={() => {
            //   props.Destroy();
            setAnimClass("close-student-box");
            setTimeout(props.Destroy, 2000);
          }}
          type="button"
        >
          <i className="fa-sharp fa-solid fa-plus"></i> Add NewStudent
        </button>
      </div>
    </div>
  );
};

export default NewStudent;
