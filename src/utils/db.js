import axios from "axios";
import { development, production } from "./setting";

const domain = production

const showEmployees = () => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        url: `${domain}/api/v1/employee/`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    axios.request(options).then(function (response) {
        resolve(response.data);
    }).catch(function (error) {
        reject(error.response.data.msg);
    });
})


const addEmployee = (name, age, country, position, wage) => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        url: `${domain}/api/v1/employee/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: { name, age, country, position, wage }
    };

    axios.request(options).then(function (response) {
        resolve()
    }).catch(function (error) {
        reject(error.response.data.msg);
    });
})

const deleteEmployee = (employee_ID) => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url: `${domain}/api/v1/employee/${employee_ID}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    };

    axios.request(options).then(function (response) {
        resolve();
    }).catch(function (error) {
        reject(error.response.data.msg);
    });
})


const editEmployee = (id, name, age, country, position, wage) => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'PUT',
        url: `${domain}/api/v1/employee/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: { name, age, country, position, wage }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        resolve()
    }).catch(function (error) {
        console.error(error);
        reject(error.response.data.msg)
    });
})

export { addEmployee, showEmployees, deleteEmployee, editEmployee }