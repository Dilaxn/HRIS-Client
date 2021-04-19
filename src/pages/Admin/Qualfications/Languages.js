import React, {useEffect, useState} from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser} from "../../../context/UserContext";
import axios from "axios";
import {readAllEmploymentStatus, readAllJobs, readAllPayGrades} from "../../../context/JobContext";
import {useHistory} from "react-router";
import {readAllLanguages} from "../../../context/OrganizationContext";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function EmploymentStatus() {
  let [language, setLanguage]  = useState([]);
  let [languageData, setLanguageData]  = useState([]);

  useEffect(() => {
    readAllLanguages().then(r => setLanguageData(r))
  }, ["/app/admin/job/employmentStatus"]);


  let details = [];
  if (languageData) {
    languageData.map(r => {
      const data = [
        r.name,
        r._id
      ]
      details.push(data);
    });
  }

  const options = {
    filterType: "checkbox",
    selectableRowsOnClick: false,
    onRowsDelete: async (rowsDeleted, dataRows) => {
      console.log(rowsDeleted)
    },
    onRowClick: false,

  };

  const columns = [
    {
      name: "Language",
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
        <PageTitle title="Education" />
        <Grid container className={classes.container}>

          <div className={classes.formContainer}>
            <div className={classes.form}>


              <React.Fragment>



                <div className={classes.formButtons}>


                </div>
              </React.Fragment>


            </div>

          </div>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <MUIDataTable
                title="Employement Status"
                data={details}
                columns={columns}
                options={options}
            />
          </Grid>

        </Grid>
      </>
  );
}
