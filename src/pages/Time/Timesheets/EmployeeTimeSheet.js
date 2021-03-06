import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
import {useHistory} from "react-router";

// components
import PageTitle from "../../../components/PageTitle";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser, readAllUsers} from "../../../context/UserContext";
import {readAllJobs} from "../../../context/JobContext";
import axios from "axios";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))
const tokenString = localStorage.getItem('id_token');

export default function EmployeeTimeSheet() {
    let [jobData, setJobData] = useState([]);
    let [apData, setApData] = useState([]);

    let history = useHistory()

    useEffect(() => {
        readAllJobs().then(r => setJobData(r))
        return  axios.get('/subordinates/timeSheets', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                setApData(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });
    }, []);


    const details = [];
    if (apData) {




        apData.map(r => {
            const data = [
                r.actions[0].action,
                r.actions[0].performedBy.first_name,
                r.actions[0].dateOfAction.slice(0, 10),
                r.actions[0].comment,
                r.actions[0]._id
            ]
            details.push(data);
        });
    }

    const options = {
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[2]]
                let job_titles = [x[0]]
                console.log(JSON.stringify({job_titles}))
                return axios.delete('/job_titles', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({job_titles})
                })
                    .then(function (response) {
                        readAllJobs().then(r => setJobData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Action",
            options: {
                display: true,
            }
        },
        {
            name: "Performed By",
            options: {
                display: true,
            }
        },
        {
            name: "Date",
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
    ];


    const classes = useStyles();
    return (
        <>
            <PageTitle title="SubOrdinate TimeSheets"/>

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Employee List"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
