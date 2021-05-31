import 'date-fns';
import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {InputLabel, Select, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {readAllNationalities} from "../../../context/OrganizationContext";
import {readAllLeaveTypes} from "../../../context/LeaveContext/LeaveConfigureContext";
import {readAllEmployees} from "../../../context/EmployeeContext";
import {readAllCustomers} from "../../../context/TimeContext/ProjectContext";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import {useHistory} from "react-router";


export default function AddProject() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [proName,setProName] = useState('');
    const [description, setDescription] = useState('');

    const [emp, setEmp] = React.useState([]);
    let [empData, setEmpData]   = useState([]);
    const [customer, setCustomer]  = React.useState('');
    let [customerData, setCustomerData]   = useState([]);
    let history = useHistory()

    useEffect(() => {

        readAllEmployees().then(r => setEmpData(r))
readAllCustomers().then(r=>setCustomerData(r))

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
        console.log(value)
        setEmp(value);
    };
    const tokenString = localStorage.getItem('id_token');

    const handleChangeMultipleCus = (event) => {
        setCustomer(event.target.value);
    };
    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <h1 style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>Add Project</h1>
                <Grid container>
                    <TextField style={{
                        margin: 'auto',
                        width: "52%",
                        align: 'center',
                        marginTop: '40px'
                    }}
                               id="outlined-select-currency"
                               select
                               label="Hiring Manager"
                               // value={customer}
                               onChange={handleChangeMultipleCus}
                               helperText="Select Hiring Manager"
                               variant="outlined"
                    >
                        {customerData.map((option) => (
                            <MenuItem key={option._id} value={option._id} props={option._id}>
                                {option.customerName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                               id="outlined-search" label="Name" type="text"
                               onChange={event => setProName(event.target.value)}
                             value={proName} variant="outlined"/>
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
                    <TextField style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                               id="outlined-search" label="Description" type="text"
                               onChange={event => setDescription(event.target.value)}
                               value={description} variant="outlined"/>
                    <Button
                        style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}
                        variant="contained" color="primary"
                        disabled={
                            proName.length === 0 || customer.length === 0 || emp.length === 0
                        }
                            onClick={() => {
                                const leaveEntitlement = {
                                    "projectName": proName,
                                    "customerName": customer,
                                    "projectAdmin": emp,
                                    "projectDescription": description


                                }
                                console.log(leaveEntitlement)
                                return axios.post('/projects', leaveEntitlement, {
                                    headers: {
                                        Authorization: `Bearer ${tokenString}`,
                                        'content-type': 'application/json'
                                    }
                                }).then(function (response) {
                                        setProName('')
                                    setCustomer('')
                                    setEmp([])
                                    setDescription('')
                                        alert("Successfully Added")
                                    }
                                )
                                    .catch(function (error) {
                                        alert("Something went wrong")
                                    })
                            }
                            }>
                        Add Project
                    </Button>
                    <Button style={{
                        margin: 'auto',
                        width: "50%",
                        align: 'center',
                        marginTop: '40px',
                        marginBottom: '40px'

                    }} variant="contained"


                            onClick={() => {
                                history.push('/app/time/projectInfo/projects/')

                            }
                            }>
                        Cancel
                    </Button>
                </Grid>
                <br/><br/>
            </MuiPickersUtilsProvider> <br/><br/>

        </div>
    );
}
