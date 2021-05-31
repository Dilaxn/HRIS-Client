import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {useHistory} from "react-router";
import image from "../../../dataimport.png";
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

export default function DataImport() {
    let [showForm, setShowForm] = useState(false);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(new FormData());
    // const onChangePicture = e => {
    //     if (e.target) {
    //         console.log(e.target);
    //         // console.log("picture: ", e.target.files);
    //         // setPicture(e.target.files[0]);
    //         // const reader = new FileReader();
    //         // reader.addEventListener("load", () => {
    //         //     setImgData(reader.result);
    //         // });
    //         // reader.readAsDataURL(e.target.files[0]);
    //     }
    // };
    const onChangePicture  = (event) => {
        // var ab = document.getElementById("myfile").files[0].name;
        // alert(ab);
        // console.log(event.target);
        setPicture(event.target.files[0]);
// setImgData('avatar', event.target.files[0])
        // imgData.append('avatar', event.target.files[0])

        console.log(event.target.files[0])
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }
    let [emergencyContactsData, setEmergencyContactsData] = useState([]);



    return (
        <div>

            <div>

<center>
                <form style={{margin:"auto", marginTop:"40px"}}>
                    <img style={{height:"160px"}}
                        src={image}
                        alt=''/>
                    <input
                        id="myfile" type="file" onChange={onChangePicture} />
                        <br />
                    <button
                        style={{
                            margin: 'auto',
                            width: "50%",
                            align: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'

                        }} variant="contained"
                        color='primary'

                        onClick={() => {
                            console.log(imgData)
                            let data = new FormData();

                            data.append('employee_list', picture)

                            return axios.patch('/employees/import', data, {
                                headers: {
                                    Authorization: `Bearer ${tokenString}`,
                                    "Content-type": "multipart/form-data"
                                }
                            }).then(res => {
                                alert("SuccessFully Updated");
                            })
                                .catch(err=>alert("error"))
                        }}
                    >Upload!</button>

                    {/*<Button*/}
                    {/*    style={{*/}
                    {/*        margin: 'auto',*/}
                    {/*        width: "25%",*/}
                    {/*        align: 'center',*/}
                    {/*        marginTop: '40px',*/}
                    {/*        marginBottom: '40px',*/}
                    {/*        font:'#ffffff'*/}
                    {/*    }}*/}
                    {/*    variant="contained" color="primary"*/}
                    {/*    disabled={*/}
                    {/*        name.length === 0 || relationship.length === 0 || home_tel.length === 0*/}
                    {/*    }*/}

                    {/*    onClick={() => {*/}
                    {/*        const emergency = {*/}
                    {/*            "name": name,*/}
                    {/*            "relationship": relationship,*/}
                    {/*            "mobile": mobile,*/}
                    {/*            "work_tel": work_tel,*/}
                    {/*            "home_tel": home_tel,*/}

                    {/*        }*/}

                    {/*        function clean(obj) {*/}
                    {/*            for (let x in obj) {*/}
                    {/*                if (obj[x] === "" || obj[x] === undefined) {*/}
                    {/*                    delete obj[x];*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*            return obj*/}
                    {/*        }*/}

                    {/*        const eDetails = clean(emergency)*/}
                    {/*        console.log(eDetails)*/}
                    {/*        return axios.post('/employees/me/emergency_contacts', eDetails, {*/}
                    {/*            headers: {*/}
                    {/*                Authorization: `Bearer ${tokenString}`,*/}
                    {/*                'content-type': 'application/json'*/}
                    {/*            }*/}
                    {/*        }).then(function (response) {*/}
                    {/*                setName('')*/}
                    {/*                setMobile('')*/}
                    {/*                setRelationship('')*/}
                    {/*                setHome_tel('')*/}
                    {/*                setWork_tel('')*/}
                    {/*                readAllEmergencyContacts().then(r => setEmergencyContactsData(r))*/}
                    {/*            }*/}
                    {/*        )*/}
                    {/*            .catch(function (error) {*/}
                    {/*                console.log(error);*/}
                    {/*            })*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*> Save</Button>*/}
                </form>
</center>
            </div>

        </div>
    );
}