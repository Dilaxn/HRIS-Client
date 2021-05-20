import React, {useState} from "react";
import axios from "axios";

export { readAllChats};

function readAllChats() {
    return Promise.resolve().then(() => {
        return  axios.get('/chats', {

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