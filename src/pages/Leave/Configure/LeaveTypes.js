import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
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


export default function LeaveTypes(props) {
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

    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllLeaveTypes().then(r => setLeaveTypeData(r))
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
                <form>
                    {!showForm && (
                        <Button style={{
                            margin: 'auto',
                            width: "100%",
                            align: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'

                        }} onClick={showF} variant="contained" color="primary"> Add Leave Type</Button>)}
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
                        <TextField style={{width:"100%"}} id="outlined-search" label="Leave Type"
                                   value={name}
                                   onChange={e => setName(e.target.value)}    type="search" variant="outlined"/>
                       <br/> <br/>
                        <label>
                           Is entitlement situational:
                            <select value={check1} onChange={handleDateChangeCheck}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </label>
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
                                    "leaveTypeName": name,
                                    "isEntitlementSituational": check1


                                }

                                return axios.post('/leaveTypes', leaveType, {
                                    headers: {
                                        Authorization: `Bearer ${tokenString}`,
                                        'content-type': 'application/json'
                                    }
                                }).then(function (response) {

                                        readAllLeaveTypes().then(r => setLeaveTypeData(r))
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
                title="Leave Type"
                data={details}
                columns={columns}
                options={options}
            />
                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}