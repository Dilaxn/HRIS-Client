import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {readAllEmergencyContacts} from "../../context/EmergencyContext";
import {readAllMyDependents} from "../../context/DependentContext";
import {getToken} from "../../context/UserContext";
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
import {readAllMemberships, readAllMyMemberships} from "../../context/Membership";
import {readAllCurrency} from "../../context/SalaryContext";
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

export default function Memberships(props) {
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [relationship, setRelationship]  = useState("");
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09');
    const handleDateChange1 = (date) => {

        let dat = date.getFullYear()+'-' + ('0' + (date.getMonth()+1)).slice(-2) + '-'+('0' + (date.getDate())).slice(-2)
        console.log(dat)
        setCDate(dat);
    };
    const handleDateChange2 = (date) => {

        let dat = date.getFullYear()+'-' + ('0' + (date.getMonth()+1)).slice(-2) + '-'+('0' + (date.getDate())).slice(-2)
        console.log(dat)
        setRDate(dat);
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }
    let [membership, setMembership]  = useState('');
    let [paidBy, setPaidBy]  = useState('');
    let [amount, setAmount]  = useState('');
    let [currency, setCurrency] = useState('');
    let [cDate, setCDate] = useState('');
    let [rDate, setRDate]  = useState('');



    let [membershipData, setMembershipData] = useState([]);
    let [allMemberships, setAllMemberships] = useState([]);
    let [currencyData, setCurrencyData] = useState([]);

    useEffect(() => {
        readAllMyMemberships().then(r => setMembershipData(r))
        readAllMemberships().then(r=>setAllMemberships(r))
        readAllCurrency().then(r=>setCurrencyData(r))
    }, [""]);
    let details = [];
    console.log(membershipData)
    if (membershipData) {
        membershipData.map(y => {
            const data = [
                y.membership.name,
                y.subscription_paid_by,
                y.subscription_amount,
                y._id
            ]
            details.push(data);
        });
    }
    const ci=[{name:"company"},{name:"individual"}];

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
                return axios.delete('/employees/me/memberships/', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data:{
                        memberships:x
                    }
                })
                    .then(function (response) {
                        readAllMyMemberships().then(r => setMembershipData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Membership Name",
            options: {
                display: true,
            }
        },
        {
            name: "Subscription Paid By",
            options: {
                display: true,
            }
        },
        {
            name: "Subscription Amount",
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
        <div>

            <div>

                <form>
                    {!showForm && (
                        <Button style={{
                            margin: 'auto',
                            width: "100%",
                            align: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'

                        }} onClick={showF} variant="contained" color="primary"> Add</Button>)}
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
                    <center>
                    <form>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Membership Name"
                                   // value={emp}
                                   onChange={event => setMembership(event.target.value)}
                                   helperText="Select Hiring Manager"
                                   variant="outlined"
                        >
                            {allMemberships.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Paid By"
                            // value={emp}
                                   onChange={e => setPaidBy(e.target.value)}                                   helperText="Select Hiring Manager"
                                   variant="outlined"
                        >
                            {ci.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/*<TextField style={{*/}
                        {/*    margin: 'auto',*/}
                        {/*    width: "52%",*/}
                        {/*    align: 'center',*/}
                        {/*    marginTop: '40px'*/}
                        {/*}} id="outlined-search" label="Name"*/}
                        {/*           // value={m}*/}
                        {/*           onChange={e => setPaidBy(e.target.value)}    type="search" variant="outlined"/>*/}
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Amount"
                                   // value={relationship}
                                   onChange={e => setAmount(e.target.value)}   type="search" variant="outlined"/>

                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Currency"
                                   // value={emp}
                                   onChange={event => setCurrency(event.target.value)}
                                   helperText="Select Hiring Manager"
                                   variant="outlined"
                        >
                            {currencyData.map((option) => (
                                <MenuItem key={option._id} value={option._id} >
                                    {option.currency}
                                </MenuItem>
                            ))}
                        </TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container >

                                <KeyboardDatePicker
                                    style={{
                                        margin: 'auto',
                                        width: "52%",
                                        align: 'center',
                                        marginTop: '40px'
                                    }}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Commence Date"
                                    format="MM/dd/yyyy"
                                    value={cDate}
                                    onChange={handleDateChange1}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    style={{
                                        margin: 'auto',
                                        width: "52%",
                                        align: 'center',
                                        marginTop: '40px'
                                    }}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Renewal Date"
                                    format="MM/dd/yyyy"
                            value={rDate}
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </Grid>
                        </MuiPickersUtilsProvider>
                        <br/>
                        <button
                            style={{
                                margin: 'auto',
                                width: "25%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'

                            }}  variant="contained" color="primary"
                            // disabled={
                            //     name.length === 0 || relationship.length === 0
                            // }
                            onClick={() => {
                                const dependent = {
                                    "membership": membership,
                                    "subscription_paid_by": paidBy,
                                    "subscription_amount": amount,
                                    "currency": currency,
                                    "commence_date": cDate,
                                    "renewal_date": rDate



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
                                return axios.post('/employees/me/memberships', dDetails, {
                                    headers: {
                                        Authorization: `Bearer ${tokenString}`,
                                        'content-type': 'application/json'
                                    }
                                }).then(function (response) {
                                        setCurrency('')
                                        setPaidBy('')
                                        setAmount('')

                                        readAllMyMemberships().then(r => setMembershipData(r))
                                    alert("Successfully Added");
                                    }
                                )
                                    .catch(function (error) {
                                        console.log(error)
                                        alert("Check your Inputs")
                                    })
                            }
                            }
                        > Save</button>
                    </form>
                    </center>

                )}
            </div>
            <MUIDataTable
                title="Employee List"
                data={details}
                columns={columns}
                options={options}
            />
        </div>
    );
}