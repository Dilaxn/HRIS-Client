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
import {readAllAccountTypes, readAllCurrency, readAllEmpSalary, readAllPayFrequency} from "../../context/SalaryContext";
import MenuItem from "@material-ui/core/MenuItem";

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


export default function Salary(props) {
    let empID = props.props
    console.log(empID)
    let [payGradeData, setPayGradeData] = useState([]);
    let [payGrade, setPayGrade] = useState('');
    let [payGradeName, setPayGradeName] = useState('');

    let [payFrequencyData, setPayFrequencyData] = useState([]);
    let [payFrequency, setPayFrequency] = useState('');
    let [payFrequencyName, setPayFrequencyName] = useState('');

    let [currencyData, setCurrencyData] = useState([]);
    let [currency, setCurrency] = useState('');
    let [currencyName, setCurrencyName] = useState('');
    let [accountTypeData, setAccountTypeData] = useState([]);
    let [accountType, setAccountType] = useState('');
    let [accountTypeName, setAccountTypeName] = useState('');
    let [salary_component, setSalary_component] = useState('');
    let [amount, setAmount] = useState('');
    let [deposit_account_number, setDeposit_account_number] = useState('');
    let [deposit_routing_number, setDeposit_routing_number] = useState('');
    let [deposit_amount, setDeposit_amount] = useState('');
    let [comments, setComments]  = useState('');
    let [salaryData, setSalaryData] = useState([]);


    let [showForm, setShowForm] = useState(false);
    let [name, setName] = useState("");
    let [relationship, setRelationship] = useState("");
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
        readAllEmpSalary(props).then(r => setSalaryData(r))
        readAllPayGrades().then(r => setPayGradeData(r))
        readAllPayFrequency().then(r => setPayFrequencyData(r))
        readAllCurrency().then(r => setCurrencyData(r))
        readAllAccountTypes().then(r => setAccountTypeData(r))

    }, ["/app/admin/job/payGrades"]);


    let details = [];
    if (salaryData) {
        salaryData.map(r => {
            const data = [
                r.salary_component,
                r.pay_frequency.name,
                r.currency.currency,
                r.amount,
                r.deposit_detail.account_number,
                r.comment,
                r._id,

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
                let x = [rowData[6]]
                let salary_components = x
                console.log(x)
                return axios.delete('/employees/' + empID + '/salary_components/' + x, {
                    headers: {
                        'Authorization': `Bearer ${tokenString}`,
                        'Content-Type': 'application/json',
                    }
                })
                    .then(function (response) {
                        readAllEmpSalary(props).then(r => setSalaryData(r))
                    })
            } else {
                //some code
            }
        },

    };
    let handleChange1 = (event, props) => {
        // console.log(props.props.props)
        // console.log(event.target.key)
        setPayGradeName(event.target.value);
        setPayGrade(props.props.props);
    };
    let handleChange2 = (event, props) => {
        // console.log(props.props.props)
        // console.log(event.target.key)
        setPayFrequencyName(event.target.value);
        setPayFrequency(props.props.props);
    };
    let handleChange3 = (event, props) => {
        // console.log(props.props.props)
        // console.log(event.target.key)
        setCurrencyName(event.target.value);
        setCurrency(props.props.props);
    };
    let handleChange4 = (event, props) => {
        // console.log(props.props.props)
        // console.log(event.target.key)
        setAccountTypeName(event.target.value);
        setAccountType(props.props.props);
    };

    const columns = [
        {
            name: "Salary Component",
            options: {
                display: true,
            }
        },
        {
            name: "Pay Frequency",
            options: {
                display: true,
            }
        },
        {
            name: "Currency",
            options: {
                display: true,
            }
        },
        {
            name: "Amount",
            options: {
                display: true,
            }
        },
        {
            name: "Account Number",
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

            <div>
                <form>
                    {!showForm && (
                        <button onClick={showF}> Add</button>)}
                    {showForm && (
                        <button onClick={showF}> Cancel</button>)}
                </form>

                {showForm && (
                    <form>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Pay Grade"
                                   value={payGradeName}
                                   onChange={handleChange1}
                                   helperText="Select Pay Grade"
                                   variant="outlined"
                        >
                            {payGradeData.map((option) => (
                                <MenuItem key={option._id} value={option.name} props={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Salary Component"
                                   value={salary_component}
                                   onChange={e => setSalary_component(e.target.value)} type="search" variant="outlined"/>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Pay Frequency"
                                   value={payFrequencyName}
                                   onChange={handleChange2}
                                   helperText="Select Pay Frequency"
                                   variant="outlined"
                        >
                            {payFrequencyData.map((option) => (
                                <MenuItem key={option._id} value={option.name} props={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Currency"
                                   value={currencyName}
                                   onChange={handleChange3}
                                   helperText="Select Currency"
                                   variant="outlined"
                        >
                            {currencyData.map((option) => (
                                <MenuItem key={option._id} value={option.currency} props={option._id}>
                                    {option.currency}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Amount"
                                   value={amount}
                                   onChange={e => setAmount(e.target.value)} type="number" variant="outlined"/>

                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Comments"
                                   multiline
                                   rows={10}
                                   value={comments}
                                   onChange={e => setComments(e.target.value)} type="search" variant="outlined"/>


                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Account Number"
                                   value={deposit_account_number}
                                   onChange={e => setDeposit_account_number(e.target.value)} type="search" variant="outlined"/>

                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }}
                                   id="outlined-select-currency"
                                   select
                                   label="Account Type"
                                   value={accountTypeName}
                                   onChange={handleChange4}
                                   helperText="Select Account Type"
                                   variant="outlined"
                        >
                            {accountTypeData.map((option) => (
                                <MenuItem key={option._id} value={option.name} props={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Routing Number"
                                   value={deposit_routing_number}
                                   onChange={e => setDeposit_routing_number(e.target.value)} type="search" variant="outlined"/>

                        <TextField style={{
                            margin: 'auto',
                            width: "52%",
                            align: 'center',
                            marginTop: '40px'
                        }} id="outlined-search" label="Amount"
                                   value={deposit_amount}
                                   onChange={e => setDeposit_amount(e.target.value)} type="number" variant="outlined"/>

                        <br/>
                        <button
                            disabled={
                                payGradeName.length === 0 || salary_component.length === 0 || payFrequencyName.length === 0 || currencyName.length === 0 || amount.length === 0|| deposit_account_number.length === 0 || deposit_routing_number.length === 0|| accountTypeName.length === 0 || deposit_amount.length === 0
                            }

                            onClick={() => {
                                console.log(name)
                                let emergency = {
                                    "pay_grade": payGrade,
                                    "salary_component": salary_component,
                                    "pay_frequency":payFrequency,
                                    "currency": currency,
                                    "amount": amount,
                                    "deposit_account_number": deposit_account_number,
                                    "deposit_account_type": accountType,
                                    "deposit_routing_number": deposit_routing_number,
                                    "deposit_amount": deposit_amount,
                                    "comment":comments

                                }

                                function clean(obj) {
                                    for (let x in obj) {
                                        if (obj[x] === "" || obj[x] === undefined) {
                                            delete obj[x];
                                        }
                                    }
                                    return obj
                                }

                                const eDetails = clean(emergency)
                                console.log(eDetails)
                                console.log("dffsd"+empID)
                                return axios.post('/employees/'+empID+'/salary_components', eDetails, {
                                    headers: {
                                        // Authorization: `Bearer ${tokenString}`,
                                        'content-type': 'application/json'
                                    }
                                }).then(function (response) {
                                        setDeposit_amount('')
                                        setDeposit_routing_number('')
                                        setDeposit_account_number('')
                                        setAmount('')
                                        setSalary_component('')
                                    setAccountTypeName('')
                                    setCurrencyName('')
                                    setPayGradeName('')
                                    setPayFrequencyName('')
                                        console.log(props)
                                        readAllEmpSalary(props).then(r => setSalaryData(r))
                                    }
                                )
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                            }
                            }
                        > Save
                        </button>
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