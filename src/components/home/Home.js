import React, { useEffect, useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { UseCheckUserHaveInfo } from '../CustomHook/UseCheckUser';
import MainLoading from '../loading/MainLoading';


const Home = () => {
    const [haveInfo]=UseCheckUserHaveInfo();

    if(haveInfo==undefined){
       return <MainLoading/>
    }else if(!haveInfo){
        return <Navigate to={'/login'}/>
    }
    return ( <div className='text-red-500'>
        {haveInfo.toString()}
        <br/>
        this is home
    </div> );
}
 
export default Home;