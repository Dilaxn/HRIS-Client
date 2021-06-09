import React, { useState } from "react";
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
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";
// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import axios from "axios";
import {useHistory} from "react-router";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();
  let history = useHistory();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>EPIC HRIS</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          {/*<Tabs*/}
          {/*  value={activeTabId}*/}
          {/*  onChange={(e, id) => setActiveTabId(id)}*/}
          {/*  indicatorColor="primary"*/}
          {/*  textColor="primary"*/}
          {/*  centered*/}
          {/*>*/}
          {/*  /!*<Tab label="Login" classes={{ root: classes.tab }} />*!/*/}
          {/*  /!*<Tab label="New User" classes={{ root: classes.tab }} />*!/*/}
          {/*</Tabs>*/}
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Epic HRIS
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
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Employee ID"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                        axios.post("/api/users/login", {
                     user_name:loginValue
                              , password:passwordValue
                            },
                            {

                            })
                            .then(res => {
                              console.log(res.data)
                              localStorage.setItem('id_token', res.data.token)
                              localStorage.setItem('id_user', res.data.user._id)
                              localStorage.setItem('userRole', res.data.user.role)
                              window.location.reload();
                              history.push('/app/admin/job/jobTitles');
                            })

                            .catch(err => {

                              alert("Invalid ID or password")
                              history.push({
                                pathname: '/'
                              });
                              return false;
                            })
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Link to="/forgetpassworduser">
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}

                >
                  Forget Password
                </Button>
                </Link>
              </div>
            </React.Fragment>
          )}

        </div>
        <Typography color="primary" className={classes.copyright}>
        © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">EPIC LANKA</a>. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
