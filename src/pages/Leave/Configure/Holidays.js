import {Button, FormControlLabel, MenuItem, Radio, RadioGroup, TextField} from "@material-ui/core";
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


export default function Holidays(props) {
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
    const handleDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setDate_of_birth(dat);
    };
    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllLeaveTypes().then(r => setLeaveTypeData(r))
        readAllHolidays().then(r=>{
            console.log(r)
            setHolidayData(r)
        })
    }, [showForm]);
    let details = [];
    if (holidayData) {
        holidayData.map(y => {
            const data = [
                y.holidayName,
                y.holidayDate,
                y.holidayType,
                JSON.stringify(y.isRepeatedAnnually),
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
                return axios.delete('/api/holidays', {
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
            name: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "Date",
            options: {
                display: true,
            }
        },
        {
            name: "Full/Half Day",
            options: {
                display: true,
            }
        },
        {
            name: "Repeats Annually",
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
                            {!showForm && (
                                <Button style={{
                                    margin: 'auto',
                                    width: "100%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'

                                }} onClick={showF} variant="contained" color="primary"> Add Holiday</Button>)}
                            {showForm && (
                                <Button style={{
                                    margin: 'auto',
                                    width: "100%",
                                    align: 'center',
                                    marginTop: '40px',
                                    marginBottom: '40px'
                                }} onClick={showF} variant="contained" color="primary">  Cancel</Button>)}
                        </form>

                        {showForm && (
                            <form>
                                <TextField style={{width:"100%"}} id="outlined-search" label="Name"
                                           value={name}
                                           onChange={e => setName(e.target.value)}    type="search" variant="outlined"/>

                                <KeyboardDatePicker
                                    style={{marginTop:'25px',width:'100%'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                   value={date_of_birth}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                           <br/> <br/>
                                <label>
                                    Repeats annually:
                                    <select value={check1} onChange={handleDateChangeCheck}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </label>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={date}
                                    select
                                    label="FullDay/HalfDay"
                                    onChange={e => setDate(e.target.value)}
                                    helperText="Please select FullDay/HalfDay"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <br/>
                                <button
                                    style={{
                                        margin: 'auto',
                                        width: "25%",
                                        align: 'center',
                                        marginTop: '40px',
                                        marginBottom: '40px'

                                    }}  variant="contained" color="primary"
                                    disabled={
                                        name.length === 0
                                    }
                                    onClick={() => {
                                        const leaveType = {
                                            "holidayName": name,
                                            "holidayDate": date_of_birth,
                                            "isRepeatedAnnually":check1,
                                            "holidayType":date


                                        }

                                        return axios.post('/api/holidays', leaveType, {
                                            headers: {
                                                Authorization: `Bearer ${tokenString}`,
                                                'content-type': 'application/json'
                                            }
                                        }).then(function (response) {
                                                setName('')

                                                readAllHolidays().then(r => setHolidayData(r))
                                            }
                                        )
                                            .catch(function (error) {
                                                console.log(error);
                                            })
                                    }
                                    }
                                > Save</button>
                            </form>
                        )}
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