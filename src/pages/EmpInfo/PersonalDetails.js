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
import {countAllEmployees} from "../../context/EmployeeContext";
import {readAllNationalities} from "../../context/OrganizationContext";
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
const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
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


export default function PersonalDetails(props) {
console.log(props.props)
    let empID= props.props
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

    useEffect(() => {
        axios.patch('http://localhost:3001/employees/'+empID+'/personal_detail', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            setFirst_name(res.data.first_name);
            setMiddle_name(res.data.middle_name);
            setLast_name(res.data.last_name);
            setEmployee_id(res.data.employee_id);
            setGender(res.data.gender);
            setMarital_status(res.data.marital_status);
            setNationality(res.data.nationality._id);
            setDate_of_birth(res.data.date_of_birth);
            setNationalityName(res.data.nationality.name)

            // console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }, []);

    // console.log(nationalities);
    const checkEdit = (event) => {
        setEdit(!edit)
        const personalDetails  = {
            "first_name": first_name,
            "middle_name": middle_name,
            "last_name": last_name,
            "gender": gender,
            "marital_status": marital_status,
        "nationality":nationality,
            "date_of_birth":date_of_birth


        }
        function clean(obj) {
            for (let x in obj) {
                if (obj[x] === "" || obj[x] === undefined) {
                    delete obj[x];
                }
            }
            return obj
        }
        const pDetails= clean(personalDetails)
        console.log(pDetails)
        console.log(personalDetails)
        return axios.patch('http://localhost:3001/employees/'+empID+'/personal_detail', pDetails, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            setFirst_name(res.data.first_name);
                setMiddle_name(res.data.middle_name);
                setLast_name(res.data.last_name);
                setEmployee_id(res.data.employee_id);
                setGender(res.data.gender);
                setMarital_status(res.data.marital_status);
                setNationality(res.data.nationality._id);
                setDate_of_birth(res.data.date_of_birth);
                setNationalityName(res.data.nationality.name)
                console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [first_name, setFirst_name] = React.useState('');
    const [middle_name, setMiddle_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [employee_id, setEmployee_id] = React.useState('000');
    const [gender, setGender] = React.useState('');
    const [marital_status, setMarital_status] = React.useState('single');
    const [nationality, setNationality] = React.useState('');
    const [nationalityName, setNationalityName] = React.useState('');
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09T18:30:00.000Z');
    let handleChange3 = (event) => {


        setNationality(event.target.value._id);
        setNationalityName(event.target.value.name);
    };


    const handleDateChange = (date) => {

        setDate_of_birth(date);
    };


let value=props.value
  let  handleChange=props.handleChange
    return (
        <div>
            <FormControlLabel
                control={
                    // eslint-disable-next-line react/jsx-no-undef
                    <Switch
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        name="checkedB"
                        color="primary"
                        onChange={checkEdit}
                    />
                }
                label="Edit"
            />
            <div>
                <fieldset disabled={!edit}>
                {/* eslint-disable-next-line react/jsx-no-undef */}

                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="First Name" type="search"
                           defaultValue={first_name} value={first_name}  variant="outlined" onChange={e => setFirst_name(e.target.value)}/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Middle Name" type="search"
                           defaultValue={middle_name} value={middle_name}  variant="outlined" onChange={e => setMiddle_name(e.target.value)}/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Last Name" type="search"
                           defaultValue={last_name} value={last_name}  variant="outlined" onChange={e => setLast_name(e.target.value)}/>

                <hr/>
                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="Employee ID" type="search"
                           defaultValue={employee_id} value={employee_id}    variant="outlined" onChange={e => setEmployee_id(e.target.value)}/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Gender" type="search"
                           defaultValue={gender} value={gender}  variant="outlined" />
                
                <FormControl component="fieldset" style={{margin: "20px"}}>
                <FormLabel component="legend">Gender</FormLabel>
                <div defaultValue={gender} checked={gender} value={gender}  onChange={e => setGender(e.target.value)}>
                  <input type="radio" value="male" name="gender"/> Male
                  <input type="radio" value="female" name="gender"/> Female
                </div>
              </FormControl>
                <hr/>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container >
                            <TextField
                                defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select={edit}
                                label="Marital Status"
                                onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your Marital Status"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {mStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*{console.log(nationality)}*/}
                            <TextField
                                id="outlined-select-currency-native"
                            value={nationalityName}
                                defaultValue={nationalityName}
                                select={edit}
                                label="Nationality"
                                onChange={handleChange3}
                                helperText="Please select your Nationality"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {nationalities.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <KeyboardDatePicker
                                style={{marginTop:'25px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date of Birth"
                                format="MM/dd/yyyy"
                                defaultValue={date_of_birth} value={date_of_birth}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>



                </fieldset>



            </div>
            <MUIDataTable
                title="Employee List"
                data={datatableData}
                columns={["Name", "Company", "City", "State"]}
                options={{
                    filterType: "checkbox",
                }}
            />

        </div>
    );
}