import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export default function PunchInOut() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h1>Punch In</h1>
            <Grid container  >

                <text style={{marginRight:30}}>Date</text>
                <text>2021-05-26</text>


            </Grid> <br/>
            <Grid container>
                <text style={{marginRight:30}}>Time</text>
                <text>14:04 HH:MM</text>
            </Grid>
            <br/>
            <Grid container>
                <text style={{marginRight:30}}>Note</text>
                <TextareaAutosize aria-label="empty textarea" placeholder="" />
            </Grid>
            <br/><br/>
            <Button variant="contained" color="primary">
                In
            </Button>
        </div>
    );
}
