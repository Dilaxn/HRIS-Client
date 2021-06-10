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

import {readAllLocations, readAllNationalities} from "../../context/OrganizationContext";
import {Button} from "../../components/Wrappers";
import FormControl from "@material-ui/core/FormControl";
import {
    readAllHolidays,
    readAllLeaveTypes,
    readAllMyEntitlements, readAllMyEntitlementsleaveType
} from "../../context/LeaveContext/LeaveConfigureContext";
import {readAllEmployees} from "../../context/EmployeeContext";
import {readAllEmploymentStatus, readAllJobCategories, readAllJobs} from "../../context/JobContext";

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

export default function Job() {




    const handleChangeTime = (event) => {
        setNationality(event.target);
    };
    const [jobTitleData, setJobTitleData] = React.useState([]);
    const [empStatusData, setEmpStatusData] = React.useState([]);
    const [jobCategoryData, setJobCategoryData] = React.useState([]);
    const [locationData, setLocationData] = React.useState([]);
    const [jobTitle, setJobTitle] = React.useState('');
    const [empStatus, setEmpStatus] = React.useState('');
    const [jobCategory, setJobCategory]  = React.useState('');
    const [jobTitleName, setJobTitleName] = React.useState('');
    const [empStatusName, setEmpStatusName] = React.useState('');
    const [jobCategoryName, setJobCategoryName]  = React.useState('');
    const [jDate, setJDate] = React.useState('2021-01-01');



    const [sDate, setSDate]  = React.useState('2021-05-28');
    const [eDate, setEDate]  = React.useState('2021-05-29');


    const [startTime, setStartTime]    = React.useState('');
    const [endTime, setEndTime]  = React.useState('');
    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');



    const handleStartDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setSDate(dat);
    };
    const handleJoinDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setJDate(dat);
    };
    const handleEndDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
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
        readAllJobCategories().then(r => setJobCategoryData(r))
        readAllJobs().then(r =>setJobTitleData(r) )
        readAllLocations().then(r=>setLocationData(r))
        readAllEmploymentStatus().then(r=>setEmpStatusData(r))

        axios.get('/employees/me/jobs',  {
            headers: {
                Authorization: `Bearer ${tokenString}`

            }
        }).then(res => {
                console.log("read")
                if(res.data.contract.start_date){setSDate(res.data.contract.start_date);}
                else{setSDate("");}
                if(res.data.contract.end_date){ setEDate(res.data.contract.end_date);}
                else{ setEDate('');}
                if(res.data.joined_date){ setJDate(res.data.joined_date);}
                else{                 setJDate('');}
                if(res.data.job_title.job_title){setJobTitle(res.data.job_title._id);
                    setJobTitleName(res.data.job_title.name);    }
                else{setJobTitle('');
                    setJobTitleName(''); }
                if(res.data.job_category.name){    setJobCategory(res.data.job_category._id)
                    setJobCategoryName(res.data.job_category.name);
                }
                else{    setJobCategory('');
                    setJobCategoryName('');  }
                if(res.data.employment_status.name){    setEmpStatus(res.data.employment_status._id);
                    setEmpStatusName(res.data.employment_status.name);}
                else{  setEmpStatus('');
                    setEmpStatusName('');}








            }
        )
            .catch(err => {
                console.log(err)
            })
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
                    }}>Job</h2>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container style={{marginTop: "50px"}}>

                            <TextField
                                id="outlined-select-currency-native"
                                value={jobTitle}
                                label={jobTitleName}
                                onChange={e => setJobTitle(e.target.value)}
                                helperText="Please select Job Title"


                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>

                            </TextField>
                            <TextField
                                id="outlined-select-currency-native"
                                value={empStatus}
                                label={empStatusName}
                                onChange={e => setEmpStatus(e.target.value)}
                                helperText="Please select Employment Status"


                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>

                            </TextField>
                            <TextField
                                id="outlined-select-currency-native"
                                value={jobCategory}
                                label={jobCategoryName}
                                onChange={e => setJobCategory(e.target.value)}
                                helperText="Please select Job Category"


                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>

                            </TextField>
                            {/*{console.log(nationality)}*/}

                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                value={jDate}
                                helperText="Join Date"

                                format="MM/dd/yyyy"
                               selectable={false}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <h2                                 style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                            >Contract Details</h2>

                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                value={sDate}
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                helperText="End Date"
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                value={eDate}
                                id="date-picker-dialog"
                                helperText="End Date"
                                format="MM/dd/yyyy"

                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />


                        </Grid>
                    </MuiPickersUtilsProvider>


                </fieldset>


            </div>


        </div>
    );
}