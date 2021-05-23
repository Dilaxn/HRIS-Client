import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
import {useHistory} from "react-router";

// components
import PageTitle from "../../components/PageTitle";

// data
// import mock from "../../dashboard/mock";
import {getToken, loginUser, readAllUsers} from "../../context/UserContext";
import {readAllJobs} from "../../context/JobContext";
import axios from "axios";
import {readAllVacancies} from "../../context/VacancyContext";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function JobVacancies() {
    let [vacancyData, setVacancyData]  = useState([]);

    let history = useHistory()

    useEffect(() => {
        readAllVacancies().then(r => setVacancyData(r))
    }, []);


    const details = [];
    if (vacancyData) {




        vacancyData.map(r => {
            const data = [
                r.vacancy_title,
                r.hiring_manager,
                r.vacancy_description,
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
                let vacancies = [x[0]]
                console.log(JSON.stringify({vacancies}))
                return axios.delete('/vacancies', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({vacancies})
                })
                    .then(function (response) {
                        readAllVacancies().then(r => setVacancyData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Vacancy Title",
            options: {
                display: true,
            }
        },
        {
            name: "Hiring Manager",
            options: {
                display: true,
            }
        },
        {
            name: "Vacancy Description",
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
            <PageTitle title="Add Vacancy"/>
            <Link to="/app/recruitment/addjobvacancies">
                <Button type="button">
                    Add Job Vacancy
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
