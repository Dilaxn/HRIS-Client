import React, {useState} from "react";
import axios from "axios";

export {readAllTimeSheetWeeks};

function readAllTimeSheetWeeks() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/timeSheetWeeks', {
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