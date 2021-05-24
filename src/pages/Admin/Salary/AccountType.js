import React, {useEffect, useState} from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser} from "../../../context/UserContext";
import axios from "axios";
import {readAllEmploymentStatus, readAllJobCategories} from "../../../context/JobContext";
import {useHistory} from "react-router";
import {readAllAccountTypes} from "../../../context/SalaryContext";



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function AccountType() {
    let [accountType, setAccountType]  = useState([]);
    let [accountTypesData, setAccountTypesData]   = useState([]);
    let [r, setR]   = useState(1);

    let history = useHistory()

    useEffect(() => {
        readAllAccountTypes().then(r => setAccountTypesData(r))
    }, []);


    let details = [];
    if (accountTypesData) {
        accountTypesData.map(r => {
            const data = [
                r.name,
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
                let bank_account_types = x
                console.log(JSON.stringify({bank_account_types}))
                return axios.delete('/bank_account_types',{
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({bank_account_types})
                })
                    .then(function (response) {
                        readAllAccountTypes().then(r => setAccountTypesData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Account Type",
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
            <PageTitle title="Job Category" />
            <Grid container className={classes.container}>

                <div className={classes.formContainer}>
                    <div className={classes.form}>


                        <React.Fragment>
                            <Typography variant="h4" className={classes.greeting}>
                                Add Account Type
                            </Typography>

                            <TextField
                                defaultValue="Reset"
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={accountType}
                                onChange={e => setAccountType(e.target.value)}
                                margin="normal"
                                placeholder="Name"
                                type="text"
                                fullWidth
                            />


                            <div className={classes.formButtons}>

                                <Button

                                    disabled={
                                        accountType.length === 0
                                    }
                                    onClick={() => {
                                        const tokenString = getToken()
                                        axios.post("/bank_account_types", {
                                                name: accountType
                                            },

                                            {
                                                headers: {
                                                    'Authorization': `Bearer ${tokenString}`,
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                            .then(function (response) {

                                                readAllAccountTypes().then(r => setAccountTypesData(r))
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
                        title="Account Types"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
