import React, {useState} from "react";
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
// styles
import useStyles from "./styles";
import axios from "axios";
import url from "../../../components/Layout/Url";
import {useHistory} from "react-router";

function JobTitlesAdd(props) {
    var classes = useStyles();
    let history = useHistory()
    var [note, setNote] = useState("");
    var [jobDescription, setJobDescription] = useState("");
    var [jobTitle, setjobTitle] = useState("");
    const tokenString = localStorage.getItem('id_token');
    const headers = {Authorization: `Bearer ${tokenString}`,}

    return (
        <Grid container className={classes.container}>

            <div className={classes.formContainer}>
                <div className={classes.form}>


                    <React.Fragment>
                        <Typography variant="h3" className={classes.greeting}>
                            Add Employee Detail
                        </Typography>
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
                                            note: note
                                        },
                                        {
                                            headers: headers
                                        })
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
