import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Container, FormControlLabel, Grid, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >


        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Container maxWidth="sm">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '40vh', marginTop:"10px",marginBottom:"10px" }} />
        </Container>

        <FormControlLabel
            control={
                // eslint-disable-next-line react/jsx-no-undef
                <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
            }
            label="Edit"
        />

      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

class Col extends React.Component {
    render() {
        return null;
    }
}

Col.propTypes = {
    xs: PropTypes.number,
    children: PropTypes.node
};

class Row extends React.Component {
    render() {
        return null;
    }
}

Row.propTypes = {children: PropTypes.node};

class StyledRadio extends React.Component {
    render() {
        return null;
    }
}

export default function MyInfo() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <div className={classes.root}>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >

          <Tab label="Personal Details" {...a11yProps(0)} />
          <Tab label="Contact Details" {...a11yProps(1)} />
          <Tab label="Emergency Contacts" {...a11yProps(2)} />
          <Tab label="Dependents" {...a11yProps(3)} />
          <Tab label="Immigration" {...a11yProps(4)} />
          <Tab label="Job" {...a11yProps(5)} />
          <Tab label="Salary" {...a11yProps(6)} />
            <Tab label="Report to" {...a11yProps(6)} />
            <Tab label="Qualifications" {...a11yProps(6)} />
            <Tab label="Memberships" {...a11yProps(6)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <div>
              {/* eslint-disable-next-line react/jsx-no-undef */}

              <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField  style={{margin:"20px"}}  id="outlined-search" label="Search field" type="search" variant="outlined" />

              <hr/>
              <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField  style={{margin:"20px"}}  id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField Col xs={6} style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
              <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />

              <hr/>
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel>
              <RadioGroup aria-label="quiz" name="quiz" value={value} defaultChecked={"best"}>
                  <FormControlLabel value="best" control={<Radio />} label="The best!" />
                  <FormControlLabel value="worst" control={<Radio />} label="The worst." />
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
                  style={{margin:"20px"}}              >
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
                  style={{margin:"20px"}}              >
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
                  style={{margin:"20px"}}              >
                  {/*{currencies.map((option) => (*/}
                  {/*    <MenuItem key={option.value} value={option.value}>*/}
                  {/*        {option.label}*/}
                  {/*    </MenuItem>*/}
                  {/*))}*/}
              </TextField>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
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
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </div>
  );
}
