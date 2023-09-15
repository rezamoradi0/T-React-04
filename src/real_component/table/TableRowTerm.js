const TabelRowTerm = (props) => {
  const getTeacherInfo = (AllTeachersIds,TermTeachers) => {
    
    let haveTearchList = [];
    for (let i = 0; i < AllTeachersIds.length; i++) {
      const temp = AllTeachersIds.filter(
        (teacher) => teacher.id == TermTeachers[i]
      );

      haveTearchList = [...haveTearchList, ...temp];
    }
    
    return haveTearchList;
  };
  const type = "term";
  return (
    <div
      key={crypto.randomUUID()}
      className="flex group relative justify-between px-4 py-2 overflow-hidden items-center border-b border-gray-800"
    >
      <div className="flex  flex-col justify-between items-start w-1/5">
        <span className="capitalize">{props.termInfoObj.name}</span>
      </div>
      <div className="theRole w-1/5 capitalize">{props.termInfoObj.code}</div>
      <div className="theEmail w-1/5 capitalize">{props.termInfoObj.size}</div>
      <div className="theTeachers w-2/5 flex items-center justify-start">
        {getTeacherInfo(
          props.UsersList.filter((UsersList) => {
            return UsersList.type == "teacher";
          })
        ,props.termInfoObj.teacher).map((teacher) => {
          return <span className="mr-4 px-3 py-1 rounded-3xl bg-gray-700 text-center">{`${teacher.firstName} ${teacher.lastName}`}</span>;
        })}
      </div>
      <button
        onClick={async () => {
          if (await props.RemoveSomeTerm(props.termInfoObj.id)) {
            props.onRemoveSomeData(type, props.termInfoObj.id);
          }
        }}
        className="absolute hover:bg-red-900 group-hover:-translate-x-9 transition-all duration-500 px-3 py-1 rounded-3xl right-0 delay-300 bg-gray-800 translate-x-full"
        type="button"
      >
        {" "}
        Remove{" "}
      </button>
    </div>
  );
};

export default TabelRowTerm;
