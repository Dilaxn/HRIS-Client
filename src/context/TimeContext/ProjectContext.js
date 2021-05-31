import React, {useState} from "react";
import axios from "axios";

export {readAllCustomers,readAllProjects};

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