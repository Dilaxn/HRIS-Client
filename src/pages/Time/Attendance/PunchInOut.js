import 'date-fns';
import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {loginUser} from "../../../context/UserContext";
import axios from "axios";
import {readAllWorkShifts} from "../../../context/JobContext";
import {readPunch} from "../../../context/TimeContext/PunchContext";
new Date().toLocaleString()

export default function PunchInOut() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [pIn, setPIn] = React.useState(new Date().toLocaleString());
    const [pIn1, setPIn1] = React.useState(new Date());
    const [pinchIn, setPinchIn]  = React.useState('');
    const [pinchInTime, setPinchInTime]  = React.useState('');

    const [note, setNote]   = React.useState('');
    const tokenString = localStorage.getItem('id_token');
    const headers = {Authorization: `Bearer ${tokenString}`,}
    // console.log(pIn1)
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
readPunch().then(r=>{
    if(r){
        setPinchIn(r.punchInTime.toLocaleString().split('T')[0]);
        setPinchInTime(r.punchInTime.toLocaleString().split('T')[1].split('+')[0]);

    }
    // console.log(r)

})
    }, ["/app/admin/job/workShifts"]);

    let handlePinchIn = (pIn) => {
        // console.log(props.props.props)
        // // console.log(event.target.key)
        let c =pIn.split(",")
        let d=c[0].split("/")
        // let dat = pIn1.getFullYear()+'-' + (pIn1.getMonth()+1) + '-'+pIn1.getDate();

        let dd= d[2]+"-"+d[1]+"-"+d[0]+" "+c[1]+".000+05:30"
        console.log(dd);

    };
    let handlePinchOut = (pIn1) => {
        // console.log(props.props.props)
        // // console.log(event.target.key)
        let c =pIn.split(",")
        let d=c[0].split("/")
        // let dat = pIn1.getFullYear()+'-' + (pIn1.getMonth()+1) + '-'+pIn1.getDate();

        let dd= d[2]+"-"+d[1]+"-"+d[0]+" "+c[1]+".000+05:30"
        console.log(dd);

    };
    return (
        <div style={{alignItems:"center",marginLeft:"50px",marginRight:"50px"}}>
            <h1>Date & Time Now</h1>
            <Grid container  >

                <text style={{marginRight:30}}>Date</text>
                <text>{pIn.split(",")[0]}</text>


            </Grid> <br/>
            <Grid container>
                <text style={{marginRight:30}}>Time</text>
                <text>{pIn.split(",")[1]}</text>
            </Grid>
            <br/>
            <Grid container>
                <text style={{marginRight:30}}>Note</text>
                <TextareaAutosize onChange={event => setNote(event.target.value)} aria-label="empty textarea" placeholder="" />
            </Grid>
            <br/><br/>

            <Button
                // disabled={
                //     jobTitle.length === 0 || jobDescription.length === 0
                // }

                onClick={() =>
                    axios.post("/attendance/punchIn", {
                            note: note
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${tokenString}`,
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(function (r) {
                            setPIn(new Date().toLocaleString())
                            console.log(r.data)
                            setPinchIn(r.data.data.punchInTime.toLocaleString().split('T')[0]);
                            setPinchInTime(r.data.data.punchInTime.toLocaleString().split('T')[1].split('+')[0]);
                            alert("punchedIn")
                        })
                        .catch(function (error) {
                          alert("Already Punched in please punch out first")
                        })
                }
                variant="contained"
                color="primary"
                size="large"
            >
                Punch In
            </Button>
            <Button
                // disabled={
                //     jobTitle.length === 0 || jobDescription.length === 0
                // }
style={{marginLeft: "30px"}}
                onClick={() =>
                    axios.patch("/attendance/punchOut", {
                            note: note
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${tokenString}`,
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(function (response) {
                            setPIn(new Date().toLocaleString())
                            setPinchInTime("")
                            setPinchIn("")
                            alert("punchedOut")

                        })
                        .catch(function (error) {
                            alert("First you must Punch In")
                        })
                }
                variant="contained"
                color="primary"
                size="large"
            >
                Punch Out
            </Button>
            <div style={{width:"40%"}}>
            <h1>Punched In</h1>
            <Grid container  >

                <text style={{marginRight:30}}>Date</text>
                <text>{pinchIn}</text>


            </Grid> <br/>
            <Grid container>
                <text style={{marginRight:30}}>Time</text>
                <text>{pinchInTime}</text>
            </Grid>
            </div>

        </div>
    );
}
