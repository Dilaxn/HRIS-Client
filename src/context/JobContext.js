import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export { readAllJobs,readAllPayGrades,readAllEmploymentStatus,readAllJobCategories,readAllWorkShifts,readUnassignedEmployees};

function readAllJobs() {
    return Promise.resolve().then(() => {
        return  axios.get('/job_titles', {
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

        return  axios.get('/pay_grades', {
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

        return  axios.get('/employment_status', {
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

        return  axios.get('/job_categories', {
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

function readAllWorkShifts() {
    return Promise.resolve().then(() => {

        return  axios.get('/work_shifts', {
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

function readUnassignedEmployees() {
    return Promise.resolve().then(() => {
        let arr=[]
        return  axios.get('/employees', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },
        })
            .then(response => {
                let no=0
                response.data.map(r => {
                    console.log("r"+r.first_name)
let ar=[]
                    ar.push(r.first_name)

                    return  axios.get('/employees/work_shifts/'+r._id, {
                        headers: {
                            Authorization: `Bearer ${tokenString}`,
                        },
                    })
                        .then(res=>{
                            if(res.status===200){
                            ar.push(r._id,true,no)}
                            else{
                                ar.push(r._id,false,no)
                            }
                            arr.push(ar)
                            no+=1;
                        })

                        .catch(err =>{
                            ar.push(r._id,false,no)
                            arr.push(ar)
                            no+=1;
                    })
                });
                console.log(arr)
                return arr;
            })
            .catch((err) => {
                console.log('Unable access ...');
            });
    });
}