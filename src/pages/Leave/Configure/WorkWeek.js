import {Button, FormControlLabel, MenuItem, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {getToken} from "../../../context/UserContext";
import {readAllLeaveTypes} from "../../../context/LeaveContext/LeaveConfigureContext";


export default function WorkWeek(props) {
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [check1, setCheck1] = useState(false);
    let [leaveTypeData, setLeaveTypeData]  = useState([]);




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
    let [monday, setMonday] = useState('');
    let [tuesday, setTuesday]  = useState('');
    let [wednesday, setWednesday]  = useState('');
    let [thursday, setThursday]  = useState('');
    let [friday, setFriday] = useState('');
    let [saturday, setSaturday]  = useState('');
    let [sunday, setSunday] = useState('');

    let [opp, setOpp] = useState([]);


    let handleChange2 = (event) => {
        console.log(event.target.value.name)
        //
        // se(event.target.value._id);
        // setCountryName(event.target.value.name);
    };
    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllLeaveTypes().then(r => setLeaveTypeData(r))
        let op= [
            {name:"FullDay",id:"full"},
            {name:"HalfDay",id:"half"},
            {name:"Non-Working Day",id:"non"}
        ]
        setOpp(op)
    }, [""]);
    let details = [];
    if (leaveTypeData) {
        leaveTypeData.map(y => {
            const data = [
                y.leaveTypeName,
                JSON.stringify(y.isEntitlementSituational),
                y._id
            ]
            details.push(data);
        });
    }
    const [edit, setEdit] = React.useState(false);

    useEffect(() => {
        axios.patch('/workWeek', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                setMonday(res.data.updated.monday);
                setTuesday(res.data.updated.tuesday);
                setWednesday(res.data.updated.wednesday);
                setThursday(res.data.updated.thursday);
                setFriday(res.data.updated.friday);
                setSaturday(res.data.updated.saturday);
                setSunday(res.data.updated.sunday);

                // console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }, []);
    const checkEdit = (event) => {
        setEdit(!edit)
        const x  = {
            "sunday": sunday,
            "monday": monday,
            "tuesday": tuesday,
            "wednesday": wednesday,
            "thursday": thursday,
            "friday":friday ,
            "saturday": saturday


        }

        console.log(x)
        return axios.patch('/workWeek', x, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            setMonday(res.data.updated.monday);
            setTuesday(res.data.updated.tuesday);
            setWednesday(res.data.updated.wednesday);
            setThursday(res.data.updated.thursday);
            setFriday(res.data.updated.friday);
            setSaturday(res.data.updated.saturday);
            setSunday(res.data.updated.sunday);

                console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
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
                let x = rowData[2]
                let id = x
                console.log(x)
                return axios.delete('/leaveTypes', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({id})
                })
                    .then(function (response) {
                        readAllLeaveTypes().then(r => setLeaveTypeData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Leave Type",
            options: {
                display: true,
            }
        },
        {
            name: "Is entitlement situational",
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


                            <form disabled={!edit}>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={monday}
                                    select
                                    label="Monday"
                                    onChange={e => setMonday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={tuesday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setTuesday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={wednesday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setWednesday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={thursday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setThursday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={friday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setFriday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={saturday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setSaturday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="outlined-select-currency-native"
                                    value={sunday}
                                    select
                                    label="FluencyData"
                                    onChange={e => setSunday(e.target.value)}
                                    helperText="Please select your currency"
                                    variant="outlined"
                                    style={{marginTop: "20px",width:"100%"}}>
                                    {opp.map((option) => (
                                        <MenuItem key={option.name} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>


                                <br/>

                            </form>

                    </div>

                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}



