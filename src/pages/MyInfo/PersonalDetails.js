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
const gen = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Female',
    },
];


export default function PersonalDetails(props) {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
      };

    const handleChange4 = (event) => {
        setNationality(event.target.value);
    };
    const [nationalities, setNationalities] = React.useState([]);


    const [edit, setEdit] = React.useState('');
    const [nick_name, setNickName] = React.useState('');
    const [smoker, setSmoker]  = React.useState('');
    const [military_service, setMilitary_service] = React.useState('');
    const [ssn, setSsn] = React.useState('');
    const [sin, setSin] = React.useState('');

    const [showNickName, setShowNickName] = React.useState(false);
    const [showSmoker, setShowSmoker] = React.useState(false);
    const [showMilitaryService, setShowMilitaryService] = React.useState(false);
    const [showSsn, setShowSsn]  = React.useState(false);
    const [showSin, setShowSin]  = React.useState(false);

    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {
        readAllNationalities().then(r => setNationalities(r));
        axios.patch('/pim_configuration', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                console.log(res.data)
setShowNickName(res.data.show_nick_name)
            setShowSmoker(res.data.show_smoker)
            setShowMilitaryService(res.data.show_military_service)
                setShowSsn(res.data.show_ssn)
            setShowSin(res.data.show_sin)


                // console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        axios.patch('/employees/me/personal_detail', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            let fName = (res.data.first_name) ? res.data.first_name:""
            let mName = (res.data.middle_name) ? res.data.middle_name:""
            let lName = (res.data.last_name) ? res.data.last_name:""
            let eId = (res.data.employee_id) ? res.data.employee_id:""
            let gender = (res.data.gender) ? res.data.gender:""
            let ms = (res.data.marital_status) ? res.data.marital_status:""
            let dob = (res.data.date_of_birth) ? res.data.date_of_birth:""
            let nickName = (res.data.nick_name) ? res.data.nick_name:""
            let smoker = (res.data.smoker) ? res.data.smoker:""
            let military_service = (res.data.military_service) ? res.data.military_service:""
            let ssn = (res.data.ssn) ? res.data.ssn:""
            let sin = (res.data.sin) ? res.data.sin:""

            setFirst_name(fName);
            setMiddle_name(mName);
            setLast_name(lName);
            setEmployee_id(eId);
            setGender(gender);
            setMarital_status(ms);
            setSmoker(smoker)
            setNickName(nickName)
            setMilitary_service(military_service)
            setSsn(ssn)
            setSin(sin)
            setDate_of_birth(dob);

            if(res.data.nationality)
            {
                setNationalityName(res.data.nationality.name)
                setNationality(res.data.nationality._id);
            }
            else{
                setNationalityName('');
                setNationality('');
            }

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
            "date_of_birth":date_of_birth,
            "nick_name":nick_name,
            "smoker":smoker,
            "military_service":military_service,
            "ssn":ssn,
          "sin":sin


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
        return axios.patch('/employees/me/personal_detail', pDetails, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            let fName = (res.data.first_name) ? res.data.first_name:""
            let mName = (res.data.middle_name) ? res.data.middle_name:""
            let lName = (res.data.last_name) ? res.data.last_name:""
            let eId = (res.data.employee_id) ? res.data.employee_id:""
            let gender = (res.data.gender) ? res.data.gender:""
            let ms = (res.data.marital_status) ? res.data.marital_status:""
            let dob = (res.data.date_of_birth) ? res.data.date_of_birth:""
            let nickName = (res.data.nick_name) ? res.data.nick_name:""
            let smoker = (res.data.smoker) ? res.data.smoker:""
            let military_service = (res.data.military_service) ? res.data.military_service:""
            let ssn = (res.data.ssn) ? res.data.ssn:""
            let sin = (res.data.sin) ? res.data.sin:""

            setFirst_name(fName);
            setMiddle_name(mName);
            setLast_name(lName);
            setEmployee_id(eId);
            setGender(gender);
            setMarital_status(ms);
setSmoker(smoker)
            setNickName(nickName)
            setMilitary_service(military_service)
            setSsn(ssn)
            setSin(sin)
            setDate_of_birth(dob);

            if(res.data.nationality)
            {
                setNationalityName(res.data.nationality.name)
                setNationality(res.data.nationality._id);
            }
            else{
                setNationalityName('');
                setNationality('');
            }
            }
        )
            .catch(err => {
                console.log(err)
            })
    }
    const [selectedDate, setSelectedDate] = React.useState(new Date(''));
    const [first_name, setFirst_name] = React.useState('');
    const [middle_name, setMiddle_name] = React.useState('');
    const [last_name, setLast_name] = React.useState('');
    const [employee_id, setEmployee_id] = React.useState('000');
    const [gender, setGender] = React.useState('');
    const [marital_status, setMarital_status] = React.useState('');
    const [nationality, setNationality] = React.useState('');
    const [nationalityName, setNationalityName] = React.useState('');
    const [date_of_birth, setDate_of_birth] = React.useState('');

    let handleChange3 = (event) => {


        setNationality(event.target.value._id);
        setNationalityName(event.target.value.name);
    };

    const handleDateChange = (date) => {
        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setDate_of_birth(dat);
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

                    <TextField
                        defaultValue={gender} value={gender}
                        id="outlined-select-currency-native"
                        select={edit}
                        label="Marital Status"
                        onChange={e => setGender(e.target.value)}
                        helperText="Please select your currency"
                        variant="outlined"
                        style={{margin: "20px"}}>
                        {gen.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>


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
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {mStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {/*{console.log(nationality)}*/}
                            {/*<TextField*/}
                            {/*    id="outlined-select-currency-native"*/}
                            {/*    value={nationalityName}*/}
                            {/*    defaultValue={nationalityName}*/}
                            {/*    select={edit}*/}
                            {/*    label="Nationality"*/}
                            {/*    onChange={handleChange3}*/}
                            {/*    helperText="Please select your Nationality"*/}
                            {/*    variant="outlined"*/}
                            {/*    style={{margin: "20px"}}>*/}
                            {/*    {nationalities.map((option) => (*/}
                            {/*        <MenuItem key={option} value={option}>*/}
                            {/*            {option.name}*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</TextField>*/}

                            <KeyboardDatePicker
                                style={{marginTop:'25px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                variant="outlined"
                                helperText="Date of Birth"

                                value={date_of_birth}

                                format="MM/dd/yyyy"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>

                    <hr/>
                    {console.log(showMilitaryService)}
                    <div hidden={!showNickName}>
                        <TextField Col xs={6}  style={{margin: "20px"}} id="outlined-search" label="Nick Name" type="search"
                                   value={nick_name}    variant="outlined" onChange={e => setNickName(e.target.value)}/>
                    </div>
                    <div hidden={!showSmoker}>
                        <TextField Col xs={6} hidden={showSmoker} style={{margin: "20px"}} id="outlined-search" label="Smoker?" type="search"
                                  value={smoker}    variant="outlined" onChange={e => setSmoker(e.target.value)}/>
                    </div>
                    <div hidden={!showMilitaryService}>
                        <TextField Col xs={6} hidden={showMilitaryService} style={{margin: "20px"}} id="outlined-search" label="Military Service" type="search"
                              value={military_service}    variant="outlined" onChange={e => setMilitary_service(e.target.value)}/>

                    </div >
                    <div hidden={!showSsn}>
                        <TextField Col xs={6} hidden={showSsn} style={{margin: "20px"}} id="outlined-search" label="SSN" type="search"
                       value={ssn}    variant="outlined" onChange={e => setSsn(e.target.value)}/>

                    </div>
                    <div hidden={!showSin}>
                        <TextField Col xs={6} hidden={showSin} style={{margin: "20px"}} id="outlined-search" label="SIN" type="search"
                                   value={sin}    variant="outlined" onChange={e => setSin(e.target.value)}/>

                    </div>


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