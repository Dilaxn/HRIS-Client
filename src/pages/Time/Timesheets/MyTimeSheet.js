import React, {useEffect, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
import {useHistory} from "react-router";

// components
import PageTitle from "../../../components/PageTitle";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser, readAllUsers} from "../../../context/UserContext";
import {readAllJobs} from "../../../context/JobContext";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import {readAllTimeSheetWeeks} from "../../../context/TimeContext/TimeSheetContext";
import {readAllProjects} from "../../../context/TimeContext/ProjectContext";


const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))
const tokenString = localStorage.getItem('id_token');

export default function MyTimeSheet() {
    let [jobData, setJobData] = useState([]);
    let [timeSheetWeek, setTimeSheetWeek]  = useState('');
    let [timeSheetWeekData, setTimeSheetWeekData]  = useState([]);
    let [actionSheetData, setActionSheetData]   = useState([]);
    let [editData, setEditData]   = useState([]);
    let [pId, setPId]  = useState('');


    let [day1, setDay1]  = useState('');
    let [day2, setDay2]  = useState('');
    let [day3, setDay3]  = useState('');
    let [day4, setDay4]  = useState('');
    let [day5, setDay5]  = useState('');
    let [day6, setDay6]  = useState('');
    let [day7, setDay7]  = useState('');
    let [v1, setV1]  = useState([0,0,0]);
    let [v2, setV2]  = useState([0,0,0]);
    let [v3, setV3]  = useState([0,0,0]);
    let [v4, setV4]  = useState([0,0,0]);
    let [v5, setV5]  = useState([0,0,0]);
    let [v6, setV6]  = useState([0,0,0]);
    let [v7, setV7]  = useState([0,0,0]);

    let [projectName0, setProjectName0]   = useState('');
    let [projectActivity0, setProjectActivity0]    = useState('');
    let [projectName1, setProjectName1]   = useState('');
    let [projectActivity1, setProjectActivity1]    = useState('');
    let [projectName2, setProjectName2]   = useState('');
    let [projectActivity2, setProjectActivity2]    = useState('');
    let [proData, setProData]    = useState([]);
    let [activityData0, setActivityData0]    = useState([]);
    let [activityData1, setActivityData1]    = useState([]);

    let [activityData2, setActivityData2]    = useState([]);


    const handleChangeX0 = (event) => {
        const proID= event.target.value
        setProjectName0(proID)
                const tokenString = localStorage.getItem('id_token');
                return  axios.get('/projects/'+proID+'/activities', {
                    headers: {
                        Authorization: `Bearer ${tokenString}`,
                    },

                })
                    .then(response => {
                        // setUserData(response.data);
                        // response.data.dependents.date_of_birth
                        setActivityData0(response.data.data);
                    })
                    .catch((err) => {
                        console.log('Unable access ...');
                    });

    }
    const handleChangeX1 = (event) => {
        const proID= event.target.value
        setProjectName1(proID)
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/projects/'+proID+'/activities', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                setActivityData1(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    }
    const handleChangeX2 = (event) => {
        const proID= event.target.value
setProjectName2(proID)
        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/projects/'+proID+'/activities', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                setActivityData2(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });

    }
    const handleChangeY1 = (event) => {
        const proID = event.target.value
        setProjectActivity1(proID)
    }

        const handleChangeY2 = (event) => {
            const proID= event.target.value

            setProjectActivity2(proID)
        }
        const handleChangeY0 = (event) => {
            const proID= event.target.value

            setProjectActivity0(proID)
        }
    const handleChange2 = (event) => { const proID= event.target.value

        const tokenString = localStorage.getItem('id_token');
        return  axios.get('/projects/'+proID+'/activities', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                setProjectActivity2(response.data.data);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });}

    const handleChangeAct0 = (event) => {}
    const handleChangeAct1 = (event) => {}
    const handleChangeAct2 = (event) => {}

    let history = useHistory()

    useEffect(() => {
        readAllJobs().then(r => setJobData(r))
readAllTimeSheetWeeks().then(r=>setTimeSheetWeekData(r))
readAllProjects().then(r=>setProData(r))

    }, []);
    const handleChange = (event) => {
     const   weekId= event.target.value
        return  axios.get('/timeSheets/weeks/'+weekId, {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            .then(response => {
                // setUserData(response.data);
                // response.data.dependents.date_of_birth
                setPId(response.data.data._id)
                setEditData(response.data.data.timeSheetWeek.days)
                let x = response.data.data.timeSheetWeek.days
                console.log(x[0].date +" "+ x[0].day)
                setDay1(x[0].date +" "+ x[0].day)
                setDay2(x[1].date +" "+ x[1].day)
                setDay3(x[2].date +" "+ x[2].day)
                setDay4(x[3].date +" "+ x[3].day)
                setDay5(x[4].date +" "+ x[4].day)
                setDay6(x[5].date +" "+ x[5].day)
                setDay7(x[6].date +" "+ x[6].day)
                setActionSheetData(response.data.data.actions);
            })
            .catch((err) => {
                console.log('Unable access ...');
            });
    };

    const details = [];
    // const details1 = [];

    if (actionSheetData) {




        actionSheetData.map(r => {
            const data = [
                r.action,
                r.performedBy.first_name,
                r.dateOfAction.slice(0, 10),
                r.comment,
                r._id
            ]
            details.push(data);
        });
    }






            const details1 = [
                [
                <TextField
                    id="outlined-select-currency-native"

                    select

                    onChange={handleChangeX0}
                    // helperText="Please select Job Title"


                    style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px'}}>
                    {proData.map((option) => (
                        <MenuItem key={option._id} value={option._id}>

                            {option.projectName}
                        </MenuItem>
                    ))}
                </TextField>,
                <TextField
                    id="outlined-select-currency-native"
                    value={projectActivity0}
                    select
                    // label="Time Sheet Week"
                    onChange={handleChangeY0}
                    // helperText="Please select Job Title"


                    style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px' , textAlign:"right"}}>
                    {activityData0.map((option) => (
                        <MenuItem  key={option._id} value={option._id}>

                            {option.activityName}
                        </MenuItem>
                    ))}
                </TextField>,
                <TextField style={{margin: "20px"}} id="outlined-search" label="Duration"
                           value={v1[0]}
                           onChange={e => {
                               let ar= [...v1]
                               ar[0]=e.target.value
                               setV1(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v2[0]}
                           onChange={e => {
                               let ar= [...v2]
                               ar[0]=e.target.value
                               setV2(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v3[0]}
                           onChange={e => {
                               let ar= [...v3]
                               ar[0]=e.target.value
                               setV3(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v4[0]}
                           onChange={e => {
                               let ar= [...v4]
                               ar[0]=e.target.value
                               setV4(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v5[0]}
                           onChange={e => {
                               let ar= [...v5]
                               ar[0]=e.target.value
                               setV5(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v6[0]}
                           onChange={e => {
                               let ar= [...v6]
                               ar[0]=e.target.value
                               setV6(ar)
                           }}   type="search" variant="outlined"/>,
                <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                           value={v7[0]}
                           onChange={e => {
                               let ar= [...v7]
                               ar[0]=e.target.value
                               setV7(ar)
                           }}   type="search" variant="outlined"/>,

            ],
                [
                    <TextField
                        id="outlined-select-currency-native"

                        select

                        onChange={handleChangeX1}
                        // helperText="Please select Job Title"


                        style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px'}}>
                        {proData.map((option) => (
                            <MenuItem key={option._id} value={option._id}>

                                {option.projectName}
                            </MenuItem>
                        ))}
                    </TextField>,
                    <TextField
                        id="outlined-select-currency-native"
                        value={projectActivity1}
                        select
                        // label="Time Sheet Week"
                        onChange={handleChangeY1}
                        // helperText="Please select Job Title"


                        style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px' , textAlign:"right"}}>
                        {activityData1.map((option) => (
                            <MenuItem  key={option._id} value={option._id}>

                                {option.activityName}
                            </MenuItem>
                        ))}
                    </TextField>,
                    <TextField style={{margin: "20px"}} id="outlined-search" label="Duration"
                               value={v1[1]}
                               onChange={e => {
                                   let ar= [...v1]
                                   ar[1]=e.target.value
                                   setV1(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v2[1]}
                               onChange={e => {
                                   let ar= [...v2]
                                   ar[1]=e.target.value
                                   setV2(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v3[1]}
                               onChange={e => {
                                   let ar= [...v3]
                                   ar[1]=e.target.value
                                   setV3(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v4[1]}
                               onChange={e => {
                                   let ar= [...v4]
                                   ar[1]=e.target.value
                                   setV4(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v5[1]}
                               onChange={e => {
                                   let ar= [...v5]
                                   ar[1]=e.target.value
                                   setV5(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v6[1]}
                               onChange={e => {
                                   let ar= [...v6]
                                   ar[1]=e.target.value
                                   setV6(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v7[1]}
                               onChange={e => {
                                   let ar= [...v7]
                                   ar[1]=e.target.value
                                   setV7(ar)
                               }}   type="search" variant="outlined"/>,

                ],
                [
                    <TextField
                        id="outlined-select-currency-native"

                        select

                        onChange={handleChangeX2}
                        // helperText="Please select Job Title"


                        style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px'}}>
                        {proData.map((option) => (
                            <MenuItem key={option._id} value={option._id}>

                                {option.projectName}
                            </MenuItem>
                        ))}
                    </TextField>,
                    <TextField
                        id="outlined-select-currency-native"
                        value={projectActivity2}
                        select
                        // label="Time Sheet Week"
                        onChange={handleChangeY2}
                        // helperText="Please select Job Title"


                        style={{margin: 'auto', width: "100%", align: 'center', marginTop: '40px' , textAlign:"right"}}>
                        {activityData2.map((option) => (
                            <MenuItem  key={option._id} value={option._id}>

                                {option.activityName}
                            </MenuItem>
                        ))}
                    </TextField>,
                    <TextField style={{margin: "20px"}} id="outlined-search" label="Duration"
                               value={v1[2]}
                               onChange={e => {
                                   let ar= [...v1]
                                   ar[2]=e.target.value
                                   setV1(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v2[2]}
                               onChange={e => {
                                   let ar= [...v2]
                                   ar[2]=e.target.value
                                   setV2(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v3[2]}
                               onChange={e => {
                                   let ar= [...v3]
                                   ar[2]=e.target.value
                                   setV3(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v4[2]}
                               onChange={e => {
                                   let ar= [...v4]
                                   ar[2]=e.target.value
                                   setV4(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v5[2]}
                               onChange={e => {
                                   let ar= [...v5]
                                   ar[2]=e.target.value
                                   setV5(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v6[2]}
                               onChange={e => {
                                   let ar= [...v6]
                                   ar[2]=e.target.value
                                   setV6(ar)
                               }}   type="search" variant="outlined"/>,
                    <TextField style={{margin: "20px"}} id="outlined-search"  label="Duration"
                               value={v7[2]}
                               onChange={e => {
                                   let ar= [...v7]
                                   ar[2]=e.target.value
                                   setV7(ar)
                               }}   type="search" variant="outlined"/>,

                ],
                ]

    const options = {
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[2]]
                let job_titles = [x[0]]
                console.log(JSON.stringify({job_titles}))
                return axios.delete('/job_titles', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({job_titles})
                })
                    .then(function (response) {
                        readAllJobs().then(r => setJobData(r))
                    })
            } else {
                //some code
            }
        },

    };

    const options1 = {
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
        },
        onRowClick: false

    };

    const columns = [
        {
            name: "Action",
            options: {
                display: true,
            }
        },
        {
            name: "Performed By",
            options: {
                display: true,
            }
        },
        {
            name: "Date",
            options: {
                display: true,
            }
        },
        {
            name: "Comment",
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
    const columns1 = [
        {
            name: "Project Name",
            options: {
                display: true,
            }
        },
        {
            name: "Activity Name",
            options: {
                display: true,
            }
        },
        {
            name: [day1],
            options: {
                display: true,
            }
        },
        {
            name: [day2],
            options: {
                display: true,
            }
        },
        {
            name: [day3],
            options: {
                display: true,
            }
        },{
            name: [day4],
            options: {
                display: true,
            }
        },{
            name: [day5],
            options: {
                display: true,
            }
        },{
            name: [day6],
            options: {
                display: true,
            }
        },{
            name: [day7],
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
            <TextField
                id="outlined-select-currency-native"
                value={timeSheetWeek}
                select
                label="Time Sheet Week"
                onChange={handleChange}
                helperText="Please select Job Title"


                style={{margin: 'auto', width: "52%", align: 'center', marginTop: '40px'}}>
                {timeSheetWeekData.map((option) => (
                    <MenuItem key={option._id} value={option._id}>

                        {option.startDate.slice(0, 10)} - {option.endDate.slice(0, 10)}
                    </MenuItem>
                ))}
            </TextField>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Employee List"
                        data={details1}
                        columns={columns1}
                        options={options1}
                    />
                    <Button
onClick={()=>{
    let task=[]
    let a0=''
    let a1=''
    let a2=''
    if(projectName0 && projectActivity0){
         a0= {
            "projectName": projectName0,
            "activity": projectActivity0,
            "allocatedHours": [v1[0],v2[0],v3[0],v4[0],v5[0],v6[0],v7[0]]
        }
        if(projectName1 && projectActivity1){
             a1= {
                "projectName": projectName1,
                "activity": projectActivity1,
                "allocatedHours": [v1[1],v2[1],v3[1],v4[1],v5[1],v6[1],v7[1]]
            }
            if(projectName2 && projectActivity2){
                 a2= {
                    "projectName": projectName2,
                    "activity": projectActivity2,
                    "allocatedHours": [v1[2],v2[2],v3[2],v4[2],v5[2],v6[2],v7[2]]
                }
            }
            else{
                a2=''
            }
        }
        else{
             a1= ''
        }
    }
    else{
        let a0= ''
    }

    if(a0!==''){
        task.push(a0)
    }
    if(a1!==''){
task.push(a1)
    }
    if(a2!==''){
task.push(a2)
    }
    if(task.length===0){
        alert("Something went wrong")
    }
    console.log(task)

    return axios.patch('/timeSheets/'+pId+'/submit', {
        tasks:task
    }, {
        headers: {
            Authorization: `Bearer ${tokenString}`,
            'content-type': 'application/json'
        }
    }).then(res => {

alert("Success")
            console.log(res.data);
        }
    )
        .catch(err => {
            alert("Already added!")
            console.log(err)
        })
}

}

                        variant="contained" color="primary" style={{margin: 20}} type="button">
                        Submit
                    </Button>
                </Grid>

            </Grid>


            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Timesheet"
                        data={details}
                        columns={columns}
                        options={options}
                    />
                </Grid>

            </Grid>
        </>
    );
}
