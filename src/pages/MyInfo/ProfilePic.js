import {Button, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import {useHistory} from "react-router";
import {readAllJobs, readAllPayGrades} from "../../context/JobContext";
import {readAllEmergencyContacts} from "../../context/EmergencyContext";
import {getToken} from "../../context/UserContext";
import Grid from "@material-ui/core/Grid";
import * as path from "path";
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

export default function ProfilePic(props) {
    let [showForm, setShowForm] = useState(false);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
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
        var ab = document.getElementById("myfile").files[0].name;
        alert(ab);
        console.log(event.target);
      setPicture(event.target.files[0]);
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    setImgData(reader.result);
                });
        console.log(imgData)
        // reader.onloadend = () => {
        //     setImgData(reader.result);
        // };
        reader.readAsDataURL(event.target.files[0]);
    };
    const tokenString = localStorage.getItem('id_token');
    let history = useHistory()
    let showF = () => {
        setShowForm(!showForm);
    }
    let [emergencyContactsData, setEmergencyContactsData] = useState([]);


    var bodyFormData = new FormData();
    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>

            <div>


                    <form>

                        <input id="myfile" type="file" props={path} onChange={onChangePicture} />
                            <button
                                onClick={() => {
                                    bodyFormData.append('name', 'Fred');
                                    bodyFormData.append('price', '2');
                                    bodyFormData.append('productImage', picture);




                                    let eDetails ={
                                        name:"a",
                                        price:"1",
                                        productImage:picture
                                    }
                                    console.log(eDetails)
                                    return axios({
                                        method: "post",
                                        url: "/products",
                                        data: bodyFormData,
                                        headers: { "Content-Type": "multipart/form-data" },
                                    })
                                        .then(function (response) {
                                            alert("success");
                                        }
                                    )
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                }
                                }
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
            </div>

        </div>
    );
}