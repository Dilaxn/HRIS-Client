import React, {useContext, useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import axios from "axios";
import {userDataContext} from "../../tableData/userDataContext";
import {getToken, readAllUsers, readUser, readUserDetails} from "../../../context/UserContext";
import {useHistory} from "react-router";
// import { useUserState } from "../../../context/UserContext";




const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))


//mmmmmmm


let data = []

// alert()
export default function Users() {

  let [userData, setUserData] = useState([]);


    let history = useHistory()

  useEffect(() => {
    readAllUsers().then(r => setUserData(r))
  }, []);
// console.log(userData)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //    userData= readAllUsers()
  // }, []);

  // useEffect(async () => {
  //   await userData();
  // }, []);

  // alert(userData)
  // console.log(userData)

  const details = [];
  if (userData) {

    userData.map(r => {
      const data = [
         r.user_name,
      r.role,
       r.email,
          r.employee._id
     ]
      // alert(r.email + "email")
      details.push(data);
    });
    // alert(details)
  }

    const options = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Assign Supervisor to this employee?");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[3]]
                let leaveD = [x[0]]
                history.push(
                    {
                        pathname: '/app/users/addSupervisor',
                        state: { prop1: leaveD[0] }
                    }
                );
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "EID",
            options: {
                display: true,
            }
        },
        {
            name: "User Role",
            options: {
                display: true,
            }
        },
        {
            name: "E-Mail",
            options: {
                display: true,
            }
        },

        {
            name: "",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];
  const classes = useStyles();
  return (
      <>
        <PageTitle title="System Users"/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MUIDataTable
                title="Employee List"
                data={details}
                columns={columns}
                options={options}
            />

          </Grid>

        </Grid>
      </>
  );
}
