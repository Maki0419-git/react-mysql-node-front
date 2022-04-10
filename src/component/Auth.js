import axios from "axios";
import { useState, useContext, } from 'react'
import { Context } from "../Context";
import { register, login } from "../utils/auth";

const Login = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const myContext = useContext(Context);
    const { progress } = myContext.userStatus;
    const inputHandler = (e, setState) => {
        setState(e.target.value)
    }
    const handleAuth = async () => {
        try {
            const result = progress === "register" ? await register(account, password) : await login(account, password);
            myContext.setUserStatus({ isSignIn: true, progress: "authorized" });
        } catch (e) {
            alert(e)
        }

    }
    return (
        <div className="auth">
            <div className="form">
                <h2 className="method">{progress.toUpperCase()}</h2>

                <label>Account</label>
                <input type="text"
                    value={account}
                    onChange={(e) => inputHandler(e, setAccount)}
                />
                <label>Password</label>
                <input type="password"
                    value={password}
                    onChange={(e) => inputHandler(e, setPassword)}
                />
                <button onClick={handleAuth}>{progress.toUpperCase()}</button>
            </div>

        </div>
    )
}

export default Login
