import React, {useState} from "react";
import axios from "axios";



export { readAuth};

function readAuth() {
    const tokenString = localStorage.getItem('id_token');
    return Promise.resolve().then(() => {
        console.log("auth")
        return  axios.get('/api/employees/me/subordinates', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                console.log(response.data.subordinates.length)
                // setUserData(response.data);
                return (response.data.subordinates.length);
            })
            .catch((err) => {
                console.log('Unable access ...');
                return false;
            });

    });
}