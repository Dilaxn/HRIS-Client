import React, {useEffect, useState} from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import {getToken, loginUser} from "../../../context/UserContext";
import axios from "axios";
import {readAllEmploymentStatus} from "../../../context/JobContext";
import {useHistory, useLocation} from "react-router";
import {readAllProProjectActivities} from "../../../context/TimeContext/ProjectContext";



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function AddProjectActivity(props) {
    let [employmentStatus, setEmploymentStatus]  = useState('');
    let [employmentStatusData, setEmploymentStatusData]  = useState([]);
    const location = useLocation();

    let [proActivityData, setProActivityData]   = useState([]);
    const [empID, setEmpID] = React.useState('');
    const [gID, setGID] = React.useState('');

    useEffect(() => {
        if(location.state){
            setEmpID(location.state.prop1)
            setGID(location.state.prop1)
        }
        else{
            // alert("yes")
            // console.log("x"+props)
            // setEmpID("604706c638c7f10c93f6c1a7")
        }

    }, [location]);

    let history = useHistory()

    useEffect(() => {
        readAllProProjectActivities(empID).then(r=>setProActivityData(r))
        readAllEmploymentStatus().then(r => setEmploymentStatusData(r))
    }, ["/app/admin/job/employmentStatus"]);


    let details = [];
    if (proActivityData) {
        proActivityData.map(r => {
            const data = [
                r.activityName,
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
                let employment_statuses = x
                console.log(JSON.stringify({employment_statuses}))
                return axios.delete('/projects/'+empID+'/activities', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: {id: x}
                })
                    .then(function (response) {
                        readAllProProjectActivities(empID).then(r => setProActivityData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Employment Status",
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
            <PageTitle title="Project Activity" />
            <Grid container className={classes.container}>

                <div className={classes.formContainer}>
                    <div className={classes.form}>


                        <React.Fragment>
                            <Typography variant="h4" className={classes.greeting}>
                                Add Project Activity
                            </Typography>

                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={employmentStatus}
                                onChange={e => setEmploymentStatus(e.target.value)}
                                margin="normal"
                                placeholder="Name"
                                type="text"
                                fullWidth
                            />


                            <div className={classes.formButtons}>
                                <Button
                                    disabled={
                                        employmentStatus.length === 0
                                    }
                                    onClick={() => {
                                        const tokenString = getToken()
                                        axios.post("/projects/"+empID+"/projectActivities", {
                                                activityName: employmentStatus
                                            },
                                            {
                                                headers: {
                                                    'Authorization': `Bearer ${tokenString}`,
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                            .then(function (response) {
                                                setEmploymentStatus("")
                                                alert("Successfully Added")
                                                readAllProProjectActivities(empID).then(r=>setProActivityData(r))
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
                        title="Project Activity"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
