import { useEffect, useState } from "react";
import NewTermTeacherButton from './NewTermTeacherButton';

const NewTerm = (props) => {
  const [name   , setName] = useState("");
  const [code, setCode] = useState("");
  const [size, setSize] = useState("");
  const [animClass, setAnimClass] = useState("new-student-box");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  useEffect(() => {
    console.log(selectedTeachers);
  }, [selectedTeachers]);
  function ToggleTeacher(event, teacherObj) {
    const searchRes = selectedTeachers.find((id) => {
      return id == teacherObj.id;
    });


    if (searchRes == undefined) {
     
      setSelectedTeachers([
        ...selectedTeachers,
        teacherObj.id,
      ]);
      return true;
      //   console.log("Red");
      //   console.log(selectedTerms);
    } else {
      const newTerms = [
        ...selectedTeachers.filter((id) => {
          return id == teacherObj.id
            ? false
            : true;
        }),
      ];
      setSelectedTeachers([...newTerms]);
      return false;
    }
  }
 
  function SendInformation() {
    props.FillInformation({
    
      name: name,
      code: code,
      size: size,
      teacher: selectedTeachers
    },true);
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
              value={name}
              placeholder="name"
              autoSave="false"
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent   py-2 border-gray-700"
              type="text"
              name="firstName"
              value={code}
              placeholder="Code"
              onChange={(e) => {
                setCode(e.currentTarget.value);
              }}
            />
            <input
              className="bg-transparent    py-2 border-gray-700"
              type="text"
              name="firstName"
              value={size}
              placeholder="size"
              onChange={(e) => {
                setSize(e.currentTarget.value);
              }}
            />
          
          </div>
          <div className="  w-1/2 flex flex-col h-full p-2">
            <div className="selectable-terms h-max-[80%] overflow-auto flex flex-wrap border-blue-500  mt-2 ">
              {props.AllUsersInfoData.map((teacherObj) => {
            
                if(teacherObj.type=="teacher"){
                   
                   return <NewTermTeacherButton
                    ToggleTeacher={ToggleTeacher}
                    teacherInfo={teacherObj}
                  />
                }else return <></>;          
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
            SendInformation();
          }}
          type="button"
        >
          <i className="fa-sharp fa-solid fa-plus"></i> Add NewStudent
        </button>
      </div>
    </div>
  );
};

export default NewTerm;
