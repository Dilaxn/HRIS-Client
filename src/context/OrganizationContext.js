import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readOrgDetail,readAllLocations,readAllEducations,readAllLanguages,readAllLicenses,readAllMemberships,readAllSkills};

function readOrgDetail() {
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

function readAllLocations() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/locations?', {
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
function readAllEducations() {
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
function readAllSkills() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/skills', {
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
function readAllLicenses() {
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
function readAllLanguages() {
    return Promise.resolve().then(() => {
        return  axios.get('http://localhost:3001/languages', {
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