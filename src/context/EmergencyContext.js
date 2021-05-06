import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllEmergencyContacts,readAllEmpEmergencyContacts};

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

function readAllEmpEmergencyContacts(props) {
    console.log(props.props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('http://localhost:3001/employees/'+empID+'/emergency_contacts/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.emergency_contacts);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}