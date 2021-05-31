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
import {readAllCustomers, readAllProjects} from "../../../context/TimeContext/ProjectContext";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Projects() {
    let [proData, setProData] = useState([]);

    let history = useHistory()

    useEffect(() => {
        readAllProjects().then(r => setProData(r))
    }, []);


    const details = [];
    if (proData) {




        proData.map(r => {
            let x=''
            const data = [
                r.projectName,
                r.customerName.customerName,
                r.projectAdmin.map(r=>r.join(" ,")),
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
                let x = [rowData[3]]
                let id = [x[0]]
                console.log(JSON.stringify({id}))
                return axios.delete('/projects', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({id})
                })
                    .then(function (response) {
                        readAllProjects().then(r => setProData(r))
                    })
            } else {
                //some code
            }
        },

    };


    const columns = [
        {
            name: "Project Name",
            options: {
                display: true,
            }
        },
        {
            name: "Customer Name",
            options: {
                display: true,
            }
        },
        {
            name: "Project Admins",
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
            <PageTitle title="Add Project"/>
            <Link to="/app/time/projectInfo/addProject">
                <Button  variant="contained" color="primary" style={{margin: 20}} type="button">
                    Add Project
                </Button>
            </Link>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Projects"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
