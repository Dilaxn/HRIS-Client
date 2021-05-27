// import React, {useState} from "react";
// import axios from "axios";
//
// export {readAllAttendance};
//
// function readAllAttendance() {
//     return Promise.resolve().then(() => {
//         const tokenString = localStorage.getItem('id_token');
//         return  axios.get('/attendance/all', {
//             headers: {
//                 Authorization: `Bearer ${tokenString}`,
//             },
//
//         })
//             .then(response => {
//                 // setUserData(response.data);
//                 // response.data.dependents.date_of_birth
//                 return(response.data);
//             })
//             .catch((err) => {
//                 console.log('Unable access ...');
//             });
//
//     });
// }