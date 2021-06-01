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

import {readAllNationalities} from "../../context/OrganizationContext";
import {Button} from "../../components/Wrappers";
import {readAllJobs} from "../../context/JobContext";
import {readAllEmployees} from "../../context/EmployeeContext";
import {useHistory} from "react-router";

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


export default function AddJobVacancies() {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
    };

    const handleChange4 = (event) => {
        setNationality(event.target.value);
    };
    const [jobTitles, setJobTitles] = React.useState([]);
    const [jobTitle, setJobTitle] = React.useState('');
    const [empData, setEmpData] = React.useState([]);
    const [emp, setEmp] = React.useState('');
    const [empId, setEmpId] = React.useState('');
    const [vacancyDescription, setVacancyDescription]  = React.useState('');
    let history = useHistory()


    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');
    const headers = {Authorization: `Bearer ${tokenString}`,
    }
    useEffect(() => {
        readAllJobs().then(r => setJobTitles(r));
        readAllEmployees().then(r => setEmpData(r));
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
                    }}>Add Vacancy</h2>

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
                                       label="Job Title"
                                       value={jobTitle}
                                       onChange={e => setJobTitle(e.target.value)}
                                       helperText="Select Job Title"
                                       variant="outlined"
                            >
                                {jobTitles.map((option) => (
                                    <MenuItem key={option.job_title} value={option.job_title}>
                                        {option.job_title}
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
                                       label="Hiring Manager"
                                       value={emp}
                                       onChange={handleChange}
                                       helperText="Select Hiring Manager"
                                       variant="outlined"
                            >
                                {empData.map((option) => (
                                    <MenuItem key={option._id} value={option.first_name} props={option._id}>
                                        {option.first_name}
                                    </MenuItem>
                                ))}
                            </TextField>



                            <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                       multiline
                                       rows={10} id="outlined-search" label="Vacancy Description" type="search"
                                      value={vacancyDescription}
                                       onChange={e => setVacancyDescription(e.target.value)}
                                       variant="outlined"/>
                            <Button style={{
                                margin: 'auto',
                                width: "52%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'
                            }}
                                   variant="contained"
                                    disabled={
                                        vacancyDescription.length === 0 || emp.length === 0 || jobTitle.length === 0
                                    }

                                    onClick={() => {
                                        console.log(jobTitle,emp,empId,vacancyDescription)
                                        axios.post("/vacancies", {
                                                vacancy_title: jobTitle,
                                                hiring_manager: emp,
                                                hiring_manager_id: empId,
                                                vacancy_description: vacancyDescription
                                            },
                                            {
                                                headers: headers
                                            })
                                            .then(function (response) {
                                                alert("Successfully Added!");
                                                history.push('/app/admin/userManagement/users/');
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            })
                                    }
                                    }

                                    variant="contained" color="primary">
                                Assign
                            </Button>

                        </Grid>
                    </MuiPickersUtilsProvider>


                </fieldset>


            </div>


        </div>
    );
}