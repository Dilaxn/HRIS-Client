import {FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import MUIDataTable from "mui-datatables";
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
export default function ContactDetails(props) {
    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>
            {/* eslint-disable-next-line react/jsx-no-undef */}

            <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField  style={{margin:"20px"}}  id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField
                id="outlined-select-currency-native"
                select
                label="Native select"
                value={'currency'}
                onChange={handleChange}
                SelectProps={{
                    native: true,
                }}
                helperText="Please select your currency"
                variant="outlined"
                style={{margin:"10px"}}
            >
                {/*{currencies.map((option) => (*/}
                {/*    <MenuItem key={option.value} value={option.value}>*/}
                {/*        {option.label}*/}
                {/*    </MenuItem>*/}
                {/*))}*/}
            </TextField>
            <hr/>
            <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField  style={{margin:"20px"}}  id="outlined-search" label="Search field" type="search" variant="outlined" />
            <hr/>  <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />

        </div>
    );
}