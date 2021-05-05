import {FormControlLabel, MenuItem, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {readAllNationalities} from "../../context/OrganizationContext";
import axios from "axios";
import {readAllCountries} from "../../context/CountryContext";
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
    const [edit, setEdit] = React.useState('');

    const handleChange2 = (event) => {
        setCountry(event.target.value);
    };
    const [countries, setCountries]  = React.useState([]);
    const tokenString = localStorage.getItem('id_token');

    useEffect(() => {
        readAllCountries().then(r => setCountries(r));
    }, []);

    useEffect(() => {
        axios.patch('http://localhost:3001/employees/me/contact', {}, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
            setStreet1(res.data.street1);
            setStreet2(res.data.street2);
            setMobile(res.data.mobile);
            setHome_tel(res.data.home_tel);
            setWork_tel(res.data.work_tel);
            setCity(res.data.city);
            setPostal_code(res.data.postal_code);
            setProvince(res.data.province);
            setWork_email(res.data.work_email);
            setOther_email(res.data.other_email);
                setCountry(res.data.country._id);

            }
        )
            .catch(err => {
                console.log(err)
            })
    }, []);

    const checkEdit = (event) => {
        setEdit(!edit)


        const contactDetails = {
            "street1": street1,
            "street2": street2,
            "city": city,
            "country": country,
            "mobile": mobile,
            "home_tel": home_tel,
            "work_tel": work_tel,
            "postal_code": postal_code,
            "province": province,
            "work_email": work_email,
            "other_email": other_email,

        }
        function clean(obj) {
            for (let x in obj) {
                if (obj[x] === "" || obj[x] === undefined) {
                    delete obj[x];
                }
            }
            return obj
        }
        const cDetails= clean(contactDetails)
        console.log(cDetails)
        return axios.patch('http://localhost:3001/employees/me/contact', cDetails, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
                'content-type': 'application/json'
            }
        }).then(res => {
                setStreet1(res.data.street1);
                setStreet2(res.data.street2);
                setMobile(res.data.mobile);
                setHome_tel(res.data.home_tel);
                setWork_tel(res.data.work_tel);
                setCity(res.data.city);
                setPostal_code(res.data.postal_code);
                setProvince(res.data.province);
                setWork_email(res.data.work_email);
                setOther_email(res.data.other_email);
setCountry(res.data.country);
                console.log(res.data);
            }
        )
            .catch(err => {
                console.log(err)
            })
    }

    const [street1, setStreet1] = React.useState('');
    const [street2, setStreet2]  = React.useState('');
    const [mobile, setMobile]  = React.useState('');
    const [country, setCountry]  = React.useState('');

    const [home_tel, setHome_tel] = React.useState('');
    const [work_tel, setWork_tel]  = React.useState('');
    const [city, setCity]  = React.useState('');
    const [postal_code, setPostal_code] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [work_email, setWork_email]  = React.useState('');
    const [other_email, setOther_email] = React.useState('');


    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>
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
            </div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <fieldset disabled={!edit}>

            <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Address Street 1" type="search" variant="outlined"
                       defaultValue={street1} value={street1}  onChange={e => setStreet1(e.target.value)}/>
            <TextField style={{margin:"20px"}} id="outlined-search" label="Address Street 2" type="search" variant="outlined"
                       defaultValue={street2} value={street2}  onChange={e => setStreet2(e.target.value)}/>
            <TextField  style={{margin:"20px"}}  id="outlined-search" label="City" type="search" variant="outlined"
                        defaultValue={city} value={city}  onChange={e => setCity(e.target.value)}/>
            <TextField style={{margin:"20px"}} id="outlined-search" label="State/Province" type="search" variant="outlined"
                       defaultValue={province} value={province}  onChange={e => setProvince(e.target.value)}/>
            <TextField style={{margin:"20px"}} id="outlined-search" label="Zip/Postal Code" type="search" variant="outlined"
                       defaultValue={postal_code} value={postal_code}  onChange={e => setPostal_code(e.target.value)}/>

            <TextField
                id="outlined-select-currency-native"

                label="Country"
                value={country}
                select={edit}
                onChange={handleChange2}

                helperText="Please select your currency"
                variant="outlined"
                style={{margin:"10px"}}
            >
                {countries.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <hr/>
            <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Home Telephone" type="search" variant="outlined"
                       defaultValue={home_tel} value={home_tel}  onChange={e => setHome_tel(e.target.value)}/>
            <TextField style={{margin:"20px"}} id="outlined-search" label="Mobile" type="search" variant="outlined"
                       defaultValue={mobile} value={mobile}  onChange={e => setMobile(e.target.value)}/>
            <TextField  style={{margin:"20px"}}  id="outlined-search" label="Work Telephone" type="search" variant="outlined"
                        defaultValue={work_tel} value={work_tel}  onChange={e => setWork_tel(e.target.value)}/>
            <hr/>
            <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Work Email" type="search" variant="outlined"
                       defaultValue={work_email} value={work_email}  onChange={e => setWork_email(e.target.value)}/>
            <TextField style={{margin:"20px"}} id="outlined-search" label="Other Email" type="text" variant="outlined"
                       defaultValue={other_email} value={other_email}  onChange={e => setOther_email(e.target.value)}/>
            </fieldset>

        </div>
    );
}