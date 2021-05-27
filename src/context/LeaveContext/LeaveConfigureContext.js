import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllLeaveTypes,readAllHolidays,realLeavePeriod,readAllMyEntitlements,readAllMyEntitlementsleaveType,realAllLeaves,
readMyAllLeaves};

function readAllLeaveTypes() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/leaveTypes', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllMyEntitlements() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/employees/me/entitlements', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function readAllMyEntitlementsleaveType() {
    return Promise.resolve().then(() => {
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/employees/me/entitlements', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.data.leaveType);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
function readAllHolidays() {
    return Promise.resolve().then(() => {
        return  axios.get('/holidays', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.holidays);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function realLeavePeriod() {
    return Promise.resolve().then(() => {
        return  axios.get('/leavePeriods', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

function realAllLeaves() {
    return Promise.resolve().then(() => {
        return axios.get('/leaves/all', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                return (response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}

    function readMyAllLeaves() {
        return Promise.resolve().then(() => {
            return axios.get('/leaves/mine', {
                headers: {
                    Authorization: `Bearer ${tokenString}`,
                },

            })
                .then(response => {
                    // setUserData(response.data);
                    // response.data.dependents.date_of_birth
                    return (response.data.data);
                })
                .catch((err) => {
                    console.log('Unable access ...');
                });

        });
    }