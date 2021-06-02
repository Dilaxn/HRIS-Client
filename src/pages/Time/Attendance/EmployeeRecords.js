import {Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {getToken} from "../../../context/UserContext";
import {readAllHolidays, readAllLeaveTypes} from "../../../context/LeaveContext/LeaveConfigureContext";
import {readAllNationalities} from "../../../context/OrganizationContext";
import {readAllEmployees} from "../../../context/EmployeeContext";
import {bool} from "prop-types";


export default function EmployeeRecords(props) {
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [check1, setCheck1] = useState(false);
    let [leaveTypeData, setLeaveTypeData]  = useState([]);
    let [holidayData, setHolidayData]   = useState([]);

    let opp= [
        {name:"FullDay",id:"full"},
        {name:"HalfDay",id:"half"}
    ]
    let [date, setDate] = useState([]);




    const handleDateChangeCheck = (e) => {
        if(e.target.value==="true"){
            setCheck1(true);
        }
        else{
            setCheck1(false);
        }
    };
    const tokenString = localStorage.getItem('id_token');

    let showF = () => {
        setShowForm(!showForm);
    }
    const [date_of_birth, setDate_of_birth] = React.useState('2021-05-28');
    const [empData, setEmpData]  = React.useState([]);
    const [emp, setEmp]  = React.useState('');
    const [from, setFrom]   = React.useState('');
    const [to, setTo]  = React.useState('');
    const [empURL, setEmpURL]   = React.useState('');
    const [toURL, setToURL]    = React.useState('');
    const [fromURL, setFromURL]  = React.useState('');

    const [attData, setAttData]   = React.useState('');


    const handleDateChange1 = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setFrom(dat);
    };
    const handleDateChange2 = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setTo(dat);
    };
    let [dependentsData, setDependentsData] = useState([]);

    useEffect(() => {
        readAllEmployees().then(r => setEmpData(r))

        readAllLeaveTypes().then(r => setLeaveTypeData(r))
        readAllHolidays().then(r=>{
            console.log(r)
            setHolidayData(r)
        })
    }, [showForm]);
    let details = [];
    if (attData) {
        attData.map(y => {
            const data = [
                y.employee.first_name,
                y.punchInTime,
                y.punchInNote,
                y.punchOutTime,
                y.punchOutNote,
                y.duration,
                y._id
            ]
            details.push(data);
        });
    }

    const options = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = rowData[4]
                let id = x
                console.log(x)
                return axios.delete('/holidays', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({id})
                })
                    .then(function (response) {
                        readAllHolidays().then(r => setHolidayData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Employee",
            options: {
                display: true,
            }
        },
        {
            name: "PunchIn Time",
            options: {
                display: true,
            }
        },
        {
            name: "PunchIn Note",
            options: {
                display: true,
            }
        },
        {
            name: "PunchOut Time",
            options: {
                display: true,
            }
        },
        {
            name: "PunchOut Note",
            options: {
                display: true,
            }
        },
        {
            name: "Duration",
            options: {
                display: true,
            }
        },
        {
            name: "ID",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];



    return (
        <div >
            <fieldset>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div container style={{marginTop: "50px",width:"50%",margin:"auto"}}>



                            <form>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={emp}
                                    select
                                    label="Employee"
                                    onChange={e => setEmp(e.target.value)}
                                    helperText="Please select FullDay/HalfDay"
                                    variant="outlined"
                                    style={{marginTop: "30px",width:"100%"}}>
                                    {empData.map((name) => (
                                        <option key={name._id} value={name._id}>
                                            {name.first_name}
                                        </option>
                                    ))}
                                </TextField>

                                <KeyboardDatePicker
                                    style={{marginTop:'25px',width:'50%'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="From"
                                    value={from}
                                    format="MM/dd/yyyy"
                                    onChange={handleDateChange1}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    style={{marginTop:'25px',width:'50%'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="To"
                                    value={to}
                                    format="MM/dd/yyyy"
                                    onChange={handleDateChange2}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                                <br/>
                                <Button
                                    style={{
                                        margin: 'auto',
                                        width: "25%",
                                        align: 'center',
                                        marginTop: '40px',
                                        marginBottom: '40px'

                                    }}  variant="contained" color="primary"

                                    onClick={() => {

                                        console.log(emp)
                                        if(emp!==0){
                                            console.log(emp)
setEmpURL("employee="+emp+"&")
                                        }
                                        if(emp.length===0){
                                            setEmpURL("")
                                        }
                                        if(to!==0){
                                            setToURL("to="+to+"&")
                                        }
                                        if(to===0){
                                            setToURL("")
                                        }
                                        if(from!==0){
                                            setFromURL("from="+from+"&")
                                        }
                                        if(from===0){
                                            setFromURL("")
                                        }


                                        const leaveType = {
                                            "holidayName": name,
                                            "holidayDate": date_of_birth,
                                            "isRepeatedAnnually":check1,
                                            "holidayType":date


                                        }
                                        console.log('/attendance/all?'+empURL+fromURL+toURL)
                                        return axios.get('/attendance/all?'+empURL+fromURL+toURL, {
                                            headers: {
                                                Authorization: `Bearer ${tokenString}`,
                                                'content-type': 'application/json'
                                            }
                                        }).then(function (r) {
                                                setName('')

                                                setAttData(r.data.data)
                                            }
                                        )
                                            .catch(function (error) {
                                                setAttData([])
                                                alert("404 Not Found")
                                                console.log(error);
                                            })
                                    }
                                    }
                                > Search</Button>
                            </form>

                    </div>
                    <MUIDataTable
                        title="Holidays"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}