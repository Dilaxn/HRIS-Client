import 'date-fns';
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory} from "react-router";


export default function AddCustomer() {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    var [name, setName]  = useState("");
    var [description, setDescription] = useState("");
    let history = useHistory()

    const tokenString = localStorage.getItem('id_token');
    const headers = {Authorization: `Bearer ${tokenString}`,
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <h1>Add Customer</h1>
                <Grid container>
                    <text style={{marginRight: 30}}>Name *</text>
                    <TextareaAutosize aria-label="empty textarea" value={name} onChange={e => setName(e.target.value)} placeholder="Type for hint... "/>
                </Grid> <br/><br/>
                <Grid container>
                    <text style={{marginRight: 30}}>Description</text>
                    <TextareaAutosize value={description} onChange={e => setDescription(e.target.value)} aria-label="empty textarea" placeholder=""/>
                </Grid>
                 <br/><br/>
            </MuiPickersUtilsProvider> <br/><br/>
            <Grid container>
                <text style={{marginRight: 30}}>* Required field</text>
            </Grid> <br/>
            <Button
                disabled={name.length===0}
                variant="contained" color="primary" style={{margin: 20}}
                    onClick={() =>
                        axios.post("/customers", {
                                customerName: name,
                                description: description
                            },
                            {
                                headers: headers
                            })
                            .then(function (response) {
                                setDescription("");
                                setName("")
alert('Successfully Added')
                            })
                            .catch(function (error) {
alert("Something went wrong")                            })
                    }
            >
                Add
            </Button>
            <Button
                onClick={() =>
                            history.push('/app/time/projectInfo/customers')

                }
                variant="contained" style={{margin: 20}}>
                Cancel
            </Button>

        </div>
    );
}
