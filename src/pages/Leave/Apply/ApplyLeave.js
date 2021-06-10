import {FormControlLabel, InputLabel, Radio, RadioGroup, Select, Switch, TextField} from "@material-ui/core";
import React, {useEffect} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";

import {readAllNationalities} from "../../../context/OrganizationContext";
import {Button} from "../../../components/Wrappers";
import FormControl from "@material-ui/core/FormControl";
import {
    readAllHolidays,
    readAllLeaveTypes,
    readAllMyEntitlements, readAllMyEntitlementsleaveType
} from "../../../context/LeaveContext/LeaveConfigureContext";
import {readAllEmployees} from "../../../context/EmployeeContext";

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


class KeyboardTimePicker extends React.Component<{ label: string, onChange: handleDateChange, value: Date, id: string, KeyboardButtonProps: { "aria-label": string }, margin: string }> {
    render() {
        return null;
    }
}

export default function ApplyLeave() {

    const handleChangeStartTime = (event) => {
        console.log(event.getHours())
        setSTime(event)

        setStartTime(('0' + event.getHours()).slice(-2)+":"+('0' + event.getMinutes()).slice(-2))

    };
    const handleChangeEndTime = (event) => {
        console.log(event.target)
        setEndTime(('0' + event.getHours()).slice(-2)+":"+('0' + event.getMinutes()).slice(-2))
        setETime(event)
    };


    const handleChangeTime = (event) => {
        setNationality(event.target);
    };
    const [nationalities, setNationalities] = React.useState([]);

    const [sDate, setSDate]  = React.useState('2021-05-28');
    const [eDate, setEDate]  = React.useState('2021-05-29');
    const [sTime, setSTime]  = React.useState(new Date('2014-08-18T21:11:54'));
    const [eTime, setETime]  = React.useState(new Date('2014-08-18T21:11:54'));

    const [startTime, setStartTime]    = React.useState('');
    const [endTime, setEndTime]  = React.useState('');
    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');



    const handleStartDateChange = (date) => {

        let dat = date.getFullYear()+'-' +  ('0' + (date.getMonth()+1)).slice(-2) + '-'+('0' + date.getDate()).slice(-2)

        console.log(dat)
        setSDate(dat);
    };
    const handleEndDateChange = (date) => {

        let dat = date.getFullYear()+'-' +  ('0' + (date.getMonth()+1)).slice(-2) + '-'+('0' + date.getDate()).slice(-2)
        console.log(dat)
        setEDate(dat);
    };
    // const handleDateChange = (date) => {
    //
    //     let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    //     console.log(dat)
    //     setDate_of_birth(dat);
    // };
    // const handleDateChange = (date) => {
    //
    //     let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    //     console.log(dat)
    //     setDate_of_birth(dat);
    // };


    // console.log(nationalities);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [myEntitlementData, setMyEntitlementData] = React.useState([]);
    const [mleave, setMleave]  = React.useState([]);

    const [entitlementID, setEntitlementID] = React.useState('');
    const [middle_name, setMiddle_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [employee_id, setEmployee_id] = React.useState('000');
    const [gender, setGender] = React.useState('');
    const [marital_status, setMarital_status] = React.useState('single');
    const [nationality, setNationality] = React.useState('602ac33af70c780b02806b88');
    const [nationalityName, setNationalityName] = React.useState('');
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09T18:30:00.000Z');

    let handleChange3 = (event) => {


        setNationality(event.target.value._id);
        setNationalityName(event.target.value.name);
    };


    useEffect(() => {
        readAllMyEntitlements().then(r => setMyEntitlementData(r));

// readAllMyEntitlementsleaveType().then(r=>setMleave());
        // console.log(leavePeriodData)

    }, []);

    // let value=props.value
    // let  handleChange=props.handleChange
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
                    }}>Apply Leave</h2>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container style={{marginTop: "50px"}}>

                            <TextField
                                id="outlined-select-currency-native"
                                // value={wednesday}
                                select
                                label="Leave Type"
                              onChange={e => setEntitlementID(e.target.value)}
                                helperText="Please select your currency"


                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                {myEntitlementData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.leaveType.leaveTypeName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*{console.log(nationality)}*/}

                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                value={sDate}
                                label="Start Date"
                                format="MM/dd/yyyy"
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TimePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                showTodayButton
                                ampm={false}
                                todayLabel="now"
                                label="Start Time"
                                 value={sTime}
                                minutesStep={5}
                                onChange={handleChangeStartTime}
                            />
                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                value={eDate}
                                id="date-picker-dialog"
                                label="End Date"
                                format="MM/dd/yyyy"

                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TimePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                showTodayButton
                                todayLabel="now"
                                ampm={false}
                                label="End Time"
                                value={eTime}
                                minutesStep={5}
                                onChange={handleChangeEndTime}
                            />
                            <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                       id="outlined-search" label="Comment" type="text"
                                       onChange={event => setGender(event.target.value)}
                                       defaultValue={gender} value={gender}/>

                            <Button
                                style={{
                                margin: 'auto',
                                width: "50%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'

                            }}  variant="contained" color="primary"
                                disabled={
                                entitlementID.length === 0 ||sDate.length===0||startTime.length===0 ||eDate.length===0 || gender.length===0
                            }
                                onClick={() => {
                                const apply = {
                                    "entitlement": entitlementID,
                                    "startDate": sDate,
                                    "startTime": startTime,
                                    "endDate": eDate,
                                    "endTime": endTime,
                                    "comment":gender

                            }
                                    console.log(apply)
                                return axios.post('/leave/apply', apply, {
                                headers: {
                                Authorization: `Bearer ${tokenString}`,
                                'content-type': 'application/json'
                            }
                            }).then(function (response) {

                                alert("Successfully applied")
                            }
                                )
                                .catch(function (error) {
                                    alert("Something went wrong Check your Entitlement details and then Apply")
                                console.log(error);
                            })
                            }
                            }>
                                Apply
                            </Button>

                        </Grid>
                    </MuiPickersUtilsProvider>


                </fieldset>


            </div>


        </div>
    );
}