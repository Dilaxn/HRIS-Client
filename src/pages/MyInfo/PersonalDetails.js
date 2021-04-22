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
export default function PersonalDetails(props) {
let value=props.value
  let  handleChange=props.handleChange
    return (
        <div>
            <div>
                {/* eslint-disable-next-line react/jsx-no-undef */}

                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>

                <hr/>
                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Search field" type="search"
                           variant="outlined"/>

                <hr/>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel>
                <RadioGroup aria-label="quiz" name="quiz" value={value} defaultChecked={"best"}>
                    <FormControlLabel value="best" control={<Radio/>} label="The best!"/>
                    <FormControlLabel value="worst" control={<Radio/>} label="The worst."/>
                </RadioGroup>
                <FormHelperText>{"hhdjj"}</FormHelperText>
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
                    style={{margin: "20px"}}>
                    {/*{currencies.map((option) => (*/}
                    {/*    <MenuItem key={option.value} value={option.value}>*/}
                    {/*        {option.label}*/}
                    {/*    </MenuItem>*/}
                    {/*))}*/}
                </TextField>
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
                    style={{margin: "20px"}}>
                    {/*{currencies.map((option) => (*/}
                    {/*    <MenuItem key={option.value} value={option.value}>*/}
                    {/*        {option.label}*/}
                    {/*    </MenuItem>*/}
                    {/*))}*/}
                </TextField>
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
                    style={{margin: "20px"}}>
                    {/*{currencies.map((option) => (*/}
                    {/*    <MenuItem key={option.value} value={option.value}>*/}
                    {/*        {option.label}*/}
                    {/*    </MenuItem>*/}
                    {/*))}*/}
                </TextField>
            </div>
            <MUIDataTable
                title="Employee List"
                data={datatableData}
                columns={["Name", "Company", "City", "State"]}
                options={{
                    filterType: "checkbox",
                }}
            />
        </div>
    );
}