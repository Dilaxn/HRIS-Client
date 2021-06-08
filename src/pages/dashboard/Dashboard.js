import React, {useEffect, useState} from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import {loginUser, readAllUsers, readUser, readUserDetails, readUserDetailsMe} from "../../context/UserContext";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function Dashboard(state) {

  var [namee, setNamee] = useState("");
  var [userName, setUserName] = useState("");

  var [mail, setMail]  = useState("");

  var [greet, setGreet] = useState("");

  let [userData, setUserData] = useState([]);
  let history = useHistory()

  var d = new Date();
  var time = d.getHours();



  useEffect(() => {
    readUser().then(r =>setNamee(r));
    readUserDetails().then(r=>{
      setUserName(r.user_name)
      setMail(r.email)
    })
    readUserDetailsMe().then(r=>{
      console.log(r)
    })
  }, []);
  // useEffect(() => {
  //   userData=JSON.parse(userData);
  // }, []);
  //
  // alert(userData[0].user_name)


  // var x =localStorage.getItem('userRole')
  // alert(x)
  // let namee;
  // namee = localStorage.getItem("f_name");
  // alert("read dshboard  "+namee)
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return (
    <>
      <PageTitle title="Dashboard" style={{ color: 'red'}}  />

    <h1>WelCome {namee}</h1>

      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Leave"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Link to="/app/leave/applyLeave">
                <Button
                    style={{width: '100%'}}

                    variant="contained"
                    size="medium"
                    color="secondary"
                >
                  Apply
                </Button>
                </Link>
                <Link to="/app/leave/myLeaveList">
                  <Button
                      style={{width: '100%',marginLeft:"10px"}}
                      // onClick={history.push('/app/leave/applyLeave')}
                      variant="contained"
                      size="medium"
                      color="secondary"
                  >
                    My Leave
                  </Button>
                </Link>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >

            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Recruitment"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.performanceLegendWrapper}>
              <div className={classes.legendElement}>
                <Dot color="warning" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Vacancies
                </Typography>
              </div>
              <div className={classes.legendElement}>
                <Dot color="primary" />
                <Typography
                  color="text"
                  colorBrightness="secondary"
                  className={classes.legendElementText}
                >
                  Applicants
                </Typography>
              </div>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                <Link to="/app/recruitment/applicants">
                Applicants</Link>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={77}
                classes={{ barColorPrimary: classes.progressBarPrimary }}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
                color="text"
                colorBrightness="secondary"
                className={classes.progressSectionTitle}
              >
                <Link to="/app/recruitment/jobvacancies">
                  Job Vacancies</Link>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={73}
                classes={{ barColorPrimary: classes.progressBarWarning }}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="My Information"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div >
              <h2>
                {userName}</h2>

              {/*<div className={classes.serverOverviewElementChartWrapper}>*/}
              {/*  <ResponsiveContainer height={50} width="99%">*/}
              {/*    <AreaChart data={getRandomData(10)}>*/}
              {/*      <Area*/}
              {/*        type="natural"*/}
              {/*        dataKey="value"*/}
              {/*        stroke={theme.palette.secondary.main}*/}
              {/*        fill={theme.palette.secondary.light}*/}
              {/*        strokeWidth={2}*/}
              {/*        fillOpacity="0.25"*/}
              {/*      />*/}
              {/*    </AreaChart>*/}
              {/*  </ResponsiveContainer>*/}
              {/*</div>*/}
            </div>
            <div className={classes.serverOverviewElement}>
              <h3>
                {namee}
              </h3>
              {/*<div className={classes.serverOverviewElementChartWrapper}>*/}
              {/*  <ResponsiveContainer height={50} width="99%">*/}
              {/*    <AreaChart data={getRandomData(10)}>*/}
              {/*      <Area*/}
              {/*        type="natural"*/}
              {/*        dataKey="value"*/}
              {/*        stroke={theme.palette.primary.main}*/}
              {/*        fill={theme.palette.primary.light}*/}
              {/*        strokeWidth={2}*/}
              {/*        fillOpacity="0.25"*/}
              {/*      />*/}
              {/*    </AreaChart>*/}
              {/*  </ResponsiveContainer>*/}
              {/*</div>*/}
            </div>

          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
              title="Projects"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>

                <Link to="/app/time/projectInfo/projects">
                  <Button
                      style={{width: '100%',marginLeft:"10px"}}
                      // onClick={history.push('/app/leave/applyLeave')}
                      variant="contained"
                      size="medium"
                      color="secondary"
                  >
                    View Projects
                  </Button>
                </Link>
              </Grid>
            </div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >

            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
              title="My Information"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>

                <Link to="/app/myInfo">
                  <Button
                      style={{width: '100%',marginLeft:"10px"}}
                      // onClick={history.push('/app/leave/applyLeave')}
                      variant="contained"
                      size="medium"
                      color="secondary"
                  >
                    My Information
                  </Button>
                </Link>
              </Grid>
            </div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >

            </Grid>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
              title="Buzz"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>

                <Link to="/app/buzz">
                  <Button
                      style={{width: '100%',marginLeft:"10px"}}
                      // onClick={history.push('/app/leave/applyLeave')}
                      variant="contained"
                      size="medium"
                      color="secondary"
                  >
                    Share Topic
                  </Button>
                </Link>
              </Grid>
            </div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >

            </Grid>
          </Widget>
        </Grid>

      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
