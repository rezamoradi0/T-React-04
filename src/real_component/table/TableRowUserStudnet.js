const TableRowUserStudent = (props) => {
    if (props.selectedSection == 3) {
      return (
        <div
          key={crypto.randomUUID()}
          className="flex group relative justify-between px-4 py-2 overflow-hidden"
        >
          <div className="flex  flex-col justify-between items-start w-1/5">
            {`${props.userInfoObj.firstName} ${props.userInfoObj.lastName} `}
          </div>
          <div className="theRole w-1/5"> {props.userInfoObj.personalId}</div>
          <div className="theMainTerm w-1/5"> {props.userInfoObj.mainTerm}</div>
          <div className="allTerms flex flex-wrap w-2/5">
            {" "}
            {props.userInfoObj.userTerm.map((singleUserTerm) => {
              const theObj = props.getTermInfoForStudent(singleUserTerm);
              console.log(theObj);
              // return singleUserTerm.termId;
              return (
                <span key={crypto.randomUUID()} className="flex w-fit items-center rounded-3xl border border-gray-800 overflow-hidden p-[1px]">
                  <span className="inline-block px-4 py-1  rounded-3xl bg-[#3B82F6]">{theObj && theObj.term.name} </span>
                  <span className=" px-4 py-1 ">
                    {theObj &&
                      theObj.teacher.firstName + " " + theObj.teacher.lastName}
                  </span>
                </span>
              );
            })}
          </div>
          <button
            key={crypto.randomUUID()}
            onClick={async () => {
              if (await props.RemoveSomeUser(props.userInfoObj.id)) {
                props.onRemoveSomeData(
                  props.userInfoObj.type,
                  props.userInfoObj.id
                );
              }
            }}
            className="absolute hover:bg-green-900 group-hover:-translate-x-9 transition-all duration-500 px-3 py-1 rounded-3xl right-0 delay-300 bg-gray-800 translate-x-full"
            type="button"
          >
            {" "}
            Edit{" "}
          </button>
        </div>
      );
    
    }
  else if(props.selectedSection == 2)  {
    //Teachers
      return (
        <div
          key={crypto.randomUUID()}
          className="flex group relative justify-between px-4 py-2 overflow-hidden"
        >
          <div className="flex   justify-start items-start w-1/6">
            <span className="capitalize mx-1">{props.userInfoObj.firstName}</span>
            <span className="capitalize">{props.userInfoObj.lastName}</span>
          </div>
          <div className="personalID w-1/6 capitalize">{props.userInfoObj.personalId}</div>
          {/* <div className="theEmail w-1/6 capitalize">
            {props.userInfoObj.mail}
          </div> */}
        <div className="w-1/2 flex flex-wrap  pb-2    justify-start">
          {props.userInfoObj.booksId.map((termId)=>{
               const termInfo= props.getTermInfo(termId);
                return (
                  <span key={crypto.randomUUID()} className="flex w-fit items-center rounded-3xl border  border-gray-800 overflow-hidden p-[1px]">
                    <span className="inline-block px-4 py-1  rounded-3xl bg-[#3B82F6]">{termInfo && termInfo.name} </span>
                    <span className=" px-4 py-1 ">
                      {termInfo &&
                        termInfo.code}
                    </span>
                  </span>
                );
          })}
        </div>
          <button
          key={crypto.randomUUID()}
            onClick={async () => {
              if (await props.RemoveSomeUser(props.userInfoObj.id)) {
                props.onRemoveSomeData(
                  props.userInfoObj.type,
                  props.userInfoObj.id
                );
              }
            }}
            className="absolute hover:bg-green-900 group-hover:-translate-x-9 transition-all duration-500 px-3 py-1 rounded-3xl right-0 delay-300 bg-gray-800 translate-x-full"
            type="button"
          >
            {" "}
            Edit{" "}
          </button>
        </div>
      );
          } 
    else{
      return (
        <div
          key={crypto.randomUUID()}
          className="flex group relative justify-between px-4 py-2 overflow-hidden"
        >
          <div className="flex  flex-col justify-between items-start w-1/3">
            <span className="capitalize">{props.userInfoObj.firstName}</span>
            <span className="capitalize">{props.userInfoObj.lastName}</span>
          </div>
          <div className="theRole w-1/3 capitalize">{props.userInfoObj.type}</div>
          <div className="theEmail w-1/3 capitalize">
            {props.userInfoObj.mail}
          </div>
  
          <button
            onClick={async () => {
              if (await props.RemoveSomeUser(props.userInfoObj.id)) {
                props.onRemoveSomeData(
                  props.userInfoObj.type,
                  props.userInfoObj.id
                );
              }
            }}
            className="absolute hover:bg-green-900 group-hover:-translate-x-9 transition-all duration-500 px-3 py-1 rounded-3xl right-0 delay-300 bg-gray-800 translate-x-full"
            type="button"
          >
            {" "}
            Edit{" "}
          </button>
        </div>
      );
          }
  };
  
  export default TableRowUserStudent;
  