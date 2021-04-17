import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllJobs,readAllPayGrades,readAllEmploymentStatus,readAllJobCategories};

function readAllJobs() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/job_titles', {
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

function readAllPayGrades() {
    return Promise.resolve().then(() => {

        return  axios.get('http://localhost:3001/pay_grades', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },
        })
            .then(response => {
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}


function readAllEmploymentStatus() {
    return Promise.resolve().then(() => {

        return  axios.get('http://localhost:3001/employment_status', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },
        })
            .then(response => {
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllJobCategories() {
    return Promise.resolve().then(() => {

        return  axios.get('http://localhost:3001/job_categories', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },
        })
            .then(response => {
                return(response.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}