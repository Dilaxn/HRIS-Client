import React, {useState} from "react";
import axios from "axios";
import {res} from "react-email-validator";
import {useHistory} from "react-router";
import Login from "../pages/login";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };

    default: {

      return Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut,readUser ,readUserRole,readUserDetails,readAllUsers,getToken};

function loginUser(dispatch, user_name, password, history, setIsLoading, setError) {

  return Promise.resolve().then(() => {
    // this._validateEmail(email);
    // this._validateStringField('password', password);

    return fetch(`http://localhost:3001/users/login`,{
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        // alert("res= "+res)
        if (res.status === 200) {
          return res;
        }
        else{
        // alert("Invalid ID or password")

        }
//
//          res.json().then(({ message }) => {
//           // dispatch({ type: "LOGIN_FAILURE" });
//           setError(true);
//           setIsLoading(false);
// history.push('/')
//           // throw Error(message);
//
//
//         });
      })
      .then(res => res.json())
      .then(({user, token}) => {
        // alert(token)
        setTimeout(() => {
          localStorage.setItem('id_token', token)
          localStorage.setItem('id_user', user._id)
          localStorage.setItem('userRole', user.role)
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })

          history.push({
            pathname: '/app/dashboard'
          });
        })

        return true;
      })
        .catch(err => {


          setError(true);
     setIsLoading(false);
          alert("Invalid ID or password")
          history.push({
            pathname: '/'
          });
          return false;
        })
  });
}

function getToken() {
  const tokenString = localStorage.getItem('id_token');
  return tokenString
}


function readUser() {
  return Promise.resolve().then(() => {
    // this._validateEmail(email);
    // this._validateStringField('password', password);

    const tokenString = localStorage.getItem('id_token');
// alert(tokenString)
    return  fetch('http://localhost:3001/employees/me/personal_detail', {
      headers: {
        Authorization: `Bearer ${tokenString}`,
      },

    })
      .then(res => {

        if (res.status === 200) {

          return res;
        }

      })
      .then(res => res.json())
      .then(({first_name,_id}) => {
        // alert(first_name)


        return first_name;
      });

  });
}

function readUserDetails() {
  return Promise.resolve().then(() => {
    // this._validateEmail(email);
    // this._validateStringField('password', password);

    const tokenString = localStorage.getItem('id_token');
// alert(tokenString)
    return fetch('http://localhost:3001/employees/me/user_detail', {
      headers: {
        Authorization: `Bearer ${tokenString}`,
      },

    })
        .then((response) => {

          if (response.status === 200) {

            return response;
          }

        })
        .then(response => response.json())
        .then(({user_name,_id,email}) => {
          // alert("em: "+ email)


          return ({user_name,_id,email});
        })
        .catch((err) => {
          console.log('Unable access ...');
        });


  });
}

function readAllUsers() {
  return Promise.resolve().then(() => {
    // this._validateEmail(email);
    // this._validateStringField('password', password);
    // let [userData, setUserData]  = useState([]);
    const tokenString = localStorage.getItem('id_token');
// alert(tokenString)
    return  axios.get('http://localhost:3001/users?', {
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


function readUserRole() {
  return Promise.resolve().then(() => {
    // this._validateEmail(email);
    // this._validateStringField('password', password);
    const tokenString = localStorage.getItem('id_token');
    const uid = localStorage.getItem("id_user");
    // alert(uid)
    return  fetch("http://localhost:3001/users/"+uid,{
      headers: {
        Authorization: `Bearer ${tokenString}`,
      },

    })
      .then(res => {

        if (res.status === 200) {

          return res;
        }

      })
      .then(res => res.json())
      .then(({role,_id}) => {
        // alert(role)
        localStorage.setItem('role', role)
        localStorage.setItem('uuid', _id)
return role;
      });

  });
}


function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("uuid");
  localStorage.removeItem("role");
  localStorage.removeItem("uid");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
