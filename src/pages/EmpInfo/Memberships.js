// import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
// import FormLabel from "@material-ui/core/FormLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import React, {useEffect, useState} from "react";
// import MUIDataTable from "mui-datatables";
// import {readAllEmpSkills} from "../../context/SkillContext";
// import {readAllSkills} from "../../context/OrganizationContext";
// import {getToken} from "../../context/UserContext";
// import axios from "axios";
// import {readAllEmpMemberships, readAllMemberships} from "../../context/Membership";
// const datatableData = [
//     ["Joe James", "Example Inc.", "Yonkers", "NY"],
//     ["John Walsh", "Example Inc.", "Hartford", "CT"],
//     ["Bob Herm", "Example Inc.", "Tampa", "FL"],
//     ["James Houston", "Example Inc.", "Dallas", "TX"],
//     ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
//     ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
//     ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
//     ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
//     ["Meral Elias", "Example Inc.", "Hartford", "CT"],
//     ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
//     ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
//     ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
//     ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
//     ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
//     ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
//     ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
//     ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
// ];
//
// export default function Memberships(props) {
//     let [showForm, setShowForm] = useState(false);
//     let [showForm2, setShowForm2] = useState(false);
//     let [showForm3, setShowForm3] = useState(false);
//     let [showForm4_1, setShowForm4_1] = useState(false);
//     let [showForm4_2, setShowForm4_2] = useState(false);
//     let [showForm4_3, setShowForm4_3] = useState(false);
//     let [showForm4_4, setShowForm4_4] = useState(false);
//     let [showForm4_5, setShowForm4_5] = useState(false);
//     let [showForm4_6, setShowForm4_6] = useState(false);
//     let [showForm5, setShowForm5] = useState(false);
// //start
//     let [membership, setMembership]  = useState('');
//     let [membershipData, setMembershipData]  = useState([]);
//     let [myMembershipData, setMyMembershipData]  = useState([]);
//
//     // useEffect(() => {
//     //     readAllMySkills().then(r => setSkillData(r))
//     // }, [""]);
//     useEffect(() => {
//         readAllEmpMemberships(props).then(r => setMyMembershipData(r))
//     }, [""]);
//     useEffect(() => {
//         readAllMemberships().then(r => setMembershipData(r))
//     }, [""]);
//     // useEffect(() => {
//     //     readAllMemberships().then(r => setMembershipData(r))
//     // }, [""]);
//     let details3 = [];
//     console.log(myMembershipData)
//     if (myMembershipData) {
//         myMembershipData.map(y => {
//             const data = [
//                 y.skill.name,
//                 y.years_of_experience,
//                 y._id
//             ]
//             details3.push(data);
//         });
//     }
//
//     const options3 = {
//         filterType: "checkbox",
//         selectableRowsOnClick: false,
//         onRowsDelete: async (rowsDeleted, dataRows) => {
//             console.log(rowsDeleted)
//         },
//         onRowClick: async (rowData) => {
//             var answer = window.confirm("Delete the data");
//             if (answer) {
//                 const tokenString = getToken()
//                 let x = [rowData[2]]
//                 let skills = [x[0]]
//                 console.log(JSON.stringify({skills}))
//                 return axios.delete('/employees/'+empID+'/skills', {
//                     headers: {
//                         'Authorization': `Bearer ${tokenString}`,
//                         'Content-Type': 'application/json',
//                     },
//                     data: JSON.stringify({skills})
//                 })
//                     .then(function (response) {
//                         readAllEmpSkills(props).then(r => setSkillData(r))
//                     })
//             } else {
//                 //some code
//             }
//         },
//
//     };
//     const columns3 = [
//         {
//             name: "Skills",
//             options: {
//                 display: true,
//             }
//         },
//         {
//             name: "Years of Experience",
//             options: {
//                 display: true,
//             }
//         },
//         {
//             name: "ID",
//             options: {
//                 display: false,
//                 onRowClick: (rowData, rowState) => {
//                     console.log(rowData, rowState);
//                 },
//             }
//         },
//     ];
//     //end
//     let showF = () => {
//         setShowForm(!showForm);
//     }
//
//
//     let value=props.value
//     let  handleChange=props.handleChange
//     return (
//         <div>
//
//             <div>
//                 <form>
//                     {!showForm && (
//                         <button onClick={showF}> Add</button>)}
//                     {showForm && (
//                         <button onClick={showF}> Cancel</button>)}
//                 </form>
//                 {showForm && (
//                     <form>
//                         <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
//                                    type="search" variant="outlined"/>
//                         <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
//                                    type="search" variant="outlined"/>
//                         <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
//                                    type="search" variant="outlined"/>
//                         <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
//                                    type="search" variant="outlined"/>
//                         <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
//                                    type="search" variant="outlined"/>
//                         <br/>
//                         <button> Save</button>
//                     </form>
//                 )}
//             </div>
//             <MUIDataTable
//                 title="Employee List"
//                 data={datatableData}
//                 columns={["Name", "Company", "City", "State"]}
//                 options={{
//                     filterType: "checkbox",
//                 }}
//             />
//         </div>
//     );
// }
