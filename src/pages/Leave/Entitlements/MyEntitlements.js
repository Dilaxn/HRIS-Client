import {FormControlLabel, InputLabel, Radio, RadioGroup, Select, Switch, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import 'date-fns';
import MUIDataTable from "mui-datatables";

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
import {getToken} from "../../../context/UserContext";
import {readAllJobs} from "../../../context/JobContext";

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


export default function MyEntitlements() {

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
    let [reData, setReData]   = useState([]);

    const [emp, setEmp] = React.useState('');
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

        return axios.get('/employees/me/entitlements?', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(function (response) {
                setGender('')
                if(response) {
                    setReData(response.data.data)
                }else {
                    alert("No data found")
                }
            }
        )
            .catch(function (error) {
                console.log(error);
            })
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
//table data

    const details = [];
    if (reData) {




        reData.map(r => {
            const data = [
                r.leaveType.leaveTypeName,
                r.entitlement,
                r.leavePeriod.startDate.slice(0, 10),
                r.leavePeriod.endDate.slice(0, 10),
                r.leaveTaken,
                r._id
            ]
            details.push(data);
        });
    }
    else{

        reData.map(r => {
            const data = [
                "","",""
            ]
            details.push(data);
        });
    }

    const options = {
        selectableRows: false,


    };

    const columns = [
        {
            name: "Leave Type",
            options: {
                display: true,
            }
        },
        {
            name: "Entitlement Type",
            options: {
                display: true,
            }
        },
        {
            name: "Valid From",
            options: {
                display: true,
            }
        },
        {
            name: "Valid To",
            options: {
                display: true,
            }
        },
        {
            name: "Leave Taken",
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
                        }}>Search My Entitlement</h2>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container style={{marginTop: "50px"}}>

                                <TextField
                                    id="outlined-select-currency-native"
                                    // value={wednesday}
                                    select
                                    label="Leave Type"
                                    onChange={e => {
                                        setLeaveType(e.target.value)
                                        setReData([])
                                    }}
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
                                    onChange={e => {
                                        setLeavePeriod(e.target.value)
                                        setReData([])
                                    }}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                    {/*{leavePeriodData.map((option) => (*/}
                                    {/*    <MenuItem key={option._id} value={option.leaveTypeName}>*/}
                                    {/*        {option.leaveTypeName}*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}
                                    <MenuItem key={x._id} value={x._id}> {x.startDate}-{x.endDate}</MenuItem>
                                    <MenuItem key={y._id} value={y._id}> {y.startDate}- {y.endDate}</MenuItem>

                                </TextField>
                                {/*{console.log(nationality)}*/}
                                {<br/>}


                                {<br/>}

                                <Button style={{
                                    margin: 'auto',
                                    width: "50%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'

                                }} variant="contained" color="primary"
                                        disabled={
                                            leavePeriod.length === 0 || leaveType.length === 0
                                        }
                                        onClick={() => {
                                            const leaveEntitlement = {
                                                "employees": emp,
                                                "leaveType": leaveType,
                                                "leavePeriod": leavePeriod,


                                            }
                                            console.log(leaveEntitlement)
                                            return axios.get('/employees/me/entitlements?leave_type='+leaveType+'&leave_period='+leavePeriod, {
                                                headers: {
                                                    Authorization: `Bearer ${tokenString}`,
                                                    'content-type': 'application/json'
                                                }
                                            }).then(function (response) {
                                                    setGender('')
                                                    if(response) {
                                                        setReData(response.data.data)
                                                    }else {
                                                        alert("No data found")
                                                    }
                                                }
                                            )
                                                .catch(function (error) {
                                                    console.log(error);
                                                })
                                        }
                                        }>
                                    Search
                                </Button>

                                <Button style={{
                                    margin: 'auto',
                                    width: "60%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'

                                }} variant="contained" color="primary"

                                        onClick={() => {
                                            const leaveEntitlement = {
                                                "employees": emp,
                                                "leaveType": leaveType,
                                                "leavePeriod": leavePeriod,


                                            }
                                            console.log(leaveEntitlement)
                                            return axios.get('/employees/me/entitlements?', {
                                                headers: {
                                                    Authorization: `Bearer ${tokenString}`,
                                                    'content-type': 'application/json'
                                                }
                                            }).then(function (response) {
                                                    setGender('')
                                                    if(response) {
                                                        setReData(response.data.data)
                                                    }else {
                                                        alert("No data found")
                                                    }
                                                }
                                            )
                                                .catch(function (error) {
                                                    console.log(error);
                                                })
                                        }
                                        }>
                                    Show all My Entitlements
                                </Button>
                            </Grid>
                        </MuiPickersUtilsProvider>


                    </fieldset>


                </div>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title="Entitlements"
                            data={details}
                            columns={columns}
                            options={options}
                        />
                    </Grid>

                </Grid>


            </div>
        );
    }
}