import React, {useState} from "react";
import axios from "axios";

export {readAllCustomers,readAllProjects,readAllProProjectActivities};

function readAllCustomers() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/customers', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}


function readAllProjects() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/projects', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        }).then(res => {
            console.log(res.data.data)
            return res.data.data
        })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllProProjectActivities(empID) {
    let empId= empID[0]
    console.log(empId)
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/projects/'+empId+'/activities', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },
        }).then(res => {
            console.log(res.data.data)
            return res.data.data
        })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}