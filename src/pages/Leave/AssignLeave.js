import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import MUIDataTable from "mui-datatables";
import MenuItem from "@material-ui/core/MenuItem";
import Calendar from 'react-input-calendar';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";

import {readAllNationalities} from "../../context/OrganizationContext";
import {Button} from "../../components/Wrappers";

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


export default function AssignLeave() {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
    };

    const handleChange4 = (event) => {
        setNationality(event.target.value);
    };
    const [nationalities, setNationalities] = React.useState([]);


    const [edit, setEdit] = React.useState('');
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {
        readAllNationalities().then(r => setNationalities(r));
    }, []);


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
    return (
        <div>

            <div>
                <fieldset>
                    <h2 style={{
                        margin: 'auto',
                        width: "52%",
                        textAlign: 'center',
                        marginTop: '30px',
                        marginBottom: '-30px'
                    }}>Assign Leave</h2>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container style={{marginTop: "50px"}}>
                            <TextField
                                defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select={edit}
                                label="Marital Status"
                                onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{
                                    margin: 'auto',
                                    width: "52%",
                                    align: 'center',
                                    marginTop: '40px'
                                }}>                                {mStatus.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField
                                defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select={edit}
                                label="Marital Status"
                                onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                {mStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*{console.log(nationality)}*/}
                            {<br/>}

                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                defaultValue={date_of_birth} value={date_of_birth}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                defaultValue={date_of_birth} value={date_of_birth}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TextField
                                defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select={edit}
                                label="Marital Status"
                                onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                                {mStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                                       id="outlined-search" label="Gender" type="search"
                                       defaultValue={gender} value={gender} variant="outlined"/>
                            <Button style={{
                                margin: 'auto',
                                width: "52%",
                                align: 'center',
                                marginTop: '40px',
                                marginBottom: '40px'
                            }} variant="contained" color="primary">
                                Apply
                            </Button>

                        </Grid>
                    </MuiPickersUtilsProvider>


                </fieldset>


            </div>


        </div>
    );
}