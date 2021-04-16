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

export default function Users() {
    let [jobData, setJobData] = useState([]);

    let history = useHistory()

    useEffect(() => {
        readAllJobs().then(r => setJobData(r))
    }, ["/app/admin/job/jobTitles"]);


    const details = [];
    if (jobData) {

        jobData.map(r => {
            const data = [
                r.job_title,
                r.job_description,
                r._id
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
                return axios.delete('http://localhost:3001/job_titles', {
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
            name: "Job Title",
            options: {
                display: true,
            }
        },
        {
            name: "Description",
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
            <PageTitle title="Add Job Title"/>
            <Link to="/app/admin/job/jobTitlesAdd">
                <Button type="button">
                    Add Job Title
                </Button>
            </Link>
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
