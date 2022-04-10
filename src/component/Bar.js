import { useEffect } from 'react'
import '../App.css'
import { useState, useContext, } from 'react'
import { Context } from "../Context";
import { authenticate, logout } from '../utils/auth'

const Bar = () => {
    const myContext = useContext(Context);
    const handleLogout = async () => {
        try {
            await logout();
            myContext.setUserStatus({ isSignIn: false, progress: "login", })
        } catch (e) {
            alert(e.message)
        }
    }
    const handleUserStatus = async () => {
        try {
            await authenticate();
            myContext.setUserStatus({ isSignIn: true, progress: "authorized", })
        } catch (e) {
            myContext.setUserStatus({ isSignIn: false, progress: "login", })
        }
    }

    useEffect(() => {
        handleUserStatus();
    }, [])
    return (
        <div className="appbar">
            <h1>Employee Dashboard</h1>
            {myContext.userStatus.isSignIn ?
                <div>
                    <h4 style={{ position: "relative", top: 5 }}>Welcome</h4>
                    <h4 onClick={handleLogout}>登出</h4>
                </div> :
                <div>
                    <h4 onClick={() => {
                        myContext.setUserStatus({ isSignIn: false, progress: "login", })
                    }}>登入</h4>
                    <h4 onClick={() => {
                        myContext.setUserStatus({ isSignIn: false, progress: "register", })
                    }}>註冊</h4>
                </div>
            }

        </div>
    )
}

export default Bar
