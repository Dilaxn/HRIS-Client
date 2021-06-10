import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllAccountTypes,readAllCurrency,readAllPayFrequency,readAllEmpSalary,readAllMySalary};

function readAllPayFrequency() {
    return Promise.resolve().then(() => {
        return  axios.get('/pay_frequencies', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllCurrency() {
    return Promise.resolve().then(() => {
        return  axios.get('/currencies', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllAccountTypes() {
    return Promise.resolve().then(() => {
        return  axios.get('/bank_account_types', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllEmpSalary(props) {
    let empID= props.props
    return Promise.resolve().then(() => {
        return  axios.get('/employees/'+empID+'/salary_components', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                if(response.status===400){
                    console.log('No data...');
                }
                // setUserData(response.data);
                console.log(response.data)
                return(response.data.salary_components);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllMySalary() {
    return Promise.resolve().then(() => {
        return  axios.get('/employees/me/salary_components', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log(response.data)
                return(response.data.salary_components);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}