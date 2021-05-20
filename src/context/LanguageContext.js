import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllLanguages, readAllLanguageCompetency,readAllLanguageFluency,readAllMyLanguages,readAllEmpLanguages};

function readAllMyLanguages() {
    return Promise.resolve().then(() => {
        return  axios.get('/employees/me/languages', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                return(response.data.languages);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllLanguages() {
    return Promise.resolve().then(() => {
        return  axios.get('/languages', {
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
function readAllLanguageFluency() {
    return Promise.resolve().then(() => {
        return  axios.get('/language_fluency', {
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
function readAllLanguageCompetency() {
    return Promise.resolve().then(() => {
        return  axios.get('/language_competencies', {
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
function readAllEmpLanguages(props) {
    console.log(props.props)
    let empID= props.props
    return Promise.resolve().then(() => {
        console.log(tokenString)
        return  axios.get('/employees/'+empID+'/languages/', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                console.log("hello")
                return(response.data.languages);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}