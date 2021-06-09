import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllEmergencyContacts,readAllEmpEmergencyContacts};

function readAllEmergencyContacts() {
    return Promise.resolve().then(() => {
        return  axios.get('/api/employees/me/emergency_contacts/', {
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

function readAllEmpEmergencyContacts(props) {
    console.log(props.props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('/api/employees/'+empID+'/emergency_contacts/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log("hello")
                return(response.data.emergency_contacts);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}