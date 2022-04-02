import axios from "axios";
import jwt_decode from "jwt-decode"; //doc:https://www.npmjs.com/package/jwt-decode

const register = (account, password) => new Promise(async (resolve, reject) => {
    const options = {
        method: 'POST',
        url: 'https://react-node-mysql-heroku.herokuapp.com/api/v1/authorization/signup',
        headers: { 'Content-Type': 'application/json' },
        data: { account, password }
    };
    try {
        const response = await axios.request(options);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            const { account } = jwt_decode(token);
            resolve(account)
        }
    } catch (e) {
        console.error(e.response)
        reject(e.response.data.msg)
    }

})

const login = (account, password) => new Promise(async (resolve, reject) => {
    const options = {
        method: 'POST',
        url: 'https://react-node-mysql-heroku.herokuapp.com/api/v1/authorization/login',
        headers: { 'Content-Type': 'application/json' },
        data: { account, password }
    };

    try {
        const response = await axios.request(options);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            const { account } = jwt_decode(token);
            resolve(account)
        }
    } catch (e) {
        console.error(e.response)
        reject(e.response.data.msg)
    }
})

const authenticate = () => new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        url: 'https://react-node-mysql-heroku.herokuapp.com/api/v1/authenticate',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        await axios.request(options)
        const { account } = jwt_decode(token);
        resolve(account)
    } catch (e) {
        reject(e.response.data.msg)
    }

})

export { register, authenticate, login }