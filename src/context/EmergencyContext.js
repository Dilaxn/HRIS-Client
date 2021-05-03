import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllEmergencyContacts};

function readAllEmergencyContacts() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/emergency_contacts/', {
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