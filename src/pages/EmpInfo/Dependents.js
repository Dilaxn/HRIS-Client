import {FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {readAllEmergencyContacts} from "../../context/EmergencyContext";
import {readAllEmpDependents, readAllMyDependents} from "../../context/DependentContext";
import {getToken} from "../../context/UserContext";
import axios from "axios";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from "@material-ui/core/MenuItem";
import {useHistory} from "react-router";
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

export default function Dependents(props) {
    let empID= props.props
    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [relationship, setRelationship]  = useState("");
    const [date_of_birth, setDate_of_birth] = React.useState('2014-11-09');
    const handleDateChange = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        console.log(dat)
        setDate_of_birth(dat);
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }

    let [dependentsData, setDependentsData] = useState([]);
    useEffect(() => {
        readAllEmpDependents(props).then(r => setDependentsData(r))
    }, [""]);
    let details = [];
    console.log(dependentsData)
    if (dependentsData) {
        dependentsData.map(y => {
            const data = [
                y.name,
                y.relationship,
                y._id
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
                let x = [rowData[2]]
                let dependents = x
                console.log(x)
                return axios.delete('/api/employees/'+empID+'/dependents/', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({dependents})

                })
                    .then(function (response) {
                        readAllEmpDependents(props).then(r => setDependentsData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "Relationship",
            options: {
                display: true,
            }
        },
        {
            name: "ID",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];



    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>

            <div>
                <form>
                    {!showForm && (
                        <button onClick={showF}> Add</button>)}
                    {showForm && (
                        <button onClick={showF}> Cancel</button>)}
                </form>

                {showForm && (
                    <form>
                        <TextField style={{margin: "20px"}} id="outlined-search" label="Name"
                                   value={name}
                                   onChange={e => setName(e.target.value)}    type="search" variant="outlined"/>
                        <TextField style={{margin: "20px"}} id="outlined-search" label="Relationship"
                                   value={relationship}
                                   onChange={e => setRelationship(e.target.value)}   type="search" variant="outlined"/>
                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container >

                                <KeyboardDatePicker
                                    style={{marginTop:'25px'}}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                    defaultValue={date_of_birth} value={date_of_birth}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />

                            </Grid>
                        </MuiPickersUtilsProvider>
                         <br/>
                        <button  disabled={
                            name.length === 0 || relationship.length === 0
                        }
                                 onClick={() => {
                                     const dependent = {
                                         "name": name,
                                         "relationship": relationship,
                                         "date_of_birth": date_of_birth

                                     }

                                     function clean(obj) {
                                         for (let x in obj) {
                                             if (obj[x] === "" || obj[x] === undefined) {
                                                 delete obj[x];
                                             }
                                         }
                                         return obj
                                     }

                                     const dDetails = clean(dependent)
                                     console.log(dependent)
                                     return axios.post('/api/employees/'+empID+'/dependents', dDetails, {
                                         headers: {
                                             Authorization: `Bearer ${tokenString}`,
                                             'content-type': 'application/json'
                                         }
                                     }).then(function (response) {
                                             setName('')
                                             setDate_of_birth('')
                                             setRelationship('')

                                             readAllMyDependents().then(r => setDependentsData(r))
                                         }
                                     )
                                         .catch(function (error) {
                                             console.log(error);
                                         })
                                 }
                                 }
                        > Save</button>
                    </form>
                )}
            </div>
            <MUIDataTable
                title="Employee List"
                data={details}
                columns={columns}
                options={options}
            />
        </div>
    );
}