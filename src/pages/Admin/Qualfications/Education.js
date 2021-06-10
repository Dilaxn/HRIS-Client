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
import {readAllEducations} from "../../../context/OrganizationContext";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Education() {
  let [education, setEducation]  = useState([]);
  let [educationData, setEducationData]  = useState([]);

  useEffect(() => {
    readAllEducations().then(r => setEducationData(r))
  }, ["/app/admin/job/employmentStatus"]);


  let details = [];
  if (educationData) {
    educationData.map(r => {
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
    onRowClick: async (rowData) => {
      var answer = window.confirm("Delete the data");
      if (answer) {
        const tokenString = getToken()
        let x = [rowData[1]]
        let education_levels = x
        console.log(JSON.stringify({education_levels}))
        return axios.delete('/education_levels', {
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({education_levels})
        })
            .then(function (response) {
              readAllEmploymentStatus().then(r => setEducationData(r))
            })
      } else {
        //some code
      }
    },

  };

  const columns = [
    {
      name: "Education",
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
                <Typography variant="h4" className={classes.greeting}>
                  Add Education
                </Typography>

                <TextField
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={education}
                    onChange={e => setEducation(e.target.value)}
                    margin="normal"
                    placeholder="Name"
                    type="text"
                    fullWidth
                />


                <div className={classes.formButtons}>
                  <Button
                      disabled={
                        education.length === 0
                      }
                      onClick={() => {
                        const tokenString = getToken()
                        axios.post("/education_levels", {
                              name: education
                            },
                            {
                              headers: {
                                'Authorization': `Bearer ${tokenString}`,
                                'Content-Type': 'application/json',
                              }
                            })
                            .then(function (response) {
                              readAllEducations().then(r => setEducationData(r))
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
                      }
                      }
                      variant="contained"
                      color="primary"
                      size="large"
                  >
                    Add
                  </Button>

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
