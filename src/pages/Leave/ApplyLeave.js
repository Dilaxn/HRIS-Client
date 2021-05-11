import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import MUIDataTable from "mui-datatables";
import MenuItem from "@material-ui/core/MenuItem";
import Calendar from 'react-input-calendar';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import {countAllEmployees} from "../../context/EmployeeContext";
import {readAllNationalities} from "../../context/OrganizationContext";
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];
const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
const mStatus = [
    {
        value: 'married',
        label: 'Married',
    },
    {
        value: 'single',
        label: 'Single',
    },
];


export default function ApplyLeave() {

    //


    // let value=props.value
    // let  handleChange=props.handleChange
    return (
        <div>
            <FormControlLabel
                control={
                    // eslint-disable-next-line react/jsx-no-undef
                    <Switch
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        name="checkedB"
                        color="primary"
                        // onChange={}
                    />
                }
                label="Edit"
            />
            <div>
                <fieldset>



                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container >
                            <TextField
                                // defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select
                                label="Marital Status"
                                // onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {/*{mStatus.map((option) => (*/}
                                {/*    <MenuItem key={option.value} value={option.value}>*/}
                                {/*        {option.label}*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                            </TextField>
                            <TextField
                                // defaultValue={marital_status} value={marital_status}
                                id="outlined-select-currency-native"
                                select
                                label="Marital Status"
                                // onChange={e => setMarital_status(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {/*{mStatus.map((option) => (*/}
                                {/*    <MenuItem key={option.value} value={option.value}>*/}
                                {/*        {option.label}*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                            </TextField>
                            {/*{console.log(nationality)}*/}
                            <TextField
                                id="outlined-select-currency-native"
                                // value={nationalityName}
                                // defaultValue={nationalityName}
                                select
                                label="Nationality"
                                // onChange={handleChange3}
                                helperText="Please select your Nationality"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {/*{nationalities.map((option) => (*/}
                                {/*    <MenuItem key={option} value={option}>*/}
                                {/*        {option.name}*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                            </TextField>

                            <KeyboardDatePicker
                                style={{marginTop:'25px'}}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                // defaultValue={date_of_birth} value={date_of_birth}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Gender" type="search"
                                      variant="outlined" />
                        </Grid>
                    </MuiPickersUtilsProvider>



                </fieldset>



            </div>

        </div>
    );
}