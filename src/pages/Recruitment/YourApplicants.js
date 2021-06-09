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
import {getToken, loginUser, readAllUsers, readUser, readUserDetails, readUserId} from "../../context/UserContext";
import {readAllJobs} from "../../context/JobContext";
import axios from "axios";
import {readAllVacancies} from "../../context/VacancyContext";
import {readAllApplicants} from "../../context/ApplicantContext";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function YourApplicants() {
    let [applicantData, setApplicantData]  = useState([]);
    let [myId, setMyId]  = useState('');

    let history = useHistory()

    useEffect(() => {
        readAllApplicants().then(r => setApplicantData(r))
        readUserId().then(r=> {
            setMyId(r)
            console.log(r)
        })

    }, []);



    const details = [];
    if (applicantData) {




        applicantData.map(r => {
            const data = [
                r.first_name,
                r.last_name,
                r.city,
                r.country,
                r.email,
                r.phone,
                r.description,
                r.hiring_manager,
                r.manager_id,
                r._id
            ]
            if(r.manager_id === myId){
            details.push(data);}
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
                let x = [rowData[9]]
                let applicants = [x[0]]
                console.log(JSON.stringify({applicants}))
                return axios.delete('/api/applicant', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({applicants})
                })
                    .then(function (response) {
                        readAllApplicants().then(r => setApplicantData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
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
            name: "City",
            options: {
                display: true,
            }
        },
        {
            name: "Country",
            options: {
                display: true,
            }
        },
        {
            name: "Email",
            options: {
                display: true,
            }
        },
        {
            name: "Phone",
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
            name: "Hiring Manager",
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


    const classes = useStyles();
    return (
        <>
            <PageTitle title="Details of All Applicants"/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Applicant List"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
