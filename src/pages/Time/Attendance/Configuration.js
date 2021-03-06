import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Configuration() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return (
        <div>
            <h2>Attendance Configuration</h2>
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Assign responsibility</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                        label="Employee can change current time when punching in/out"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                        label="Employee can edit/delete own attendance records"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                        label="Supervisor can add/edit/delete attendance records of subordinates"
                    />
                </FormGroup>

            </FormControl>

        </div>
        <Grid container>
    <Button variant="contained" color="primary">
        Save
        </Button>
</Grid>
        </div>
    );
}
