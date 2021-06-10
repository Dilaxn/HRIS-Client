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
import MenuItem from "@material-ui/core/MenuItem";
const tokenString = localStorage.getItem('id_token');



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))
function PopUpMenu() {
    return (
        <ul className="drop-down">
            <li>Menu-item-1</li>
            <li>Menu-item-2</li>
            <li>Menu-item-3</li>
        </ul>
    );
}

export default function SubordinatesLeaveDays(props) {
    const location = useLocation();
    const [leaveDays, setLeaveDays]  = React.useState([]);
    const [popUpMenu, setPopUpMenu] = React.useState(false);
    let history = useHistory()
    const handleRes = (event) => {
        let empID= event.target.value[2];
        let dataa ={
            "leaveDay":event.target.value[1],
            "action":event.target.value[0]
        }
        console.log(empID)
        axios.patch('/employees/'+empID+'/leaves', dataa, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                alert('Done');

                // console.log(res.data);
            }
        )
            .catch(err => {
                alert("Check your action")
            })
    };
    // let [employeeData, setEmployeeData]  = useState([]);
    //
    // useEffect(() => {
    //     readAllEmployees().then(r => setEmployeeData(r))
    // }, []);

    useEffect(() => {
        if(location.state){
            console.log(props)
            setLeaveDays(location.state.prop1)

        }
        else{
            // alert("yes")
            // console.log("x"+props)
            // setEmpID("604706c638c7f10c93f6c1a7")
        }

    }, [location]);

    let details = [];
    if (leaveDays.length!==0) {
        console.log(leaveDays)
        leaveDays[0].map(r => {
            const data = [
                r.date,
                r.timeFrom,
                r.timeTo,

                <TextField
                    id="outlined-select-currency-native"
                    select


                    label={r.status}
                    onChange={handleRes}
                    helperText="Select action"
                    variant="outlined"
                    style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                    {/*{leavePeriodData.map((option) => (*/}
                    {/*    <MenuItem key={option._id} value={option.leaveTypeName}>*/}
                    {/*        {option.leaveTypeName}*/}
                    {/*    </MenuItem>*/}
                    {/*))}*/}
                    <MenuItem key="0"  value={["approve",r._id,r.employee._id]}> Accept</MenuItem>
                    <MenuItem value={["reject",r._id,r.employee._id]}> Reject</MenuItem>
                    <MenuItem value={["cancel",r._id,r.employee._id]}> Cancel</MenuItem>
                    <MenuItem  value={["pending",r._id,r.employee._id]}> Pending Approval</MenuItem>
                    <MenuItem  value={["schedule",r._id,r.employee._id]}> Schedule</MenuItem>


                </TextField>,
                r._id
            ]
            details.push(data);
        });
    }

    const columns = [
        {
            name: "Date",
            options: {
                display: true,
            }
        },
        {
            name: "Time From",
            options: {
                display: true,
            }
        },
        {
            name: "Time To",
            options: {
                display: true,
            }
        },
        {
            name: "Status",
            options: {
                display: true,
            }
        }
        ,
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
            // var answer = window.confirm("Delete the data");
            setPopUpMenu(!popUpMenu)
            {popUpMenu && PopUpMenu()}
            // if (answer) {
            //     const tokenString = getToken()
            //     let x = [rowData[4]]
            //     let empId = [x[0]]
            // history.push(
            //     {
            //         pathname: 'app/empInfo',
            //         state: { prop1: empId[0] }
            //     }
            //     // );
            // } else {
            //     //some code
            // }
        },

    };

    const classes = useStyles();
    return (
        <>
            <PageTitle title="Employees" />
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
