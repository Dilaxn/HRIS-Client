import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllLeaveTypes,readAllHolidays};

function readAllLeaveTypes() {
    return Promise.resolve().then(() => {
        return  axios.get('/leaveTypes', {
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

function readAllHolidays() {
    return Promise.resolve().then(() => {
        return  axios.get('/holidays', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.holidays);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}