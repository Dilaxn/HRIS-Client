import React, {useEffect, useState} from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link,useLocation} from 'react-router-dom'
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
import {readAllEmployees} from "../../../context/EmployeeContext";
import {readAllMyEducations} from "../../../context/EducationContext";



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Employees() {

  let history = useHistory()
  let [employeeData, setEmployeeData]  = useState([]);

  useEffect(() => {
    readAllEmployees().then(r => setEmployeeData(r))
  }, []);


  let details = [];
  if (employeeData) {
    employeeData.map(r => {
      const data = [
        r.employee_id,
        r.first_name,
          r.last_name,
          r.job,
          r.supervisors.length,
          r._id
      ]
      details.push(data);
    });
  }

  const columns = [
    {
      name: "Emp ID",
      options: {
        display: true,
      }
    },
    {
      name: "First Name",
      options: {
        display: true,
      }
    },
    {
      name: "Last Name",
      options: {
        display: true,
      }
    },
    {
      name: "Job Title",
      options: {
        display: true,
      }
    },{
      name: "No Of Supervisors",
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
  const options = {
    filterType: "checkbox",
    selectableRowsOnClick: false,
    onRowsDelete: async (rowsDeleted, dataRows) => {
    },
    onRowClick: async (rowData) => {
      var answer = window.confirm("Delete the data");
      if (answer) {
        const tokenString = getToken()
        let x = [rowData[5]]
        let empId = [x[0]]
        history.push(
        {
          pathname: 'app/empInfo',
            state: { prop1: empId[0] }
        }
        );
      } else {
        //some code
      }
    },

  };

  const classes = useStyles();
  return (
      <>
        <PageTitle title="Employees" />
        <Grid container className={classes.container}>

          <div className={classes.formContainer}>
            <div className={classes.form}>


              <React.Fragment>
                <Typography variant="h4" className={classes.greeting}>
                  Add Employee
                </Typography>



                <div className={classes.formButtons}>
                  <Button
                      onClick={() => {
                        history.push({
                          pathname: '/app/pim/addEmployee'
                        });
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
                title="Employees"
                data={details}
                columns={columns}
                options={
                  options
                }
            />
          </Grid>

        </Grid>
      </>
  );
}
