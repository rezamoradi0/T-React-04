const TableRoHeader = (props) => {

  if(props.selectedSection==4){
    //Terms
    return  <div className="flex justify-between bg-gray-800 px-4 py-4 rounded-t-2xl">
    <div className="flex  flex-col justify-between items-start w-1/5">
    Term
    </div>
    <div className="theRole w-1/5">  Code</div>
    <div className="theEmail w-1/5">  Size</div>
    <div className="theEmail w-2/5">    Teachers</div>
  </div>;
  }else  if(props.selectedSection==3){
    //Students
    return  <div className="flex justify-between bg-gray-800 px-4 py-4 rounded-t-2xl">
    <div className="flex  flex-col justify-between items-start w-1/5">
    Student
    </div>
    <div className="theRole w-1/5">  PersonalID</div>
    <div className="theEmail w-1/5">  MainTerm</div>
    <div className="theEmail w-2/5">    Terms</div>
  </div>;
  }else  if(props.selectedSection==2){
    //Students
    return  <div className="flex justify-between bg-gray-800 px-4 py-4 rounded-t-2xl">
    <div className="flex  flex-col justify-between items-start w-1/6">
    Teachers
    </div>
    <div className="theRole w-1/6">  PersonalID</div>
    <div className="theEmail  w-1/2">  MainTerm</div>
    
  </div>;
  }else {
  return  <div className="flex justify-between bg-gray-800 px-4 py-4 rounded-t-2xl">
    <div className="flex  flex-col justify-between items-start w-1/3">
     Name
    </div>
    <div className="theRole w-1/3">Role</div>
    <div className="theEmail w-1/3">Email</div>
  </div>;
  }
}
 
export default TableRoHeader;