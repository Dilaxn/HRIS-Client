import React, {useState} from 'react';
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
    let [showForm, setShowForm] = useState(false);
    let [showForm2, setShowForm2] = useState(false);
    let [showForm3, setShowForm3] = useState(false);
    let [showForm4_1, setShowForm4_1] = useState(false);
    let [showForm4_2, setShowForm4_2] = useState(false);
    let [showForm4_3, setShowForm4_3] = useState(false);
    let [showForm4_4, setShowForm4_4] = useState(false);
    let [showForm4_5, setShowForm4_5] = useState(false);
    let [showForm4_6, setShowForm4_6] = useState(false);
    let [showForm5, setShowForm5] = useState(false);

    let showF= () => {
        setShowForm(!showForm);
    }
    let showF2= () => {
        setShowForm2(!showForm2);
    }
    let showF3= () => {
        setShowForm3(!showForm3);
    }
    let showF4_1= () => {
        setShowForm4_1(!showForm4_1);
    }
    let showF4_2= () => {
        setShowForm4_2(!showForm4_2);

    }
    let showF4_3= () => {
        setShowForm4_3(!showForm4_3);
    }
    let showF4_4= () => {
        setShowForm4_4(!showForm4_4);
    }
    let showF4_5= () => {
        setShowForm4_5(!showForm4_5);
    }
    let showF4_6= () => {
        setShowForm4_6(!showForm4_6);
    }
    let showF5= () => {
        setShowForm5(!showForm5);
    }

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
            <Tab label="Report to" {...a11yProps(7)} />
            <Tab label="Qualifications" {...a11yProps(8)} />
            <Tab label="Memberships" {...a11yProps(9)} />

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

          <div>
              <form>
                  {!showForm &&(
                  <button onClick={showF}> Add</button>)}
                  {showForm &&(
                      <button onClick={showF}> Cancel</button>)}
              </form>

              {showForm && (
                  <form>
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
<br/>
                      <button > Save</button>
                  </form>
              )}
          </div>


      </TabPanel>
      <TabPanel value={value} index={3}>
          <div>
              <form>
                  {!showForm2 &&(
                      <button onClick={showF2}> Add</button>)}
                  {showForm2 &&(
                      <button onClick={showF2}> Cancel</button>)}
              </form>

              {showForm2 && (
                  <form>
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <br/>
                      <button > Save</button>
                  </form>
              )}
          </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
          <div>
              <form>
                  {!showForm3 &&(
                      <button onClick={showF3}> Add</button>)}
                  {showForm3 &&(
                      <button onClick={showF3}> Cancel</button>)}
              </form>

              {showForm3 && (
                  <form>
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                      <br/>
                      <button > Save</button>
                  </form>
              )}
          </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
          <div>
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
              <hr/>
              <h2 style={{marginLeft:"20px", marginBottom:"-10px"}}>Employment Contract</h2>
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
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
        <TabPanel value={value} index={7}>
            Item Seven
        </TabPanel>
        <TabPanel value={value} index={8}>
            <div>
                <div>
                    <form>
                        {!showForm4_1 &&(
                            <button onClick={showF4_1}> Add</button>)}
                        {showForm4_1 &&(
                            <button onClick={showF4_1}> Cancel</button>)}
                    </form>

                    {showForm4_1 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
                <div>
                    <form>
                        {!showForm4_2 &&(
                            <button onClick={showF4_2}> Add</button>)}
                        {showForm4_2 &&(
                            <button onClick={showF4_2}> Cancel</button>)}
                    </form>

                    {showForm4_2 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
                <div>
                    <form>
                        {!showForm4_3 &&(
                            <button onClick={showF4_3}> Add</button>)}
                        {showForm4_3 &&(
                            <button onClick={showF4_3}> Cancel</button>)}
                    </form>

                    {showForm4_3 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
                <div>
                    <form>
                        {!showForm4_4 &&(
                            <button onClick={showF4_4}> Add</button>)}
                        {showForm4_4 &&(
                            <button onClick={showF4_4}> Cancel</button>)}
                    </form>

                    {showForm4_4 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
                <div>
                    <form>
                        {!showForm4_5 &&(
                            <button onClick={showF4_5}> Add</button>)}
                        {showForm4_5 &&(
                            <button onClick={showF4_5}> Cancel</button>)}
                    </form>

                    {showForm4_5 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
                <div>
                    <form>
                        {!showForm4_6 &&(
                            <button onClick={showF4_6}> Add</button>)}
                        {showForm4_6 &&(
                            <button onClick={showF4_6}> Cancel</button>)}
                    </form>

                    {showForm4_6 && (
                        <form>
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                            <br/>
                            <button > Save</button>
                        </form>
                    )}
                </div>
            </div>
        </TabPanel>
        <TabPanel value={value} index={9}>
            <div>
                <form>
                    {!showForm5 &&(
                        <button onClick={showF5}> Add</button>)}
                    {showForm5 &&(
                        <button onClick={showF5}> Cancel</button>)}
                </form>

                {showForm5 && (
                    <form>
                        <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                        <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                        <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                        <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                        <TextField style={{margin:"20px"}} id="outlined-search" label="Search field" type="search" variant="outlined" />
                        <br/>
                        <button > Save</button>
                    </form>
                )}
            </div>
        </TabPanel>
    </div>
  );
}
