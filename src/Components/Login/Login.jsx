// import React from 'react';

import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const location = useLocation();
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        setError('');
        const from = location?.state?.from?.pathname || '/';
        
        
        loggedUser(email, password)
            .then(result => {
                const loggedIn = result.user;
                console.log(loggedIn);
                setError('');
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, {replace: true});

            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
            }
            )
    }
    return (
        <form onSubmit={handleLogin}>
            <h2 className='text-3xl' style={{ marginTop: '30px', fontWeight: '700' }}>Login</h2><br></br>
            <input type="email" placeholder="Email" name="email" className="input input-bordered input-primary w-full max-w-xs" required /><br></br><br></br>
            <input type="password" placeholder="Password" name="password" className="input input-bordered input-primary w-full max-w-xs" required /><br></br><br></br>
            <p>Create an account! <Link to='/SignUp' style={{ color: 'blue' }}>Sign Up</Link></p><br></br>
            <button type="submit" className="btn btn-primary">Login</button><br></br><br></br>
            <p style={{ color: 'red' }}>{error}</p>
        </form>
    );
};

export default Login;