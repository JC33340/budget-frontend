import { Outlet } from 'react-router-dom';


const AuthLayout = ()=>{

    return(
        <div className='flex flex-row '>
            <div>
                <p>Budgeter</p>
                <p>An app built using ReactJS, ExpressJS and SQL</p>
            </div>
            <Outlet />
        </div>
    )
}

export default AuthLayout