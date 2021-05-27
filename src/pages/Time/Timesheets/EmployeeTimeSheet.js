import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EmployeeTimeSheet() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <h1>Select Employee</h1>
                <TextField required id="standard-required" label="Required" defaultValue="Employee Name" />

            </div>
            <Button variant="contained" color="primary">
                View
            </Button>
        </form>
    );
}
