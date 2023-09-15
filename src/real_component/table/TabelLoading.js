const TableLoading = (props) => {
    return (     <div className="absolute flex justify-center transition-all duration-1000 items-center left-0 top-0 w-full h-full bg-gray-800 ">
    <span className="mx-auto">{props.loadingText}</span>
  </div> );
}
 
export default TableLoading;