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
import {readAllCustomers} from "../../../context/TimeContext/ProjectContext";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Users() {
    let [customerData, setCustomerData] = useState([]);

    let history = useHistory()

    useEffect(() => {
        readAllCustomers().then(r => setCustomerData(r))
    }, []);


    const details = [];
    if (customerData) {




        customerData.map(r => {
            const data = [
                r.customerName,
                r.description,
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
                let id = [x[0]]
                console.log(JSON.stringify({id}))
                return axios.delete('/customers', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({id})
                })
                    .then(function (response) {
                        readAllCustomers().then(r => setCustomerData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Customer",
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
            <PageTitle title="Add Customer"/>
            <Link to="/app/time/projectInfo/addCustomer">
                <Button  variant="contained" color="primary" style={{margin: 20}} type="button">
                    Add Customer
                </Button>
            </Link>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Customers"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
