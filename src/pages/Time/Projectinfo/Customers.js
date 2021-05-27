import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCustomer from "./AddCustomer";
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Customers() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>Customers</h2>

           <Link to="/app/time/projectInfo/addCustomer">
               <Button variant="contained" color="primary" >
                Add
            </Button>
           </Link>
            <Button variant="contained" color="secondary">
                Delete
            </Button>

        </div>
    );
}
