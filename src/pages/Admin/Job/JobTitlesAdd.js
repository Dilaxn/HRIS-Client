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
// import { withRouter } from "react-router-dom";
// import classnames from "classnames";
import  { Redirect } from 'react-router-dom'
// styles
import useStyles from "./styles";
import axios from "axios";
import url from "../../../components/Layout/Url";
import {useHistory} from "react-router";


// logo
// import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser } from "../../context/UserContext";

function JobTitlesAdd(props) {
  var classes = useStyles();
    let history = useHistory()
  // global
  // var userDispatch = useUserDispatch();

  // local
  // var [isLoading, setIsLoading] = useState(false);
  // var [error, setError] = useState(null);
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [nameValue, setNameValue] = useState("");
  // var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [note, setNote] = useState("");
  var [jobDescription, setJobDescription] = useState("");
  var [jobTitle, setjobTitle] = useState("");
    const tokenString = localStorage.getItem('id_token');
    const headers = {  Authorization: `Bearer ${tokenString}`,}

  return (
    <Grid container className={classes.container}>

      <div className={classes.formContainer}>
        <div className={classes.form}>


            <React.Fragment>
              <Typography variant="h3" className={classes.greeting}>
                Add Employee Detail
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
                onChange={e => setjobTitle(e.target.value)}
                margin="normal"
                placeholder="Job Title"
                type="text"
                fullWidth
              />
              <textarea
                id="jobDescription"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                margin="normal"
                placeholder="Job Description"
                type="text area"
                fullWidth
              />
              <textarea
                id="note"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={note}
                onChange={e => setNote(e.target.value)}
                margin="normal"
                placeholder="Note"
                type="text area"
                fullWidth
              />
              <div className={classes.formButtons}>

                  <Button
                    disabled={
                      jobTitle.length === 0 || jobDescription.length === 0
                    }

                    onClick={() =>
                        axios.post("http://localhost:3001/job_titles", {
                            job_title: jobTitle,
                            job_description: jobDescription,
                            note:note
                        },
                            {
                                headers:headers
                            }                            )
                            .then(function (response) {
                                history.push('/app/admin/job/jobTitles');
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
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

export default JobTitlesAdd;
