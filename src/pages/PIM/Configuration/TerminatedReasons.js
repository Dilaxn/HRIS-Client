import React, {useEffect, useState} from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";
import {getToken, loginUser} from "../../../context/UserContext";

// data
import mock from "../../dashboard/mock";
import axios from "axios";
import {readAllJobCategories} from "../../../context/JobContext";
import {readAllReportingMethods} from "../../../context/ReportingMethodContext";
import {readAllTerminatedReasons} from "../../../context/TerminatedReasonsContext";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function ReportingMethods() {
  let [terminationReason, setTerminationReason]   = useState('');
  let [terminationReasonData, setTerminationReasonData]   = useState([]);

  var [datatableData, setDatatableData] = useState([
    ["Joe James"],

    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],
    ["Joe James"],

  ]);
  useEffect(() => {
    readAllTerminatedReasons().then(r => setTerminationReasonData(r))
  }, []);
  const tokenString = getToken()
  const classes = useStyles();
  let details = [];
  if (terminationReasonData) {
    terminationReasonData.map(r => {
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
        let termination_reasons = x
        console.log(JSON.stringify({termination_reasons}))
        return axios.delete('http://localhost:3001/termination_reasons', {
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({termination_reasons})
        })
            .then(function (response) {
              readAllTerminatedReasons().then(r => setTerminationReasonData(r))
            })
      } else {
        //some code
      }
    },

  };

  const columns = [
    {
      name: "Reporting Method",
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


  return (
      <>
        <PageTitle title="Job Category" />
        <Grid container className={classes.container} >

          <div className={classes.formContainer}>
            <div className={classes.form}>


              <React.Fragment>
                <Typography variant="h4" className={classes.greeting}>
                  Add Job Category
                </Typography>
                {/*<Button size="large" className={classes.googleButton}>*/}
                {/*  <img src={google} alt="google" className={classes.googleIcon} />*/}
                {/*  &nbsp;Sign in with Google*/}
                {/*</Button>*/}
                {/*<div className={classes.formDividerContainer}>*/}
                {/*  <div className={classes.formDivider} />*/}
                {/*  <Typography className={classes.formDividerWord}>or</Typography>*/}
                {/*  <div className={classes.formDivider} />*/}
                {/*</div>*/}

                <TextField
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={terminationReason}
                    onChange={e => setTerminationReason(e.target.value)}
                    margin="normal"
                    placeholder="Name"
                    type="text"
                    fullWidth
                />


                <div className={classes.formButtons}>

                  <Button

                      onClick={() => {
                        console.log(terminationReason)
                        axios.post("http://localhost:3001/termination_reasons/", {
                              name: terminationReason
                            },
                            {
                              headers: {
                                'Authorization': `Bearer ${tokenString}`,
                                'Content-Type': 'application/json',
                              }
                            })
                            .then(function (response) {

                              readAllTerminatedReasons().then(r => setTerminationReasonData(r))
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
