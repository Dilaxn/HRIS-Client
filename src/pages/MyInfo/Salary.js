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
import {
    readAllAccountTypes,
    readAllCurrency,
    readAllEmpSalary,
    readAllMySalary,
    readAllPayFrequency
} from "../../context/SalaryContext";
import MenuItem from "@material-ui/core/MenuItem";


export default function Salary() {

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
        readAllMySalary().then(r => setSalaryData(r))


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
        selectableRows: false,


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


            <MUIDataTable
                title="Employee List"
                data={details}
                columns={columns}
                options={options}
            />
        </div>
    );
}