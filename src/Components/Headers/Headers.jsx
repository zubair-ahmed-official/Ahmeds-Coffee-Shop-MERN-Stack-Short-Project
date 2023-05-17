// import React from 'react';

import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Headers = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () =>
    {
        logOut()
        .then(
            
        )
        .catch(err=>console.error(err))
    }
    return (
        <div >
            <nav >
                <Link style={{ margin: '12px', fontWeight: '500' }} to='/'>Home</Link>
                <Link style={{ margin: '12px', fontWeight: '500' }} to='/AddCoffee'>AddCoffee</Link>
                <Link style={{ margin: '12px', fontWeight: '500' }} to='/Orders'>MyOrders</Link>
                {user ?
                <div >
                <div className="flex " style={{ fontWeight: '500', position: 'absolute', top: '30px', left: '250px' }}><span><img style={{width:'35px', height: '45px', borderRadius:'5px'}} src={user.photoURL}></img> </span>&nbsp;&nbsp;&nbsp;&nbsp;
                {user.displayName} &nbsp;</div>

                <div  style={{ fontWeight: '500', position: 'absolute', top: '30px', right: '250px' }}>
                <Link ><button className="btn btn-sm btn-error" onClick={handleLogout} >Log out</button></Link></div> </div>: <Link to='/Login' style={{ fontWeight: '500', position: 'absolute', right: '250px' }}><button className="btn btn-sm btn-secondary">Login</button></Link>}
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Headers;