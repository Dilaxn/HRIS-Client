import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {Switch, TextField} from "@material-ui/core";
import {countAllEmployees} from "../../../context/EmployeeContext";
import {readAllCountries} from "../../../context/CountryContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function GeneralInformation() {
    const [resData, setResData] = React.useState([]);

    const [name, setName] = React.useState('');
    const [noOfEmp, setNoOfEmp] = React.useState('');
    const [countryList, setCountryList] = React.useState('c')
    const [tax_id, setTax_id] = React.useState('');
    const [regNo, setRegNo] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [fax, setFax] = React.useState('');
    const [street1, setStreet1] = React.useState('');
    const [street2, setStreet2] = React.useState('');
    const [city, setCity] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [zip, setZip] = React.useState('');
    const [note, setNote] = React.useState('');
    const [edit, setEdit] = React.useState('');


    const classes = useStyles();

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const tokenString = localStorage.getItem('id_token');

    const checkEdit = (event) => {
        setEdit(!edit)
        console.log(name)


        const orgDetails = {
            "organization_name": name,
            "tax_id": tax_id,
            "registration_number": regNo,
            "organization_phone": phone,
            "organization_email": email,
            "organization_fax": fax,
            "organization_street_1": street1,
            "organization_street_2": street2,
            "organization_city": city,
            "organization_province": province,
            // "country": country,
            "organization_postal_code": zip,
            "organization_note": note

        }
        return axios.patch('/organization/general/info', orgDetails, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                setResData(res.data);
                setName(res.data.organization_name);
                setTax_id(res.data.tax_id);
                setProvince(res.data.organization_province);
                setCity(res.data.organization_city);
                setRegNo(res.data.registration_number);
                setStreet1(res.data.organization_street_1);
                setStreet2(res.data.organization_street_2);
                setPhone(res.data.organization_phone);
                setEmail(res.data.organization_email);
                setFax(res.data.organization_fax);
                setZip(res.data.organization_postal_code);
                setNote(res.data.organization_note);

                console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        countAllEmployees().then(r => setNoOfEmp(r));
    }, []);
    useEffect(() => {
        readAllCountries().then(r => setCountryList(r));
    }, []);
    useEffect(() => {
        axios.patch('/organization/general/info', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                setResData(res.data);
                setName(res.data.organization_name);
                setTax_id(res.data.tax_id);
                setCity(res.data.organization_city);
                setProvince(res.data.organization_province);

                setRegNo(res.data.registration_number);
                setStreet1(res.data.organization_street_1);
                setStreet2(res.data.organization_street_2);
                setPhone(res.data.organization_phone);
                setEmail(res.data.organization_email);
                setFax(res.data.organization_fax);
                setZip(res.data.organization_postal_code);
                setNote(res.data.organization_note);
                console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        <div>
            <Switch
                // checked={}
                onChange={checkEdit}

                name="checkedA"
                inputProps={{'aria-label': 'secondary checkbox'}}
            />
            <form className={classes.root} noValidate autoComplete="off">
                <fieldset disabled={edit}>
                    <h1 style={{marginBottom: "30px"}}>General Information</h1>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">Name</InputLabel>
                        <OutlinedInput id="" style={{paddingRight: "100px", textAlign: "left"}} value={name}
                                       onChange={e => setName(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginLeft: "10%"}}>
                        <InputLabel htmlFor="component-outlined">Tax ID</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={tax_id} value={tax_id}
                                       onChange={e => setTax_id(e.target.value)}/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginLeft: "10%"}}>
                        <InputLabel htmlFor="component-outlined">No of Emp</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={noOfEmp} value={noOfEmp}
                                       onChange={e => setNoOfEmp(e.target.value)} label="Name"/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined" style={{backgroundColor: "white"}}>Registration
                            Number</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={regNo} style={{paddingRight: "100px"}}
                                       value={regNo}
                                       onChange={e => setRegNo(e.target.value)}/>
                    </FormControl>
                    <hr
                        style={{
                            color: "black",
                            backgroundColor: "black",
                            height: 1
                        }}
                    />
                    <FormControl variant="outlined"
                                 style={{marginTop: "30px", paddingRight: "100px", marginBottom: "20px"}}>
                        <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                        <OutlinedInput id="component-outlined" style={{paddingRight: "100px", textAlign: "left"}}
                                       defaultValue={phone} value={phone}
                                       onChange={e => setPhone(e.target.value)} label="Phone"/>
                    </FormControl>
                    <FormControl variant="outlined"
                                 style={{marginTop: "30px", paddingRight: "100px", marginBottom: "20px"}}>
                        <InputLabel htmlFor="component-outlined">Fax</InputLabel>
                        <OutlinedInput label="Search field" id="component-outlined" defaultValue={fax} value={fax}
                                       onChange={e => setFax(e.target.value)} label="Name"/>
                    </FormControl>
                    <FormControl variant="outlined"
                                 style={{marginTop: "30px", paddingRight: "100px", marginBottom: "20px"}}>

                        <TextField
                            id="outlined-helperText"
                            label="Helper text"
                            // helperText="Some important text"
                            variant="outlined"
                            defaultValue={email} value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                    </FormControl>
                    <hr
                        style={{
                            color: "black",
                            backgroundColor: "black",
                            height: 1
                        }}
                    />
                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined" style={{backgroundColor: "white"}}>Address Street
                            1</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={street1} style={{paddingRight: "100px"}}
                                       value={street1}
                                       onChange={e => setStreet1(e.target.value)} label="Street 1"/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined" style={{backgroundColor: "white"}}>Address Street
                            2</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={street2} style={{paddingRight: "100px"}}
                                       value={street2}
                                       onChange={e => setStreet2(e.target.value)} label="StreetStreet 2"/>
                    </FormControl>

                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined"> City</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={city} style={{paddingRight: "100px"}}
                                       style={{paddingRight: "100px"}} value={city}
                                       onChange={e => setCity(e.target.value)} label="City"/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined"
                                    style={{backgroundColor: "white"}}> Province</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={province} style={{paddingRight: "100px"}}
                                       value={province}
                                       onChange={e => setProvince(e.target.value)} label="Province"/>
                    </FormControl>
                    <FormControl variant="outlined" style={{marginTop: "30px", paddingRight: "100px"}}>
                        <InputLabel htmlFor="component-outlined" style={{backgroundColor: "white"}}>Zip/Postal
                            Code</InputLabel>
                        <OutlinedInput id="component-outlined" defaultValue={zip} style={{paddingRight: "100px"}}
                                       value={zip}
                                       onChange={e => setZip(e.target.value)} label="Name"/>
                    </FormControl>
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
