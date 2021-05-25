import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";

import axios from "axios";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {useHistory} from "react-router";
import {readAllMyDependents} from "../../../context/DependentContext";


export default function LeavePeriod(props) {
    let [showForm, setShowForm] = useState(false);
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');

    var month=new Array();
    month[0]="January";
    month[1]="February";
    month[2]="March";
    month[3]="April";
    month[4]="May";
    month[5]="June";
    month[6]="July";
    month[7]="August";
    month[8]="September";
    month[9]="October";
    month[10]="November";
    month[11]="December";
    let [name, setName] = useState("");

    const [date_of_birth, setDate_of_birth] = React.useState('');
    const handleDateChange = (date) => {
        console.log(date)
        let date1 = date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
        let date2 = (date.getFullYear()+1)+'/' + (date.getMonth()+1) + '/'+date.getDate();
        let dates= {
            "startMonth":month[date.getMonth()],
            "startDay":date.getDate()
        }
        return axios.patch('/leavePeriod/configure', dates, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(function (response) {
            setStartDate(response.data.data.updatedLeavePeriod.future.startDate)
            setEndDate(response.data.data.updatedLeavePeriod.future.endDate)
            }
        )
            .catch(function (error) {
                console.log(error);
            })

        console.log(month[date.getMonth()+1])
        setDate_of_birth(date1);
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }
    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllMyDependents().then(r => setDependentsData(r))
        return axios.patch('/leavePeriod/configure', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data.data.updatedLeavePeriod.current.startDate)
                setStartDate(response.data.data.updatedLeavePeriod.future.startDate)
            setEndDate(response.data.data.updatedLeavePeriod.future.endDate)
            }
        )
            .catch(function (error) {
                console.log(error);
            })
    }, [""]);

    let value=props.value
    let  handleChange=props.handleChange
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

                                }} onClick={showF} variant="contained" color="primary"> Add Leave Period</Button>)}
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
                                <KeyboardDatePicker
                                    style={{marginTop:'25px'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                    minDate={new Date('2021-05-28')}
                                    maxDate={new Date('2022-05-28')}
                                    defaultValue={date_of_birth} value={date_of_birth}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                                <br/>
                                <TextField style={{width:"100%",marginTop:"20px"}} id="outlined-search" label="Leave Type"
                                           value={startDate} disabled
                                         />
                                <br/>
                                <TextField style={{width:"100%",marginTop:"20px"}} id="outlined-search" label="Leave Type"
                                           value={endDate}
                                           disabled
                                           onChange={e => setName(e.target.value)}    type="search" />

                                <br/>
                                {/*<button*/}
                                {/*    style={{*/}
                                {/*        margin: 'auto',*/}
                                {/*        width: "25%",*/}
                                {/*        align: 'center',*/}
                                {/*        marginTop: '40px',*/}
                                {/*        marginBottom: '40px'*/}

                                {/*    }}  variant="contained" color="primary"*/}
                                {/*    disabled={*/}
                                {/*        name.length === 0*/}
                                {/*    }*/}
                                {/*    onClick={() => {*/}
                                {/*        const dependent = {*/}
                                {/*            "name": name*/}


                                {/*        }*/}

                                {/*        function clean(obj) {*/}
                                {/*            for (let x in obj) {*/}
                                {/*                if (obj[x] === "" || obj[x] === undefined) {*/}
                                {/*                    delete obj[x];*/}
                                {/*                }*/}
                                {/*            }*/}
                                {/*            return obj*/}
                                {/*        }*/}

                                {/*        const dDetails = clean(dependent)*/}
                                {/*        console.log(dependent)*/}
                                {/*        return axios.post('/employees/me/dependents', dDetails, {*/}
                                {/*            headers: {*/}
                                {/*                Authorization: `Bearer ${tokenString}`,*/}
                                {/*                'content-type': 'application/json'*/}
                                {/*            }*/}
                                {/*        }).then(function (response) {*/}
                                {/*                setName('')*/}

                                {/*                readAllMyDependents().then(r => setDependentsData(r))*/}
                                {/*            }*/}
                                {/*        )*/}
                                {/*            .catch(function (error) {*/}
                                {/*                console.log(error);*/}
                                {/*            })*/}
                                {/*    }*/}
                                {/*    }*/}
                                {/*> Save</button>*/}
                            </form>
                        )}
                    </div>

                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}