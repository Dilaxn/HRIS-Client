import React, { useState, createContext } from 'react';
import axios from 'axios';

export const userDataContext = createContext();

export const userDataContextProvider = function (props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userData, setUserData]  = useState();

    const getUserDetails = async () => {
        // this._validateEmail(email);
        // this._validateStringField('password', password);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        var [userData, setUserData] = useState("");
        const tokenString = localStorage.getItem('id_token');
// alert(tokenString)
        return fetch('http://localhost:3001/users?', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then((response) => {
                setUserData(response.data);
                return (userData)
            })
            .catch((err) => {
                console.log('Unable access ...');
            });
    }

    return (
        <userDataContext.Provider
            value={{
                // eslint-disable-next-line no-undef
                userData,
                getEmployeeReimbursement,
                getManagerReimbursement,
            }}
        >
            {props.children}
        </userDataContext.Provider>
    );
};
