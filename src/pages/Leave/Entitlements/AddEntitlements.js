import {FormControlLabel, InputLabel, Radio, RadioGroup, Select, Switch, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";

import {readAllNationalities} from "../../../context/OrganizationContext";
import {Button} from "../../../components/Wrappers";
import {readAllHolidays, readAllLeaveTypes, realLeavePeriod} from "../../../context/LeaveContext/LeaveConfigureContext";
import FormControl from "@material-ui/core/FormControl";
import {readAllEmployees} from "../../../context/EmployeeContext";
import {withGoogleMap} from "react-google-maps";

const mStatus = [
    {
        value: 'married',
        label: 'Married',
    },
    {
        value: 'single',
        label: 'Single',
    },
];


export default function AddEntitlement() {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
    };

    const handleChange4 = (event) => {
        setNationality(event.target.value);
    };
    const [nationalities, setNationalities] = React.useState([]);

    let [leaveTypeData, setLeaveTypeData]  = useState([]);
    let [leavePeriodData, setLeavePeriodData]   = useState([]);

    let [empData, setEmpData]   = useState([]);
    let [leaveType, setLeaveType]   = useState([]);

    let [leavePeriod, setLeavePeriod]   = useState([]);

    const [emp, setEmp] = React.useState([]);
    const [x, setX] = React.useState([]);
    const [y, setY] = React.useState([]);


    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {

            realLeavePeriod().then(r=> {
                console.log(r[1])
                setX(r[1])
                setY(r[2])
                setLeavePeriodData(r)
            })

// alert("hhh")
    }, []);

    useEffect(() => {
        readAllNationalities().then(r => setNationalities(r));
        readAllLeaveTypes().then(r => setLeaveTypeData(r))
        readAllEmployees().then(r => setEmpData(r))


        // console.log(leavePeriodData)

    }, []);
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        console.log(leavePeriodData)
        console.log(value)
        setEmp(value);
    };


    // console.log(nationalities);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [first_name, setFirst_name] = React.useState('');
    const [middle_name, setMiddle_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [employee_id, setEmployee_id] = React.useState('000');
    const [gender, setGender] = React.useState('male');
    const [marital_status, setMarital_status] = React.useState('single');
    const [nationality, setNationality] = React.useState('602ac33af70c780b02806b88');
    const [nationalityName, setNationalityName] = React.useState('');
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09T18:30:00.000Z');

    let handleChange3 = (event) => {


        setNationality(event.target.value._id);
        setNationalityName(event.target.value.name);
    };

    const handleDateChange = (date) => {

        setDate_of_birth(date);
    };


    // let value=props.value
    // let  handleChange=props.handleChange
    if(1) {
        return (
            <div>

                <div>
                    <fieldset>
                        {/* eslint-disable-next-line react/jsx-no-undef */}


                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <h2 style={{
                            margin: 'auto',
                            width: "52%",
                            textAlign: 'center',
                            marginTop: '30px',
                            marginBottom: '-30px'
                        }}>Add Entitlement</h2>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container style={{marginTop: "50px"}}>
                                <FormControl style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                    <InputLabel shrink htmlFor="select-multiple-native">
                                        Employees
                                    </InputLabel>
                                    <Select
                                        multiple
                                        native
                                        // value={personName}
                                        onChange={handleChangeMultiple}
                                        inputProps={{
                                            id: 'select-multiple-native',
                                        }}

                                    >
                                        {empData.map((name) => (
                                            <option key={name._id} value={name._id}>
                                                {name.first_name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="outlined-select-currency-native"
                                    // value={wednesday}
                                    select
                                    label="Leave Type"
                                    onChange={e => setLeaveType(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"

                                    style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                    {leaveTypeData.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.leaveTypeName}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    id="outlined-select-currency-native"
                                    // value={wednesday}
                                    select
                                    label="Leave Period"
                                    onChange={e => setLeavePeriod(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                    {/*{leavePeriodData.map((option) => (*/}
                                    {/*    <MenuItem key={option._id} value={option.leaveTypeName}>*/}
                                    {/*        {option.leaveTypeName}*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}
                                    <MenuItem key={x._id} value={x._id}> Current</MenuItem>
                                    <MenuItem key={y._id} value={y._id}> Future</MenuItem>

                                </TextField>
                                {/*{console.log(nationality)}*/}
                                {<br/>}

                                <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                           id="outlined-search" label="Entitlement" type="number"
                                           onChange={event => setGender(event.target.value)}
                                           defaultValue={gender} value={gender} variant="outlined"/>
                                {<br/>}

                                <Button style={{
                                    margin: 'auto',
                                    width: "50%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'

                                }} variant="contained" color="primary"
                                        disabled={
                                            leavePeriod.length === 0 || gender.length === 0 || leaveType.length === 0 || emp.length === 0
                                        }
                                        onClick={() => {
                                            const leaveEntitlement = {
                                                "employees": emp,
                                                "leaveType": leaveType,
                                                "leavePeriod": leavePeriod,
                                                "entitlement": gender


                                            }
                                            console.log(leaveEntitlement)
                                            return axios.post('/entitlements', leaveEntitlement, {
                                                headers: {
                                                    Authorization: `Bearer ${tokenString}`,
                                                    'content-type': 'application/json'
                                                }
                                            }).then(function (response) {
                                                    setGender('')
                                                    alert("Successfully Added")
                                                }
                                            )
                                                .catch(function (error) {
                                                    alert("Please check all the details")
                                                    console.log(error);
                                                })
                                        }
                                        }>
                                    Add Entitlement
                                </Button>

                            </Grid>
                        </MuiPickersUtilsProvider>


                    </fieldset>


                </div>


            </div>
        );
    }
}