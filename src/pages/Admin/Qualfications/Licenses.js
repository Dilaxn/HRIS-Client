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
import {readAllEducations, readAllLicenses} from "../../../context/OrganizationContext";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function License() {
  let [license, setLicense]  = useState([]);
  let [licenseData, setLicenseData]  = useState([]);

  useEffect(() => {
    readAllLicenses().then(r => setLicenseData(r))
  }, ["/app/admin/job/employmentStatus"]);


  let details = [];
  if (licenseData) {
    licenseData.map(r => {
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
        let licenses = x
        console.log(JSON.stringify({licenses}))
        return axios.delete('/licenses', {
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({licenses})
        })
            .then(function (response) {
              readAllLicenses().then(r => setLicenseData(r))
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
        <PageTitle title="License" />
        <Grid container className={classes.container}>

          <div className={classes.formContainer}>
            <div className={classes.form}>


              <React.Fragment>
                <Typography variant="h4" className={classes.greeting}>
                  Add License
                </Typography>

                <TextField
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={license}
                    onChange={e => setLicense(e.target.value)}
                    margin="normal"
                    placeholder="Name"
                    type="text"
                    fullWidth
                />


                <div className={classes.formButtons}>
                  <Button
                      disabled={
                        license.length === 0
                      }
                      onClick={() => {
                        const tokenString = getToken()
                        axios.post("/licenses", {
                              name: license
                            },
                            {
                              headers: {
                                'Authorization': `Bearer ${tokenString}`,
                                'Content-Type': 'application/json',
                              }
                            })
                            .then(function (response) {
                              readAllLicenses().then(r => setLicenseData(r))
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
                title="License"
                data={details}
                columns={columns}
                options={options}
            />
          </Grid>

        </Grid>
      </>
  );
}
