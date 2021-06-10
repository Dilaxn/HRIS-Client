import React, {useState} from "react";
import axios from "axios";



export { countAllEmployees,readAllEmployees};

function countAllEmployees() {
    const tokenString = localStorage.getItem('id_token');
    return Promise.resolve().then(() => {
        return  axios.get('/employees', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.length);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllEmployees() {
    const tokenString = localStorage.getItem('id_token');
    return Promise.resolve().then(() => {
        return  axios.get('/employees', {
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
