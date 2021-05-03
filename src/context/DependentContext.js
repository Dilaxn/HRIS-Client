import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllMyDependents};

function readAllMyDependents() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/dependents/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.dependents);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}