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

// styles
import useStyles from "./styles";
import axios from "axios";
import {useHistory} from "react-router";
import {getToken} from "../../../context/UserContext";

// logo
// import logo from "./logo.svg";
// import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser } from "../../context/UserContext";

function PayGradesAdd(props) {
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
  var [payGrade, setPayGrade] = useState("");
  var [currency, setCurrency] = useState("");
  var [minSalary, setMinSalary] = useState("");
  var [maxSalary, setMaxSalary] = useState("");



  return (
    <Grid container className={classes.container}>

      <div className={classes.formContainer}>
        <div className={classes.form}>


          <React.Fragment>
            <Typography variant="h4" className={classes.greeting}>
              Add Pay Grade
            </Typography>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={payGrade}
              onChange={e => setPayGrade(e.target.value)}
              margin="normal"
              placeholder="Name"
              type="text"
              fullWidth
            />



            <div className={classes.formButtons}>

              <Button
                disabled={
                  payGrade.length === 0
                }
                onClick={() => {
                  const tokenString = getToken()
                   axios.post("/pay_grades", {
                        name: payGrade
                      },
                      {
                        headers: {
                          'Authorization': `Bearer ${tokenString}`,
                          'Content-Type': 'application/json',
                        }
                      })
                      .then(function (response) {
                        history.push('/app/admin/job/payGrades');
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

export default PayGradesAdd;
