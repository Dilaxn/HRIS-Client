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
import {readAllEmploymentStatus, readAllJobCategories} from "../../../context/JobContext";
import {useHistory} from "react-router";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function JobCategories() {
  let [jobCategory, setJobCategory]  = useState([]);
  let [jobCategoriesData, setJobCategoriesData]   = useState([]);
  let [r, setR]   = useState(1);

  let history = useHistory()

  useEffect(() => {
    readAllJobCategories().then(r => setJobCategoriesData(r))
  }, []);


  let details = [];
  if (jobCategoriesData) {
    jobCategoriesData.map(r => {
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
        let job_categories = x
        console.log(JSON.stringify({job_categories}))
        return axios.delete('/api/job_categories',{
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({job_categories})
        })
            .then(function (response) {
              readAllJobCategories().then(r => setJobCategoriesData(r))
            })
      } else {
        //some code
      }
    },

  };

  const columns = [
    {
      name: "Job Category",
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
      <PageTitle title="Job Category" />
      <Grid container className={classes.container}>

        <div className={classes.formContainer}>
          <div className={classes.form}>


            <React.Fragment>
              <Typography variant="h4" className={classes.greeting}>
                Add Job Category
              </Typography>

              <TextField
                  defaultValue="Reset"
                id="name"
                InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
                value={jobCategory}
                onChange={e => setJobCategory(e.target.value)}
                margin="normal"
                placeholder="Name"
                type="text"
                fullWidth
                />


              <div className={classes.formButtons}>

                <Button

                    disabled={
                      jobCategory.length === 0
                    }
                    onClick={() => {
                      const tokenString = getToken()
                      axios.post("/api/job_categories", {
                            name: jobCategory
                          },

                          {
                            headers: {
                              'Authorization': `Bearer ${tokenString}`,
                              'Content-Type': 'application/json',
                            }
                          })
                          .then(function (response) {

                            readAllJobCategories().then(r => setJobCategoriesData(r))
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
            title="Job Categories"
            data={details}
            columns={columns}
            options={options}
          />
        </Grid>

      </Grid>
    </>
  );
}
