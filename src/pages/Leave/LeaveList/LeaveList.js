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
import {realAllLeaves} from "../../../context/LeaveContext/LeaveConfigureContext";



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function LeaveList() {

    let history = useHistory()
    let [employeeData, setEmployeeData]  = useState([]);
    let [leaveData, setLeaveData]   = useState([]);


    useEffect(() => {
        realAllLeaves().then(value => setLeaveData(value))
    }, ['']);


    let details = [];
    let leaveDayData=[];
    if (leaveData) {
        leaveData.reverse().map(r => {
            const data = [
                r.startDay,
                r.endDate,
                r.entitlement.employee.first_name,
                (r.entitlement.entitlement-r.entitlement.leaveTaken),
                r.entitlement.leaveType.leaveTypeName,
                r.comment,
                r.leaveDays,
                r._id
            ]
            // setLeaveDays(r.leaveDays)
            leaveDayData.push(r.leaveDays);
            details.push(data);
        });
    }

    const columns = [
        {
            name: "Start Day",
            options: {
                display: true,
            }
        },
        {
            name: "End Day",
            options: {
                display: true,
            }
        },
        {
            name: "Employee Name",
            options: {
                display: true,
            }
        },
        {
            name: "Leave Balance",
            options: {
                display: true,
            }
        },{
            name: "Leave Type",
            options: {
                display: true,
            }
        },
        {
            name: "Comment",
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
            var answer = window.confirm("Take action");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[6]]
                let leaveD = [x[0]]
                history.push(
                    {
                        pathname: '/app/leave/leaveDays',
                        state: { prop1: leaveD }
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
            <PageTitle title="Leave List" />
            <Grid container className={classes.container}>

                <div className={classes.formContainer}>
                    <div className={classes.form}>



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
