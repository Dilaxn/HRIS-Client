import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {Switch, TextField} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import {readAllJobs} from "../../../context/JobContext";
import {countAllEmployees} from "../../../context/EmployeeContext";
import {readAllCountries} from "../../../context/CountryContext";
import axios from "axios";

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



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function GeneralInformation() {
  const [name, setName] = React.useState('Composed TextField');
    const [noOfEmp, setNoOfEmp] = React.useState(0);
const [countryList,setCountryList] = React.useState([])
    const [edit, setEdit]  = React.useState(true);
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

    const tokenString = localStorage.getItem('id_token');

    const checkEdit = (event) => {
        setEdit(!edit);

            return  axios.patch('http://localhost:3001/organization/general/info',{data:orgDetails,
            headers:{
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
            }).then(value => setOrgDetails(value))
                .catch(err=>{
                console.log(err)})
        }




    useEffect(() => {
        countAllEmployees().then(r => setNoOfEmp(r));
    }, []);
    useEffect(() => {
        readAllCountries().then(r => setCountryList(r));
    }, []);

const [orgDetails,setOrgDetails]=React.useState({
    "organization_name": "Team Epic",
    "tax_id": "435356",
    "registration_number": "4453456k",
    "organization_phone": "0110033234",
    "organization_email": "epic@ep.co",
    "organization_fax": "02343435667",
    "organization_street_1": "str1",
    "organization_street_2": "str2",
    "organization_city": "Colombo",
    "organization_province": "West",
    "country": "602ac338f70c780b02806897",
    "organization_postal_code": "3435344",
    "organization_note": "note"
})


  return (
      <div>
          <Switch
              // checked={}
               onChange={checkEdit}

              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
    <form  className={classes.root} noValidate autoComplete="off">
<fieldset disabled={edit}>
      {/*<FormControl disabled>*/}
      {/*  <InputLabel htmlFor="component-disabled">Name</InputLabel>*/}
      {/*  <Input id="component-disabled" value={name} onChange={handleChange} />*/}
      {/*  <FormHelperText>Disabled</FormHelperText>*/}
      {/*</FormControl>*/}
<h1 style={{marginBottom: "30px"}}>General Information</h1>
      <FormControl variant="outlined">
        <InputLabel htmlFor="">Name</InputLabel>
        <OutlinedInput id=""  style={{paddingRight: "100px", textAlign:"left"}} defaultValue={orgDetails.organization_name} onChange={setOrgDetails.organization_name} />
      </FormControl>
      <FormControl variant="outlined" style={{marginLeft: "10%"}}>
        <InputLabel htmlFor="component-outlined">Tax ID</InputLabel>
        <OutlinedInput id="component-outlined"  defaultValue={orgDetails.tax_id}  onChange={setOrgDetails.tax_id} label="Name" />
      </FormControl>
      <FormControl variant="outlined" style={{marginLeft: "10%"}}>
      <InputLabel htmlFor="component-outlined">No</InputLabel>
      <OutlinedInput id="component-outlined"  defaultValue={noOfEmp}  onChange={setOrgDetails.tax_id} label="Name" />
</FormControl>
      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}>Registration Number</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.registration_number} style={{paddingRight: "100px"}} onChange={setOrgDetails.registration_number} label="Registration Number" />
      </FormControl>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 1
        }}
      />
    <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px",marginBottom:"20px"}}>
        <InputLabel htmlFor="component-outlined">Phone</InputLabel>
        <OutlinedInput id="component-outlined"  style={{paddingRight: "100px", textAlign:"left"}} defaultValue={orgDetails.organization_phone} onChange={setOrgDetails.organization_phone} label="Phone" />
      </FormControl>
    <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px",marginBottom:"20px"}}>
        <InputLabel htmlFor="component-outlined">Fax</InputLabel>
        <OutlinedInput id="component-outlined"  defaultValue={orgDetails.organization_fax} onChange={setOrgDetails.organization_fax} label="Name" />
      </FormControl>
    <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px",marginBottom:"20px"}}>
        <InputLabel htmlFor="component-outlined">Email</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_email} onChange={setOrgDetails.organization_email} label="Email" />
      </FormControl>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 1
        }}
      />
      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}>Address Street 1</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_street_1} style={{paddingRight: "100px"}} onChange={setOrgDetails.organization_street_1} label="Street 1"  />
      </FormControl>
      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}>Address Street 2</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_street_2} style={{paddingRight: "100px"}} onChange={setOrgDetails.organization_street_2} label="StreetStreet 2" />
      </FormControl>

      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined"> City</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_city} style={{paddingRight: "100px"}} onChange={setOrgDetails.organization_city} label="City" />
      </FormControl>
      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}> Province</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_province} style={{paddingRight: "100px"}} onChange={setOrgDetails.organization_province} label="Province" />
      </FormControl>
      <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}>Zip/Postal Code</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_postal_code} style={{paddingRight: "100px"}} onChange={setOrgDetails.organization_postal_code} label="Name" />
      </FormControl>
      {/*<TextField*/}
      {/*  id="outlined-select-currency"*/}
      {/*  select*/}
      {/*  label="Select"*/}
      {/*  value={"2000"}*/}
      {/*  onChange={handleChange}*/}
      {/*  helperText="Please select your currency"*/}
      {/*  variant="outlined"*/}
      {/*>*/}
      {/*  {currencies.map((option) => (*/}
      {/*    <MenuItem key={option.value} value={option.value}>*/}
      {/*      {option.label}*/}
      {/*    </MenuItem>*/}
      {/*  ))}*/}
      {/*</TextField>*/}
    <FormControl variant="outlined"  style={{marginTop: "30px",paddingRight: "100px", width:"100%"}}>
        <InputLabel htmlFor="component-outlined" style={{backgroundColor:"white"}}>Zip/Postal Code</InputLabel>
        <OutlinedInput id="component-outlined" defaultValue={orgDetails.organization_postal_code} style={{paddingRight: "100px"}} onChange={handleChange} label="Name" />
    </FormControl>
      <TextField style={{marginTop: "30px",paddingRight: "100px", width:"100%"}}
        id="outlined-select-currency"
        select = {!edit}
        label="Select"
        value={name}
        onChange={handleChange}
        helperText="Organization Country"
        variant="outlined"
      >
        {countryList.map((option) => (
          <MenuItem key={option.code} value={option.name}>
            {option.name}
          </MenuItem>
        ))}

      </TextField>


      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 1
        }}
      />
</fieldset>
    </form>
      </div>
  );
}
