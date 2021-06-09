import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import React, {useEffect} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";


import {useHistory, useLocation} from "react-router";
import {readAllEmployees} from "../../../context/EmployeeContext";
import Button from "@material-ui/core/Button";
import {readAllReportingMethods} from "../../../context/ReportingMethodContext";

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


export default function AddSupervisor(props) {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
    };


    const [jobTitles, setJobTitles] = React.useState([]);
    const [jobTitle, setJobTitle] = React.useState('');
    const [empData, setEmpData] = React.useState([]);
    const [emp, setEmp] = React.useState('');
    const [eID, setEID] = React.useState('');

    const [empId, setEmpId] = React.useState('');
    const [vacancyDescription, setVacancyDescription]  = React.useState('');
    const [rData, setRData] = React.useState([]);
    const location = useLocation();

    let history = useHistory()
    useEffect(() => {
        if(location.state){
            console.log(props)
            setEID(location.state.prop1)

        }
        else{
            // alert("yes")
            // console.log("x"+props)
            // setEmpID("604706c638c7f10c93f6c1a7")
        }

    }, [location]);

    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');
    const headers = {Authorization: `Bearer ${tokenString}`,
    }
    useEffect(() => {
        readAllEmployees().then(r => setEmpData(r));
        readAllReportingMethods().then(r=>setRData(r));
    }, []);


    // console.log(nationalities);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [middle_name, setMiddle_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [employee_id, setEmployee_id] = React.useState('000');
    const [gender, setGender] = React.useState('male');
    const [marital_status, setMarital_status] = React.useState('single');
    const [nationality, setNationality] = React.useState('602ac33af70c780b02806b88');
    const [nationalityName, setNationalityName] = React.useState('');
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09T18:30:00.000Z');

    let handleChange = (event,props) => {
        // console.log(props.props.props)
        // console.log(event.target.key)
        setEmp(event.target.value);
        setEmpId(props.props.props);
    };

    console.log("hello")

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
                    }}>Assign Supervisor</h2>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container style={{marginTop: "50px"}}>
                            <TextField style={{
                                margin: 'auto',
                                width: "52%",
                                align: 'center',
                                marginTop: '40px'
                            }}
                                       id="outlined-select-currency"
                                       select
                                       label="Hiring Manager"
                                       value={emp}
                                       onChange={handleChange}
                                       helperText="Select Hiring Manager"
                                       variant="outlined"
                            >
                                {empData.map((option) => (
                                    <MenuItem key={option._id} value={option._id} props={option._id}>
                                        {option.first_name}
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
                                       label="Job Title"
                                       value={jobTitle}
                                       onChange={e => setJobTitle(e.target.value)}
                                       helperText="Select Job Title"
                                       variant="outlined"
                            >
                                {rData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Button style={{
                                margin: 'auto',
                                width: "52%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'
                            }}
                                    disabled={
                                         emp.length === 0 || jobTitle.length === 0
                                    }

                                    onClick={() => {
                                        console.log(emp,jobTitle,eID);
                                        axios.post('/api/employees/'+eID+'/supervisors', {
                                                supervisor: emp,
                                                method: jobTitle,


                                            },
                                            {
                                                headers: headers
                                            })
                                            .then(function (response) {
                                                alert("Successfully Added!");
                                                history.push('/app/admin/userManagement/users/');
                                            })
                                            .catch(function (error) {
                                                alert("Already Added!");
                                                console.log(error);
                                            })
                                    }
                                    }

                                    variant="contained" color="primary">
                                Apply
                            </Button>

                        </Grid>
                    </MuiPickersUtilsProvider>


                </fieldset>


            </div>


        </div>
    );
}