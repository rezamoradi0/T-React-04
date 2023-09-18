import { useState } from "react";

const NewTeacherTemButton = (props) => {
    const [selected,setSelected]=useState(false);
    return (<button className={`rounded-3xl   ${selected?" border-blue-400 border-2  ":" border-gray-800 border "}py-2 px-4 overflow-hidden`} onClick={(e)=>{
        props.ToggleTeacher(e,props.teacherInfo);
        setSelected(!selected);
    }}  key={crypto.randomUUID()} type="button">
        {props.teacherInfo.firstName +  "  "+props.teacherInfo.lastName}
    </button> );
}
 
export default NewTeacherTemButton;