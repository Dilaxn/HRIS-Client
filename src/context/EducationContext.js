import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllMyEducations, readAllLevels,readAllEmpEducations};

function readAllMyEducations() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/employees/me/education', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.educations);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllLevels() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/education_levels', {
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
function readAllEmpEducations(props) {
    console.log(props.props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('http://localhost:3001/employees/'+empID+'/education/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log("hello")
                return(response.data.educations);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}