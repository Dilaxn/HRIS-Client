import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllMyMemberships,readAllEmpMemberships,readAllMemberships};

function readAllMyMemberships() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/memberships/', {
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

function readAllEmpMemberships(props) {
    let empID= props.props
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/'+empID+'/memberships/', {
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
function readAllMemberships() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/memberships', {
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