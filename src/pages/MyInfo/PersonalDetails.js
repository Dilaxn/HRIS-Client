import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
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

    const [edit, setEdit] = React.useState('');

    const checkEdit = (event) => {
        setEdit(!edit)
        // console.log(name)
        //
        //
        // const orgDetails = {
        //     "organization_name": name,
        //     "tax_id": tax_id,
        //     "registration_number": regNo,
        //     "organization_phone": phone,
        //     "organization_email": email,
        //     "organization_fax": fax,
        //     "organization_street_1": street1,
        //     "organization_street_2": street2,
        //     "organization_city": city,
        //     "organization_province": province,
        //     // "country": country,
        //     "organization_postal_code": zip,
        //     "organization_note": note
        //
        // }
        // return axios.patch('http://localhost:3001/organization/general/info', orgDetails, {
        //     headers: {
        //         Authorization: `Bearer ${tokenString}`,
        //         'content-type': 'application/json'
        //     }
        // }).then(res => {
        //         setResData(res.data);
        //         setName(res.data.organization_name);
        //         setTax_id(res.data.tax_id);
        //         setProvince(res.data.organization_province);
        //         setCity(res.data.organization_city);
        //         setRegNo(res.data.registration_number);
        //         setStreet1(res.data.organization_street_1);
        //         setStreet2(res.data.organization_street_2);
        //         setPhone(res.data.organization_phone);
        //         setEmail(res.data.organization_email);
        //         setFax(res.data.organization_fax);
        //         setZip(res.data.organization_postal_code);
        //         setNote(res.data.organization_note);
        //
        //         console.log(res.data);
        //     }
        // )
        //     .catch(err => {
        //         console.log(err)
        //     })
    }


let value=props.value
  let  handleChange=props.handleChange
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
                        onChange={checkEdit}
                    />
                }
                label="Edit"
            />
            <div>
                <fieldset disabled={!edit}>
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
                <FormLabel component="legend">Hello...</FormLabel>
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
                </fieldset>
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