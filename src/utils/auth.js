import axios from "axios";
import jwt_decode from "jwt-decode"; //doc:https://www.npmjs.com/package/jwt-decode
import { development, production } from "./setting";

const domain = production
axios.defaults.withCredentials = true;

const register = (account, password) => new Promise(async (resolve, reject) => {
    const options = {
        method: 'POST',
        url: `${domain}/api/v1/authorization/signup`,
        headers: { 'Content-Type': 'application/json' },
        data: { account, password }
    };
    try {
        const response = await axios.request(options);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            resolve()
        }
    } catch (e) {
        console.error(e.response)
        reject(e.response.data.msg)
    }

})

const login = (account, password) => new Promise(async (resolve, reject) => {
    const options = {
        method: 'POST',
        url: `${domain}/api/v1/authorization/login`,
        headers: { 'Content-Type': 'application/json' },
        data: { account, password }
    };

    try {
        const response = await axios.request(options);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            resolve()
        }
    } catch (e) {
        console.error(e.response)
        reject(e.response.data.msg)
    }
})

const logout = () => new Promise(async (resolve, reject) => {
    const options = {
        method: 'GET',
        url: `${domain}/api/v1/authorization/logout`,
    };

    axios.request(options).then((res) => resolve())
        .catch((err) => reject(err.response.data.msg));

})

const authenticate = () => new Promise(async (resolve, reject) => {
    const options = {
        method: 'GET',
        url: `${domain}/api/v1/authenticateUser`,
    };
    try {
        const response = await axios.request(options)
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            resolve()
        }
    } catch (e) {
        reject(e.response.data.msg)
    }

})

export { register, authenticate, login, logout }