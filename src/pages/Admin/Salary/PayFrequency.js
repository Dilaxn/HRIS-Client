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
import {readAllPayFrequency} from "../../../context/SalaryContext";



const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function PayFrequency() {
    let [payFrequency, setPayFrequency]  = useState([]);
    let [payFrequencyData, setPayFrequencyData]    = useState([]);
    let [r, setR]   = useState(1);

    let history = useHistory()

    useEffect(() => {
        readAllPayFrequency().then(r => setPayFrequencyData(r))
    }, []);


    let details = [];
    if (payFrequencyData) {
        payFrequencyData.map(r => {
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
                let pay_frequencies = x
                console.log(JSON.stringify({pay_frequencies}))
                return axios.delete('/api/pay_frequencies',{
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({pay_frequencies})
                })
                    .then(function (response) {
                        readAllPayFrequency().then(r => setPayFrequencyData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const columns = [
        {
            name: "Pay Frequency",
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
            <PageTitle title="Pay Frequency" />
            <Grid container className={classes.container}>

                <div className={classes.formContainer}>
                    <div className={classes.form}>


                        <React.Fragment>
                            <Typography variant="h4" className={classes.greeting}>
                                Add Pay Frequency
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
                                value={payFrequency}
                                onChange={e => setPayFrequency(e.target.value)}
                                margin="normal"
                                placeholder="Name"
                                type="text"
                                fullWidth
                            />


                            <div className={classes.formButtons}>

                                <Button

                                    disabled={
                                        payFrequency.length === 0
                                    }
                                    onClick={() => {
                                        const tokenString = getToken()
                                        axios.post("/api/pay_frequencies", {
                                                name: payFrequency
                                            },

                                            {
                                                headers: {
                                                    'Authorization': `Bearer ${tokenString}`,
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                            .then(function (response) {

                                                readAllPayFrequency().then(r => setPayFrequencyData(r))
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
                        title="Pay Frequencies"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
