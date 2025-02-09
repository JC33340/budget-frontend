import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = ()=>{

    return(
        <div className='p-4 h-14 bg-linear-to-r from-cyan-500 to-blue-500'>
            <Outlet />
        </div>
    )
}

export default AppLayout