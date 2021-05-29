import React, {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import PageTitle from "../../../components/PageTitle";
import {getToken} from "../../../context/UserContext";
import axios from "axios";
import {readAllWorkShifts, readUnassignedEmployees} from "../../../context/JobContext";
import {useHistory} from "react-router";


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function AddWorkShift() {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };
    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map(x => {
                    const labelId = `transfer-list-item-${x[1]}-label`;

                    return (
                        <ListItem key={x[0]} role="listitem" button onClick={handleToggle(x[0])}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(x[0]) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`List item ${x[1]}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );


    let [workShiftData, setWorkShiftData] = useState([]);
    let [ar, setAr] = useState([[1,"Dilax"],[2,"Shan"]]);


    let history = useHistory()

    useEffect(() => {
        readAllWorkShifts().then(r => setWorkShiftData(r))
    }, ["/app/admin/job/workShifts"]);
    let p=[]
    let [leftArray, setLeftArray]  = useState([]);
    let [rightArray, setRightArray]  = useState([]);

    useEffect(() => {
        alert("hello")
        readUnassignedEmployees().then(y => { setAr(y)
            console.log(y)
            ar.map(x => {
                alert("lll")
            if (!x[2]) {
                leftArray.push([x[3],x[0]])
                setLeft(leftArray)
            } else {
                setRight(rightArray)
                rightArray.push([x[3],x[0]])
            }
        }

        )
            setLeft(leftArray)
            setRight(rightArray)})
    }, ["/app/admin/job/workShifts"])
    let details = [];
    if (workShiftData) {
        workShiftData.map(r => {
            const data = [
                r.shift_name,
                r.work_hours_from_readable,
                r.work_hours_to_readable,
                (r.work_hours.from - r.work_hours.to) / 3600,
                r._id
            ]
            details.push(data);
        });
    }

    const options = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[4]]
                let work_shifts = x
                console.log(JSON.stringify({work_shifts}))
                return axios.delete('/work_shifts', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({work_shifts})
                })
                    .then(function (response) {
                        readAllWorkShifts().then(r => setWorkShiftData(r))
                    })
            } else {
            }
        },

    };

    const columns = [
        {
            name: "shift Name",
            options: {
                display: true,
            }
        },
        {
            name: "From",
            options: {
                display: true,
            }
        },
        {
            name: "To",
            options: {
                display: true,
            }
        },
        {
            name: "Hours Per Day",
            options: {
                display: true,
            }
        },
        {
            name: "",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];


    const classes = useStyles();
    return (
        <>
            <PageTitle title="Add Job Title"/>
            <Grid container className={classes.container}>

                <div className={classes.formContainer}>
                    <div className={classes.form}>


                        <React.Fragment>
                            <Typography variant="h4" className={classes.greeting}>
                                Add Pay Grade
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
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}


                                margin="normal"
                                placeholder="Shift Name"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="from"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}


                                margin="normal"
                                placeholder="From"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="to"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}


                                margin="normal"
                                placeholder="To"
                                type="text"
                                fullWidth
                            />

                            <TextField
                                id="duration"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}


                                margin="normal"
                                placeholder="Duration"
                                type="text"
                                fullWidth
                            />
                            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                                <Grid item>{customList(left)}</Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllRight}
                                            disabled={left.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllLeft}
                                            disabled={right.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(right)}</Grid>
                            </Grid>


                            <div className={classes.formButtons}>

                                <Button

                                    onClick={() =>
                                        axios.post("", {})
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

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Employement Status"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
