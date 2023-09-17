import { useState } from "react";

const NewTeacherTemButton = (props) => {
    const [selected,setSelected]=useState(false);
   
    return ( 
        <button
        onClick={(event) => {
        const res=   props.ToggleTerm(event, props.termInfo.id);
        setSelected(res);
        // console.log(res)
        }}
        type="button"
        key={crypto.randomUUID()}
        className={`flex h-fit w-fit items-center rounded-3xl   ${selected?" border-blue-400 border-2  p-0":" border-gray-800 border  p-[1px]"} overflow-hidden`}
      >
        <span className="inline-block px-4 py-1  rounded-3xl bg-[#3B82F6]">
          {props.termInfo && props.termInfo.name}{" "}
        </span>
        <span className=" px-4 py-1 ">
          {props.termInfo && props.termInfo.code}
        </span>
      </button>
     );
}
 
export default NewTeacherTemButton;