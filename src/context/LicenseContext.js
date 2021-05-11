import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllLicences, readAllMyLicenses,readAllEmpLicenses};

function readAllMyLicenses() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/licenses', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.licenses);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllLicences() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/licenses', {
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

function readAllEmpLicenses(props) {
    console.log(props.props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('http://localhost:3001/employees/'+empID+'/licenses/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log("hello")
                return(response.data.licenses);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}