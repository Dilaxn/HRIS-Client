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
import {readAllUsers, readUser, readUserDetails} from "../../../context/UserContext";
// import { useUserState } from "../../../context/UserContext";
const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];





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
     ]
      // alert(r.email + "email")
      details.push(data);
    });
    // alert(details)
  }


  const classes = useStyles();
  return (
      <>
        <PageTitle title="System Users"/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MUIDataTable
                title="Employee List"
                data={details}
                columns={["EID", "User Role", "E-mail"]}
                options={{
                  filterType: "checkbox",
                }}
            />

          </Grid>

        </Grid>
      </>
  );
}
