import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {readAllNationalities} from "../../../context/OrganizationContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function OptionalFields() {
  const tokenString = localStorage.getItem('id_token');

  const classes = useStyles();
  useEffect(() => {
    axios.patch('/api/api/pim_configuration', {}, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {
          console.log(err)
        })
  }, []);
  const [gilad, setGilad] = React.useState(false);
  const [c1, setC1]  = React.useState(false);
  const [c2, setC2]  = React.useState(false);
  const [c3, setC3]  = React.useState(false);
  const [d1, setD1]  = React.useState(false);
  const [d2, setD2]  = React.useState(false);
  const [d3, setD3]  = React.useState(false);

  const handleChange = (event) => {
    setC1(event.target.checked)
    axios.patch('/api/pim_configuration', {
      show_nick_name: event.target.checked
    }, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {
          console.log(err)
        })
    console.log(event.target.checked)
  };
  const handleChange1 = (event) => {
    setC2(event.target.checked)

    axios.patch('/api/pim_configuration', {
      show_smoker:event.target.checked
    }, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {

          console.log(err)

        })
  };

  const handleChange2 = (event) => {
    setC3(event.target.checked)
    axios.patch('/api/pim_configuration',
        {
          show_military_service: event.target.checked
    }, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {
          console.log(err)
        })
  };
  const handleChange3 = (event) => {
    setD1(event.target.checked)
    axios.patch('/api/pim_configuration', {
      show_ssn: event.target.checked
    }, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {
          console.log(err)
        })
  };
  const handleChange4 = (event) => {
    setD2(event.target.checked)
    axios.patch('/api/pim_configuration', {
      show_sin:event.target.checked    }, {
      headers: {
        Authorization: `Bearer ${tokenString}`,
        'content-type': 'application/json'
      }
    }).then(res => {
          console.log(res.data)
          setC1(res.data.show_nick_name)
          setC2(res.data.show_smoker)
          setC3(res.data.show_military_service)
          setD1(res.data.show_ssn)
          setD2(res.data.show_sin)


          // console.log(res.data);
        }
    )
        .catch(err => {
          console.log(err)
        })
  };




  return (
    <div className={classes.root}>

      <FormControl component="fieldset" className={classes.formControl}>

        <FormLabel component="legend">  <h1>Configure PIM</h1></FormLabel>
        <h3>Show Deprecated Fields</h3>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={c1} onChange={handleChange} name="gilad"  />}
            label="Show Nick Name"
          />
          <FormControlLabel
              control={<Checkbox checked={c2} onChange={handleChange1} name="gilad" />}
              label="Show Smoker?"
          />
          <FormControlLabel
              control={<Checkbox checked={c3} onChange={handleChange2} name="gilad" />}
              label="Show Military Service"
          />
          <h3>Country Specific Information</h3>
          <FormControlLabel
            control={<Checkbox checked={d1} onChange={handleChange3} name="jason" />}
            label="Show SSN field in Personal Details"
          />
          <FormControlLabel
            control={<Checkbox checked={d2} onChange={handleChange4} name="jason" />}
            label="Show SIN field in Personal Details"
          />

        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>

    </div>
  );
}

