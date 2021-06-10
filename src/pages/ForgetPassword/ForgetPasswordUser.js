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

function ForgetPasswordUser(props) {
  var classes = useStyles();

  // global


  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  var [password2Value, setPassword2Value] = useState("");
  let deleteQuiz;

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>EPIC HRIS</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h2" className={classes.greeting}>
              Enter Employee ID
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
              id="eid"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Emp ID"
              type="text"
              fullWidth
            />

            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Link to="/forgetpassword">
                <Button
                  disabled={
                    loginValue.length === 0
                  }
                  onClick={() => axios.get("/users/"+loginValue+"/forgot_password")}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Next
                </Button>
                </Link>
              )}
              <Link to="/app/login">
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </React.Fragment>


        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2014-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">EPIC LANKA</a>. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(ForgetPasswordUser);
