import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect} from "react";
import FormControl from "@material-ui/core/FormControl";
import MUIDataTable from "mui-datatables";
import MenuItem from "@material-ui/core/MenuItem";

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
        value: 'Married',
        label: 'Married',
    },
    {
        value: 'Single',
        label: 'Single',
    },
];


export default function PersonalDetails(props) {

    const handleChange2 = (event) => {
        console.log(event.target.value)
        setGender(event.target.value)
      };
      const handleChange3 = (event) => {
        setMarriage(event.target.value);
      };
    const handleChange4 = (event) => {
        setNationality(event.target.value);
    };
    const [nationalities, setNationalities] = React.useState([]);
    const [nationality, setNationality] = React.useState([]);

    const [marriage, setMarriage] = React.useState('');

    const [edit, setEdit] = React.useState('');
    const [gender, setGender] = React.useState('');

    useEffect(() => {
        readAllNationalities().then(r => setNationalities(r));
    }, []);
    console.log(nationalities);
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

                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="First Name" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Middle Name" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="Last Name" type="search"
                           variant="outlined"/>

                <hr/>
                <TextField Col xs={6} style={{margin: "20px"}} id="outlined-search" label="Employee ID" type="search"
                           variant="outlined"/>
                <TextField style={{margin: "20px"}} id="outlined-search" label="License Expiry Date" type="search"
                           variant="outlined"/>
                
                <FormControl component="fieldset" style={{margin: "20px"}}>
                <FormLabel component="legend">User Status</FormLabel>
                <div onChange={handleChange2}>
                  <input type="radio" value="true" name="gender"/> Male
                  <input type="radio" value="false" name="gender"/> False
                </div>
              </FormControl>
                <hr/>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Marital Status"
                    value={marriage}
                    onChange={handleChange3}

                    helperText="Please select your currency"
                    variant="outlined"
                    style={{margin: "20px"}}>
                    {mStatus.map((option) => (
                       <MenuItem key={option.value} value={option.value}>
                           {option.label}
                       </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Nationality"
                    value={nationality}
                    onChange={handleChange4}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your currency"
                    variant="outlined"
                    style={{margin: "20px"}}>
                    {nationalities.map((option) => (
                        <MenuItem key={option._id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Date of Birth"
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