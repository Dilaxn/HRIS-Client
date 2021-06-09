import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readOrgDetail,readAllLocations,readAllEducations,readAllLanguages,readAllLicenses,readAllMemberships,readAllSkills,readAllNationalities};

function readOrgDetail() {
    return Promise.resolve().then(() => {
        return  axios.get('/api/job_titles', {
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
        return  axios.get('/api/locations?', {
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
        return  axios.get('/api/education_levels', {
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
        return  axios.get('/api/skills', {
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
        return  axios.get('/api/licenses', {
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
        return  axios.get('/api/languages', {
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
        return  axios.get('/api/memberships', {
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

function readAllNationalities() {
    return Promise.resolve().then(() => {
        return  axios.get('/api/nationalities', {
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