import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllMyDependents,readAllEmpDependents};

function readAllMyDependents() {
    return Promise.resolve().then(() => {
        return  axios.get('/employees/me/dependents/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.dependents);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}


function readAllEmpDependents(props) {
    let empID= props.props
    return Promise.resolve().then(() => {
        return  axios.get('/employees/'+empID+'/dependents/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.dependents);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}