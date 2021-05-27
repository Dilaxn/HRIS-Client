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
import Link from "@material-ui/core/Link";


export default function AddProject() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <h1>Add Project</h1>
                <Grid container>
                    <text style={{marginRight: 30}}>Customer Name *</text>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Type for hint... "/>
                </Grid> <br/><br/><Grid container>
                    <text style={{marginRight: 30}}> Name *</text>
                    <TextareaAutosize aria-label="empty textarea" placeholder=" "/>
                </Grid> <br/><br/>
                <Grid container>
                    <text style={{marginRight: 30}}>Project Admin</text>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Type for hint... "/>
                </Grid>
                <br/><br/><Grid container>
                    <text style={{marginRight: 30}}>Description</text>
                    <TextareaAutosize aria-label="empty textarea" placeholder="Type for hint... "/>
                </Grid>
                <br/><br/>
            </MuiPickersUtilsProvider> <br/><br/>
            <Grid container>
                <text style={{marginRight: 30}}>* Required field</text>
            </Grid> <br/>
            <Button variant="contained" color="primary" style={{margin: 20}}>
                Save
            </Button>
            <Link to="/app/time/projectInfo/projects">
            <Button variant="contained" style={{margin: 20}}>
                Cancle
            </Button>
            </Link>
        </div>
    );
}
