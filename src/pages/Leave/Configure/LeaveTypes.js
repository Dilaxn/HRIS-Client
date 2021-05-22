import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";

import axios from "axios";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from "@material-ui/core/MenuItem";
import {useHistory} from "react-router";
import {readAllMyDependents} from "../../../context/DependentContext";
import {getToken} from "../../../context/UserContext";
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

export default function LeaveTypes(props) {
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [relationship, setRelationship]  = useState("");
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09');
    const handleDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setDate_of_birth(dat);
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }

    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllMyDependents().then(r => setDependentsData(r))
    }, [""]);
    let details = [];
    console.log(dependentsData)
    if (dependentsData) {
        dependentsData.map(y => {
            const data = [
                y.name,
                y._id
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
                let x = [rowData[3]]
                let pay_grades = x
                console.log(x)
                return axios.delete('/employees/me/dependents/'+x, {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(function (response) {
                        readAllMyDependents().then(r => setDependentsData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "ID",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];



    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div >
            <fieldset>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div container style={{marginTop: "50px",width:"50%",margin:"auto"}}>
                <form>
                    {!showForm && (
                        <Button style={{
                            margin: 'auto',
                            width: "100%",
                            align: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'

                        }} onClick={showF} variant="contained" color="primary"> Add Leave Type</Button>)}
                    {showForm && (
                        <Button style={{
                            margin: 'auto',
                            width: "100%",
                            align: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'
                        }} onClick={showF} variant="contained" color="primary">  Cancel</Button>)}
                </form>

                {showForm && (
                    <form>
                        <TextField style={{width:"100%"}} id="outlined-search" label="Leave Type"
                                   value={name}
                                   onChange={e => setName(e.target.value)}    type="search" variant="outlined"/>
                        <br/>
                        <button
                            style={{
                                margin: 'auto',
                                width: "25%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'

                            }}  variant="contained" color="primary"
                            disabled={
                                name.length === 0
                            }
                            onClick={() => {
                                const dependent = {
                                    "name": name


                                }

                                function clean(obj) {
                                    for (let x in obj) {
                                        if (obj[x] === "" || obj[x] === undefined) {
                                            delete obj[x];
                                        }
                                    }
                                    return obj
                                }

                                const dDetails = clean(dependent)
                                console.log(dependent)
                                return axios.post('/employees/me/dependents', dDetails, {
                                    headers: {
                                        Authorization: `Bearer ${tokenString}`,
                                        'content-type': 'application/json'
                                    }
                                }).then(function (response) {
                                        setName('')

                                        readAllMyDependents().then(r => setDependentsData(r))
                                    }
                                )
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                            }
                            }
                        > Save</button>
                    </form>
                )}
            </div>
            <MUIDataTable
                title="Employee List"
                data={details}
                columns={columns}
                options={options}
            />
                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}