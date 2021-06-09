import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {useHistory} from "react-router";
import {readAllJobs, readAllPayGrades} from "../../context/JobContext";
import {readAllEmergencyContacts, readAllEmpEmergencyContacts} from "../../context/EmergencyContext";
import {getToken} from "../../context/UserContext";
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



export default function Welcome(props) {
    let empID= props.props

    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [relationship, setRelationship]  = useState("");
    let [mobile, setMobile] = useState("");
    let [home_tel, setHome_tel] = useState("");
    let [work_tel, setWork_tel] = useState("");
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }
    let [emergencyContactsData, setEmergencyContactsData] = useState([]);

    useEffect(() => {
        readAllEmpEmergencyContacts(props).then(r => setEmergencyContactsData(r))
    }, ["/app/admin/job/payGrades"]);



    let details = [];
    if (emergencyContactsData) {
        emergencyContactsData.map(r => {
            const data = [
                r.name,
                r.relationship,
                r.home_tel,
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
                let x = [rowData[3]]
                let pay_grades = x
                console.log(x)
                return axios.delete('/api/employees/'+empID+'/emergency_contacts/'+x, {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(function (response) {
                        readAllEmpEmergencyContacts(props).then(r => setEmergencyContactsData(r))
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
            name: "Home Telephone",
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


    // let value=props.value
    // let  handleChange=props.handleChange
    return (
        <div>

           <center style={{margin:"50px",fontSize:"30px"}}>Welcome To Employee's Profile</center>

        </div>
    );
}