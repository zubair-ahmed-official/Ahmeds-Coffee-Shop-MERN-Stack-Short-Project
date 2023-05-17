// import React from 'react';

import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebase-config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    // const user = { displayName: "Zubair" };
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loggedUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, signedUser => {
            console.log("Logged user", signedUser);
            setUser(signedUser);
            setLoading(false)
            if (signedUser && signedUser.email) {
                const loggedUser = {
                    email: signedUser.email
                }
                console.log(loggedUser);
                fetch('https://ahmeds-coffee-express.vercel.app/jwt',
                    {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(loggedUser),

                    })
                .then(res => res.json())
                .then(data => {
                    console.log('jwt token', data)
                    localStorage.setItem('token', data.token)
                })

            }
            else{
                localStorage.removeItem('token')
            }
        }
        )
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, loggedUser, logOut };
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;