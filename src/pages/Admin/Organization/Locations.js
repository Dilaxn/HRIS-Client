import React, {useEffect, useState} from "react";
import {Button, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser} from "../../../context/UserContext";
import {readAllJobs} from "../../../context/JobContext";
import {readAllLocations} from "../../../context/OrganizationContext";
import axios from "axios";

const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Locations() {
    let [locationData, setLocationData] = useState([]);
    useEffect(() => {
        readAllLocations().then(r => setLocationData(r))
    }, []);
    const details = [];
    if (locationData) {
        locationData.map(r => {
            const data = [
                r.name,
                r.city,
                r.country.name,
                r.phone,
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
                let x = [rowData[4]]
                let locations = [x[0]]
                 console.log(JSON.stringify({rowData}))
                return axios.delete('http://localhost:3001/location', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({locations})
                })
                    .then(function (response) {
                        readAllLocations().then(r => setLocationData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "name",
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
            name: "Phone",
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
            <PageTitle title="Locations"/>
            <Link to="/app/admin/organization/locationsadd">
                <Button type="button">
                    Add Location
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
