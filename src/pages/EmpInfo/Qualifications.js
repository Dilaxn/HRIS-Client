import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import axios from "axios";
import {readAllMyDependents} from "../../context/DependentContext";
import {getToken} from "../../context/UserContext";
import {readAllEmpWorkExperience, readAllMyWorkExperience} from "../../context/WorkExperienceContext";
import MenuItem from "@material-ui/core/MenuItem";
import {readAllEmpEducations, readAllLevels, readAllMyEducations} from "../../context/EducationContext";
import {readAllEmpSkills, readAllMySkills} from "../../context/SkillContext";
import {readAllSkills} from "../../context/OrganizationContext";
import {
    readAllEmpLanguages,
    readAllLanguageCompetency,
    readAllLanguageFluency,
    readAllLanguages,
    readAllMyLanguages
} from "../../context/LanguageContext";
import {readAllEmpLicenses, readAllLicences, readAllMyLicenses} from "../../context/LicenseContext";


export default function Qualifications(props) {
    console.log(props.props)
    let empID= props.props
    let [showForm4_1, setShowForm4_1] = useState(false);
    let [showForm4_2, setShowForm4_2] = useState(false);
    let [showForm4_3, setShowForm4_3] = useState(false);
    let [showForm4_4, setShowForm4_4] = useState(false);
    let [showForm4_5, setShowForm4_5] = useState(false);

// for work Experience
    let [company, setCompany] = useState('');
    let [title_of_job, setTitle_of_job] = useState("");
    let [from, setFrom]  = useState("2014-11-08");
    const [to, setTo] = React.useState('2014-11-09');
    let [comment, setComment]  = useState("");

    const handleDateChange4_1_from = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setFrom(dat);
    };
    const handleDateChange4_1_to = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setTo(dat);
    };
    const tokenString = localStorage.getItem('id_token');

    let [workExperienceData, setWorkExperienceData]  = useState([]);
    // useEffect(() => {
    //     readAllMyWorkExperience().then(r => setWorkExperienceData(r))
    // }, [""]);
    useEffect(() => {
        readAllEmpWorkExperience(props).then(r => setWorkExperienceData(r))
    }, [""]);
    let details = [];
    if (workExperienceData) {
        workExperienceData.map(y => {
            const data = [
                y.company,
                y.title_of_job,
                y.from,
                y.to,
                y._id
            ]
            details.push(data);
        });
    }

    const options = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[4]]
                let work_experiences = [x[0]]
                return axios.delete('/employees/'+empID+'/work_experiences', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({work_experiences})
                })
                    .then(function (response) {
                        readAllEmpWorkExperience(props).then(r => setWorkExperienceData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns = [
        {
            name: "Company",
            options: {
                display: true,
            }
        },
        {
            name: "Title of Job",
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
            name: "ID",
            options: {
                display: false,
                onRowClick: (rowData, rowState) => {
                    console.log(rowData, rowState);
                },
            }
        },
    ];

//end of work experience

    //Start of Education

    let [institute, setInstitute] = useState('');
    let [specialization, setSpecialization]  = useState("");
    let [start_date, setStartDate]  = useState("2014-11-08");
    const [end_date, setEndDate] = React.useState('2014-11-09');
    let [year, setYear]  = useState("");
    let [gpa, setGpa]  = useState("");
    let [level, setLevel]  = useState("");
    let [levels, setLevels]  = useState([]);



    const handleDateChange4_1_start_date = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setStartDate(dat);
    };
    const handleDateChange4_1_end_date = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setEndDate(dat);
    };
    let [educationData, setEducationData]   = useState([]);
    // useEffect(() => {
    //     readAllMyEducations().then(r => setEducationData(r))
    // }, [""]);
    useEffect(() => {
        readAllEmpEducations(props).then(r => setEducationData(r))
    }, [""]);
    useEffect(() => {
        readAllLevels().then(r => setLevels(r))
    }, [""]);
    let details2 = [];
    if (educationData) {
        educationData.map(y => {
            const data = [
                y.level.name,
                y.year,
                y.gpa,
                y._id
            ]
            details2.push(data);
        });
    }

    const options2 = {
        filterType: "checkbox",
        selectableRowsOnClick: false,
        onRowsDelete: async (rowsDeleted, dataRows) => {
        },
        onRowClick: async (rowData) => {
            var answer = window.confirm("Delete the data");
            if (answer) {
                const tokenString = getToken()
                let x = [rowData[3]]
                let educations = [x[0]]
                return axios.delete('/'+empID+'/me/education', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({educations})
                })
                    .then(function (response) {
                        readAllEmpEducations(props).then(r => setEducationData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns2 = [
        {
            name: "Level",
            options: {
                display: true,
            }
        },
        {
            name: "Year",
            options: {
                display: true,
            }
        },
        {
            name: "GPA",
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
    //End of Education

    //Start of Skills
    let [skill, setSkill] = useState('');
    let [years_of_experience, setYears_Of_Experience]   = useState("");
    let [comment2, setComment2]  = useState("");
    let [skills, setSkills]  = useState([]);

    let [skillData, setSkillData]  = useState([]);
    // useEffect(() => {
    //     readAllMySkills().then(r => setSkillData(r))
    // }, [""]);
    useEffect(() => {
        readAllEmpSkills(props).then(r => setSkillData(r))
    }, [""]);
    useEffect(() => {
        readAllSkills().then(r => setSkills(r))
    }, [""]);
    let details3 = [];
    console.log(skillData)
    if (skillData) {
        skillData.map(y => {
            const data = [
                y.skill.name,
                y.years_of_experience,
                y._id
            ]
            details3.push(data);
        });
    }

    const options3 = {
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
                let skills = [x[0]]
                console.log(JSON.stringify({skills}))
                return axios.delete('/employees/'+empID+'/skills', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({skills})
                })
                    .then(function (response) {
                        readAllEmpSkills(props).then(r => setSkillData(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns3 = [
        {
            name: "Skills",
            options: {
                display: true,
            }
        },
        {
            name: "Years of Experience",
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
    //End of Skills


    //Start of Languages
    let [language, setLanguage] = useState('');
    let [fluency, setFluency]   = useState("");
    let [competency, setCompetency]   = useState("");
    let [comment4, setComment4]   = useState([]);

    let [languageData, setLanguageData] = useState([]);
    let [myLanguages, setMyLanguages]  = useState([]);
    let [competencyData, setCompetencyData] = useState([]);
    let [fluencyData, setFluencyData] = useState([]);

    useEffect(() => {
        readAllMyLanguages().then(r => setMyLanguages(r))
    }, [""]);
    useEffect(() => {
        readAllEmpLanguages(props).then(r => setMyLanguages(r))
    }, [""]);
    useEffect(() => {
        readAllLanguages().then(r => setLanguageData(r))
    }, [""]);
    useEffect(() => {
        readAllLanguageFluency().then(r => setFluencyData(r))
    }, [""]);
    useEffect(() => {
        readAllLanguageCompetency().then(r => setCompetencyData(r))
    }, [""]);
    let details4 = [];
    console.log(myLanguages)
    if (myLanguages) {
        myLanguages.map(y => {
            const data = [
                y.language.name,
                y.fluency.name,
                y.competency.name,
                y.comment,
                y._id
            ]
            details4.push(data);
        });
    }

    const options4 = {
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
                let languages = [x[0]]
                console.log(JSON.stringify({languages}))
                return axios.delete('/employees/me/languages', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({languages})
                })
                    .then(function (response) {
                        readAllEmpLanguages().then(r => setMyLanguages(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns4 = [
        {
            name: "Language",
            options: {
                display: true,
            }
        },
        {
            name: "Fluency",
            options: {
                display: true,
            }
        },
        {
            name: "Competency",
            options: {
                display: true,
            }
        },
        {
            name: "Comments",
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

    //End of Languages

    //Start of Licenses
    let [license_type, setLicenseType]  = useState('');
    let [license_number, setLicenseNumber]   = useState("");
    let [issued_date, setIssued_Date]    = useState("2014-11-08");
    let [expiry_date, setExpiry_Date]   = useState("2014-11-09");

    let [LicenseData, setLicenseData] = useState([]);
    let [myLicences, setMyLicences]   = useState([]);

    const handleDateChange4_5_issued_date = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setIssued_Date(dat);
    };
    const handleDateChange4_5_expiry_date = (date) => {

        let dat = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        setExpiry_Date(dat);
    };
    useEffect(() => {
        readAllEmpLicenses(props).then(r => setMyLicences(r))
    }, [""]);
    useEffect(() => {
        readAllLicences().then(r => setLicenseData(r))
    }, [""]);

    let details5 = [];
    console.log(myLicences)
    if (myLicences) {
        myLicences.map(y => {
            const data = [
                y.license_type.name,
                y.issued_date,
                y.expiry_date,
                y._id
            ]
            details5.push(data);
        });
    }

    const options5 = {
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
                let licenses = [x[0]]
                console.log(JSON.stringify({licenses}))
                return axios.delete('/employees/me/licenses', {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({licenses})
                })
                    .then(function (response) {
                        readAllEmpLicenses(props).then(r => setMyLicences(r))
                    })
            } else {
                //some code
            }
        },

    };
    const columns5 = [
        {
            name: "License Type",
            options: {
                display: true,
            }
        },
        {
            name: "Issued Date",
            options: {
                display: true,
            }
        },
        {
            name: "Expiry Date",
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

    //End of Languages

    let showF4_1 = () => {
        setShowForm4_1(!showForm4_1);
    }
    let showF4_2 = () => {
        setShowForm4_2(!showForm4_2);

    }
    let showF4_3 = () => {
        setShowForm4_3(!showForm4_3);
    }
    let showF4_4 = () => {
        setShowForm4_4(!showForm4_4);
    }
    let showF4_5 = () => {
        setShowForm4_5(!showForm4_5);
    }

    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>
            {/*Start of Work Experience*/}
            <div>
                <div>
                    <h2>Work Experience</h2>
                    <form>
                        {!showForm4_1 && (
                            <button onClick={showF4_1}> Add</button>)}
                        {showForm4_1 && (
                            <button onClick={showF4_1}> Cancel</button>)}
                    </form>

                    {showForm4_1 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Company"
                                       value={company}
                                       onChange={e => setCompany(e.target.value)}   type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Job Title"
                                       value={title_of_job}
                                       onChange={e => setTitle_of_job(e.target.value)}  type="search" variant="outlined"/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container style={{margin: "20px"}}  >

                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="From"
                                        format="MM/dd/yyyy"
                                        defaultValue={from} value={from}
                                        onChange={handleDateChange4_1_from}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="To"
                                        format="MM/dd/yyyy"
                                        defaultValue={to} value={to}
                                        onChange={handleDateChange4_1_to}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <TextField style={{margin: "20px"}} id="outlined-search" label="Comments"
                                               value={comment}
                                               onChange={e => setComment(e.target.value)}   type="search" variant="outlined"/>
                                </Grid>
                            </MuiPickersUtilsProvider>

                            <br/>
                            <button
                                disabled={
                                    company.length === 0 || title_of_job.length === 0
                                }
                                onClick={() => {
                                    const dependent = {
                                        "company": company,
                                        "title_of_job": title_of_job,
                                        "from": from,
                                        "to":to,
                                        "comment":comment

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
                                    return axios.post('/employees/me/work_experiences', dDetails, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            'content-type': 'application/json'
                                        }
                                    }).then(function (response) {
                                            setCompany('')
                                            setComment('')
                                            setTitle_of_job('')
                                        readAllMyWorkExperience().then(r => setWorkExperienceData(r))
                                        }
                                    )
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                }
                                } > Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Work Experience"
                    data={details}
                    columns={columns}
                    options={options}
                />
            </div>

            {/*End of Work Experience*/}


            {/*Start of Education*/}
            <div>
                <div>
                    <h2>Education</h2>

                    <form>
                        {!showForm4_2 && (
                            <button onClick={showF4_2}> Add</button>)}
                        {showForm4_2 && (
                            <button onClick={showF4_2}> Cancel</button>)}
                    </form>

                    {showForm4_2 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Institue"
                                       value={institute}
                                       onChange={e => setInstitute(e.target.value)}  type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Specialization"
                                       value={specialization}
                                       onChange={e => setSpecialization(e.target.value)}  type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Year"
                                       value={year}
                                       onChange={e => setYear(e.target.value)}   type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="GPA"
                                       value={gpa}
                                       onChange={e => setGpa(e.target.value)}   type="search" variant="outlined"/>
                            <TextField
                                id="outlined-select-currency-native"
                                value={level}
select
                                label="Nationality"
                                onChange={e => setLevel(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {levels.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container style={{margin: "20px"}}  >

                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        defaultValue={start_date} value={start_date}
                                        onChange={handleDateChange4_1_start_date}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        defaultValue={end_date} value={end_date}
                                        onChange={handleDateChange4_1_end_date}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </Grid>
                            </MuiPickersUtilsProvider>
                            <br/>
                            <button
                                disabled={
                                    institute.length === 0 || year.length === 0 || gpa.length === 0
                                }
                                onClick={() => {
                                    const dependent = {
                                        "institute": institute,
                                            "year": year,
                                        "gpa": gpa,
                                        "start_date":start_date,
                                        "end_date":end_date,
                                        "level":level

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
                                    return axios.post('/employees/me/education', dDetails, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            'content-type': 'application/json'
                                        }
                                    }).then(function (response) {
                                            setInstitute('')
                                            setYear('')
                                            setGpa('')
                                            readAllMyEducations().then(r => setEducationData(r))
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
                    title="Education"
                    data={details2}
                    columns={columns2}
                    options={options2}
                />
            </div>
            {/*End of Education*/}

            {/*Start of Skills*/}

            <div>
                <div>
                    <h2>Skills</h2>

                    <form>
                        {!showForm4_3 && (
                            <button onClick={showF4_3}> Add</button>)}
                        {showForm4_3 && (
                            <button onClick={showF4_3}> Cancel</button>)}
                    </form>

                    {showForm4_3 && (
                        <form>
                            <TextField
                                id="outlined-select-currency-native"
                                value={skill}
                                select
                                label="Skill"
                                onChange={e => setSkill(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {skills.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Years of Experience"
                                       value={years_of_experience}
                                       onChange={e => setYears_Of_Experience(e.target.value)}    type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Comment"
                                       value={comment2}
                                       onChange={e => setComment2(e.target.value)}    type="search" variant="outlined"/>

                            <br/>
                            <button
                                disabled={
                                    skill.length === 0 || years_of_experience.length === 0
                                }
                                onClick={() => {
                                    const dependent = {
                                        "skill": skill,
                                        "years_of_experience": years_of_experience,
                                        "comment": comment2,

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
                                    return axios.post('/employees/me/skills', dDetails, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            'content-type': 'application/json'
                                        }
                                    }).then(function (response) {
                                            setSkill('')
                                            setComment2('')
                                            setYears_Of_Experience('')
                                            readAllMySkills().then(r => setSkillData(r))
                                        }
                                    )
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                }
                                }> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Skills"
                    data={details3}
                    columns={columns3}
                    options={options3}
                />
            </div>
            {/*End of Skills*/}


            {/*Start of Languages*/}
            <div>
                <div>
                    <h2>Languages</h2>
                    <form>
                        {!showForm4_4 && (
                            <button onClick={showF4_4}> Add</button>)}
                        {showForm4_4 && (
                            <button onClick={showF4_4}> Cancel</button>)}
                    </form>

                    {showForm4_4 && (
                        <form>
                            <TextField
                                id="outlined-select-currency-native"
                                value={language}
                                select
                                label="Language"
                                onChange={e => setLanguage(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {languageData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency-native"
                                value={fluency}
                                select
                                label="FluencyData"
                                onChange={e => setFluency(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {fluencyData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency-native"
                                value={competency}
                                select
                                label="Competency"
                                onChange={e => setCompetency(e.target.value)}
                                helperText="Please select your currency"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {competencyData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Comment"
                                       value={comment4}
                                       onChange={e => setComment4(e.target.value)}    type="search" variant="outlined"/>
                            <br/>
                            <button
                                disabled={
                                    language.length === 0 || fluency.length === 0 ||  competency.length === 0
                                }
                                onClick={() => {
                                    const dependent = {
                                        "language": language,
                                        "fluency": fluency,
                                        "competency": competency,
                                        "comment": comment4,

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
                                    return axios.post('/employees/me/languages', dDetails, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            'content-type': 'application/json'
                                        }
                                    }).then(function (response) {
                                            setLanguage('')
                                            setFluency('')
                                            setCompetency('')
                                            readAllMyLanguages().then(r => setMyLanguages(r))
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
                    title="Languages"
                    data={details4}
                    columns={columns4}
                    options={options4}
                />
            </div>
           {/*end of Languages */}

            {/*Start of Licenses*/}
            <div>
                <div>
                    <h2>Licenses</h2>
                    <form>
                        {!showForm4_5 && (
                            <button onClick={showF4_5}> Add</button>)}
                        {showForm4_5 && (
                            <button onClick={showF4_5}> Cancel</button>)}
                    </form>

                    {showForm4_5 && (
                        <form>
                            <TextField
                                id="outlined-select-currency-native"
                                value={license_type}
                                select
                                label="License Type"
                                onChange={e => setLicenseType(e.target.value)}
                                helperText="Please select your License Type"
                                variant="outlined"
                                style={{margin: "20px"}}>
                                {LicenseData.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="License Number"
                                       value={license_number}
                                       onChange={e => setLicenseNumber(e.target.value)}   type="search" variant="outlined"/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container style={{margin: "20px"}}  >

                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Issued Date"
                                        format="MM/dd/yyyy"
                                        defaultValue={issued_date} value={issued_date}
                                        onChange={handleDateChange4_5_issued_date}

                                    />
                                    <KeyboardDatePicker
                                        style={{marginTop:'25px'}}
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Expiry Date"
                                        format="MM/dd/yyyy"
                                        defaultValue={expiry_date} value={expiry_date}
                                        onChange={handleDateChange4_5_expiry_date}

                                    />

                                </Grid>
                            </MuiPickersUtilsProvider>
                            <br/>
                            <button
                                disabled={
                                    license_type.length === 0 || license_number.length === 0
                                }
                                onClick={() => {
                                    const dependent = {
                                        "license_type": license_type,
                                        "license_number": license_number,
                                        "issued_date": issued_date,
                                        "expiry_date":expiry_date

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
                                    return axios.post('/employees/me/licenses', dDetails, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            'content-type': 'application/json'
                                        }
                                    }).then(function (response) {
                                            setLicenseType('')
                                            setLicenseNumber('')

                                            readAllMyLicenses().then(r => setMyLicences(r))
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
                    title="Licenses"
                    data={details5}
                    columns={columns5}
                    options={options5}
                />
            </div>
        </div>
    );
}