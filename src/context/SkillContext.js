import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllSkills, readAllMySkills};

function readAllMySkills() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/skills', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.skills);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllSkills() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/skills', {
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