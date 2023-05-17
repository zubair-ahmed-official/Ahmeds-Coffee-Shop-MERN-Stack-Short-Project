// import React, { useContext } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../Providers/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading)
    {
        return <Spinner animation="border" variant="danger" />
    }
    if(user)
    {
        return children;
    }
    return (
        <Navigate state={{from: location}} to='/Login'/>
    );
};

export default PrivateRoutes;