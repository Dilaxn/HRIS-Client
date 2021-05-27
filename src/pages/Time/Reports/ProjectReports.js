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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function ProjectReports() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <h1>Project Report</h1>
                <Grid container>
                    <text style={{marginRight:30}}>Project Name *</text>
                    <TextareaAutosize aria-label="empty textarea" placeholder="--No Project--" />
                </Grid> <br/><br/>
                <Grid container  >

                    <text style={{marginRight:30}}>Project Date Range</text>
                    <text style={{marginRight:30}}>From</text>
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
                    /> <text style={{marginRight:30,paddingLeft:20}}>To</text>
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

                <FormControl component="fieldset">

                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="primary" />}
                            label="Only Include Approved Timesheets"
                            labelPlacement="start"
                        />

                    </FormGroup>
                </FormControl>
            </MuiPickersUtilsProvider> <br/><br/>
            <Grid container>
                <text style={{marginRight:30}}>* Required field</text>
            </Grid> <br/>
            <Button variant="contained" color="primary">
                View
            </Button>

        </div>
    );
}
