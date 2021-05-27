import {Button, TextField} from "@material-ui/core";

import React, {useEffect, useState} from "react";

import axios from "axios";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export default function LeavePeriod() {
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

    const [date_of_birth, setDate_of_birth] = React.useState('2021-05-28');
    const handleDateChange = (date) => {
        console.log(date)
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
                setDate_of_birth(response.data.data.updatedLeavePeriod.future.startDate);

            }
        )
            .catch(function (error) {
                console.log(error);
            })
    };
    const tokenString = localStorage.getItem('id_token');
    let showF = () => {
        setShowForm(!showForm);
    }
    useEffect(() => {
        return axios.patch('/leavePeriod/configure', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then( response=> {
            console.log(response.data.data.updatedLeavePeriod.current.startDate)
                setStartDate(response.data.data.updatedLeavePeriod.future.startDate)
            setEndDate(response.data.data.updatedLeavePeriod.future.endDate)
            return ''
            }
        )
            .catch( error =>{
                console.log(error);
            })
    }, []);

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
                            </form>
                        )}
                    </div>

                </MuiPickersUtilsProvider>
            </fieldset>
        </div>
    );
}