import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllCountries};

function readAllCountries() {
    return Promise.resolve().then(() => {
        return  axios.get('/api/countries/all', {
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