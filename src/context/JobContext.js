import React, {useState} from "react";
import axios from "axios";


export { readAllJobs};

function readAllJobs() {
    return Promise.resolve().then(() => {
        // this._validateEmail(email);
        // this._validateStringField('password', password);

        const tokenString = localStorage.getItem('id_token');
// alert(tokenString)
        return  axios.get('http://localhost:3001/job_titles', {
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
