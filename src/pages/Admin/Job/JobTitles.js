import React, {useEffect, useState} from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {Link, Redirect} from 'react-router-dom'
import {useHistory} from "react-router";

// components
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Table from "../../dashboard/components/Table/Table";

// data
import mock from "../../dashboard/mock";
import {loginUser, readAllUsers} from "../../../context/UserContext";
import {readAllJobs} from "../../../context/JobContext";
import axios from "axios";

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

export default function Users() {
  let [jobData, setJobData] = useState([]);

  let history = useHistory()

  useEffect(() => {
    readAllJobs().then(r => setJobData(r))
  }, ["/app/admin/job/jobTitles"]);
// console.log(userData)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(async () => {
  //    userData= readAllUsers()
  // }, []);

  // useEffect(async () => {
  //   await userData();
  // }, []);

  // alert(userData)
  // console.log(userData)

  const details = [];
  if (jobData) {

    jobData.map(r => {
      const data = [
        r.job_title,
        r.job_description,
          r._id
      ]
      // alert(r.email + "email")
      details.push(data);
    });
    // alert(details)
  }

  const options = {
   selectableRowsOnClick: false,
    // selectableRows: 'multiple',
    onRowsDelete: async (rowsDeleted, dataRows) => {
      console.log(rowsDeleted)
       // array of all ids to to be deleted

      // const idsToDelete = dataRows.map(d => details[d.dataIndex].id); // array of all ids to to be deleted
      // // http.delete(idsToDelete, res).then(window.alert('Deleted!')); // your delete request here
      // idsToDelete.map(id => axios.delete('http://localhost:3001/job_titles', {data: {"job_titles": id}}))
    },
    onRowClick: async (rowData) => {
      var answer = window.confirm("Delete the data");
      if (answer) {
        const tokenString = localStorage.getItem('id_token');
        let x = [rowData[2]]
        let job_titles = [x[0]]
        console.log(JSON.stringify({job_titles}))
        return axios.delete('http://localhost:3001/job_titles', {
          headers: {
            'Authorization': `Bearer ${tokenString}`,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({job_titles})
        })
            .then(function (response) {
              readAllJobs().then(r => setJobData(r))
            })
      }
      else {
        //some code
      }
      // array of all ids to to be deleted

      // const idsToDelete = dataRows.map(d => details[d.dataIndex].id); // array of all ids to to be deleted
      // // http.delete(idsToDelete, res).then(window.alert('Deleted!')); // your delete request here
      // idsToDelete.map(id => axios.delete('http://localhost:3001/job_titles', {data: {"job_titles": id}}))
    },

  };

  const columns = [
    {
      name: "Job Title",
      options: {
        display: true,
      }
    },
    {
      name: "Description",
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
      <PageTitle title="Add Job Title" />
      <Link to="/app/admin/job/jobTitlesAdd">
        <Button type="button">
          Add Job Title
        </Button>
      </Link>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={details}
            columns={columns}
            options={options}
          />
        </Grid>

      </Grid>
    </>
  );
}
