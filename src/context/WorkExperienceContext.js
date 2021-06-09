import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllMyWorkExperience,readAllEmpWorkExperience};

function readAllMyWorkExperience() {
    return Promise.resolve().then(() => {
        return  axios.get('/api/employees/me/work_experiences', {
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

function readAllEmpWorkExperience(props) {
    // console.log(props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('/api/employees/'+empID+'/work_experiences', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log("hello this is work ex")
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}