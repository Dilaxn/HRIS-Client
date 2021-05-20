import React, {useEffect, useState} from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
// import { withRouter } from "react-router-dom";
// import classnames from "classnames";

// styles
import useStyles from "./styles";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import {readAllCountries} from "../../../context/CountryContext";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {useHistory} from "react-router";
// logo
// import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser } from "../../context/UserContext";

function LocationsAdd(props) {
  var classes = useStyles();

  // global
  // var userDispatch = useUserDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  // var [error, setError] = useState(null);
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [nameValue, setNameValue] = useState("");
  // var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [name, setName] = useState("");
  var [jobTitle, setJobTitle]  = useState("");
  var [country, setCountry] = useState("");

  var [jobDescription, setJobDescription] = useState("");
  var [province, setProvince] = useState("");
  var [city, setCity] = useState("");

  var [address, setAddress]=useState("");

  var [zip, setZip] = useState("");
  var [phone, setPhone] = useState("");
  var [fax, setFax] = useState("");
  var [notes, setNotes] = useState("");

  const tokenString = localStorage.getItem('id_token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenString}`
  }
  var [countryList, setCountryList] = useState([]);


  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    readAllCountries().then(r => setCountryList(r));
  }, []);

  let history = useHistory()
  return (
    <Grid container className={classes.container} style={{marginTop:"50px"}}>

      <div className={classes.formContainer}>
        <div className={classes.form}>


          <React.Fragment>
            <Typography variant="h3" className={classes.greeting}>
              Add Location
            </Typography>
            {/*<Button size="large" className={classes.googleButton}>*/}
            {/*  <img src={google} alt="google" className={classes.googleIcon} />*/}
            {/*  &nbsp;Sign in with Google*/}
            {/*</Button>*/}
            {/*<div className={classes.formDividerContainer}>*/}
            {/*  <div className={classes.formDivider} />*/}
            {/*  <Typography className={classes.formDividerWord}>or</Typography>*/}
            {/*  <div className={classes.formDivider} />*/}
            {/*</div>*/}

            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              margin="normal"
              placeholder="Name"
              type="text"
              fullWidth
            />
            <TextField style={{marginTop:"20px"}}
              id="outlined-select-currency"
              select
              label="Select"
                       fullWidth
              value={country}
                       onChange={e => setCountry(e.target.value)}
                       helperText="Organization Country"
              variant="outlined"
            >
              {countryList.map((option) => (
                <MenuItem key={option.code} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={province}
              onChange={e => setProvince(e.target.value)}
              margin="normal"
              placeholder="State/Province"
              type="text"
              fullWidth
            />
            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={city}
              onChange={e => setCity(e.target.value)}
              margin="normal"
              placeholder="City"
              type="text"
              fullWidth
            />
            <TextField style={{marginTop:"30px"}}
              id="outlined-full-width"
              label="Address"
              placeholder="Address"
                       value={address}
                       onChange={e => setAddress(e.target.value)}
              helperText="Enter the Address"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={zip}
              onChange={e => setZip(e.target.value)}
              margin="normal"
              placeholder="Zip/Postal code"
              type="text"
              fullWidth
            />
            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              margin="normal"
              placeholder="Phone"
              type="text"
              fullWidth
            />
            <TextField
              id="jobTitle"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={fax}
              onChange={e => setFax(e.target.value)}
              margin="normal"
              placeholder="Fax"
              type="text"
              fullWidth
            />
            <TextField style={{marginTop:"20px"}}
                       id="outlined-full-width"
                       label="Note"
                       placeholder="Note"
                       helperText="Enter the Note"
                       fullWidth
                       value={notes}
                       onChange={e => setNotes(e.target.value)}
                       margin="normal"
                       InputLabelProps={{
                         shrink: true,
                       }}
                       variant="outlined"
            />

            <div className={classes.formButtons}>

              <Button
                disabled={
                  jobTitle.length === 0 || country.length === 0
                }

                onClick={() => {
                  console.log(country);

                  let data={
                    name: jobTitle,
                    country: country,
                    province: province,
                    city: city,
                    address: address,
                    postal_code: zip,
                    phone: phone,
                    fax: fax,
                    notes: notes
                  }

                  function clean(obj) {
                    for (var propName in obj) {
                      if (obj[propName] === "" || obj[propName] === undefined) {
                        delete obj[propName];
                      }
                    }
                    return obj
                  }
                  let filterData= clean(data)
                  console.log(filterData)
                  axios.post("/location", filterData,
                      {
                        headers: headers
                      })
                      .then(function (response) {
                        history.push('/app/admin/organization/locations');
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                }
                }
                variant="contained"
                color="primary"
                size="large"
              >
                Add
              </Button>

            </div>
          </React.Fragment>


        </div>

      </div>
    </Grid>
  );
}

export default LocationsAdd;
