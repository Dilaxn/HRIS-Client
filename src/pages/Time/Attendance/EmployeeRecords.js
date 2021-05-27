import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

export default function EmployeeRecords() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h1>View Attendance Record</h1>
            <Grid container>
                <text style={{marginRight:30}}>Employee Name</text>
                <TextareaAutosize aria-label="empty textarea" placeholder="Type for hints..." />
            </Grid> <br/><br/>
            <Grid container  >

                <text style={{marginRight:30}}>Date*</text>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    // label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid> <br/><br/>
            <Grid container>
                <text style={{marginRight:30}}>* Required field</text>
            </Grid> <br/>
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary">
        View
        </Button>
    </div>
    );
}
