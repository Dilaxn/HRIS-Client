import React, {useEffect, useState} from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link} from 'react-router-dom'
// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import {getToken, loginUser} from "../../../context/UserContext";
import {readAllJobs, readAllPayGrades} from "../../../context/JobContext";
import axios from "axios";
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

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function PayGrades() {

  let [payGradeData, setPayGradeData] = useState([]);

  let history = useHistory()

  useEffect(() => {
    readAllPayGrades().then(r => setPayGradeData(r))
  }, ["/app/admin/job/payGrades"]);


  let details = [];
  if (payGradeData) {
    payGradeData.map(r => {
      const data = [
        r.name,
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
        let x = [rowData[1]]
        let pay_grades = x
        console.log(JSON.stringify({pay_grades}))
        return axios.delete('/pay_grades', {
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({pay_grades})
        })
            .then(function (response) {
              readAllJobs().then(r => setPayGradeData(r))
            })
      } else {
        //some code
      }
    },

  };

  const columns = [
    {
      name: "Pay Grade",
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
      <PageTitle title="Pay Grades" />
      <Link to="/app/admin/job/payGradesAdd">
        <Button type="button">
          Add Pay Grades
        </Button>
      </Link>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Pay Grades"
            data={details}
            columns={columns}
            options={options}
          />
        </Grid>

      </Grid>
    </>
  );
}
