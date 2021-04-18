import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { countAllEmployees};

function countAllEmployees() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees', {
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