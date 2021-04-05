import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Users from "../../pages/Admin/UserManagement/Users"
import JobTitles from "../../pages/Admin/Job/JobTitles"
// context
import { useLayoutState } from "../../context/LayoutContext";
import JobTitlesAdd from "../../pages/Admin/Job/JobTitlesAdd";
import PayGrades from "../../pages/Admin/Job/PayGrades";
import PayGradesAdd from "../../pages/Admin/Job/PayGradesAdd";
import EmployementStatus from "../../pages/Admin/Job/EmployementStatus";
import JobCategories from "../../pages/Admin/Job/JobCategories";
import AddWorkShift from "../../pages/Admin/Job/AddWorkShift";
import GeneralInformation from "../../pages/Admin/Organization/GeneralInformation";
import Locations from "../../pages/Admin/Organization/Locations";
import LocationsAdd from "../../pages/Admin/Organization/LocationsAdd";
import Education from "../../pages/Admin/Qualfications/Education";
import Skills from "../../pages/Admin/Qualfications/Skills";
import Languages from "../../pages/Admin/Qualfications/Languages";
import Licenses from "../../pages/Admin/Qualfications/Licenses";
import Memberships from "../../pages/Admin/Qualfications/Memberships";
import CustomFields from "../../pages/PIM/Configuration/CustomFields";
import OptionalFields from "../../pages/PIM/Configuration/OptionalFields";
import DataImport from "../../pages/PIM/Configuration/DataImport";
import ReportingMethods from "../../pages/PIM/Configuration/ReportingMethods";
import TerminatedReasons from "../../pages/PIM/Configuration/TerminatedReasons";
import ReportMethods from "../../pages/PIM/Configuration/ReportMethods";
import EmployeeList from "../../pages/PIM/Employee List/EmployeeList";
import AddEmployee from "../../pages/PIM/Add Employee/AddEmployee";
import MyInfo from "../../pages/MyInfo/MyInfo";
function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  // alert('props layoiut: ' + JSON.stringify(props));

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
              <Route path="/app/users" component={Users} />
              <Route path="/app/jobtitles" component={JobTitles} />
              <Route path="/app/jobtitlesadd" component={JobTitlesAdd} />
              <Route path="/app/paygrades" component={PayGrades} />
              <Route path="/app/paygradesadd" component={PayGradesAdd} />

              <Route path="/app/employementstatus" component={EmployementStatus} />
              <Route path="/app/jobcategories" component={JobCategories} />
              <Route path="/app/addworkshift" component={AddWorkShift} />
              <Route path="/app/generalinformation" component={GeneralInformation} />
              <Route path="/app/locations" component={Locations} />
              <Route path="/app/locationsadd" component={LocationsAdd} />
              <Route path="/app/education" component={Education} />
              <Route path="/app/languages" component={Languages} />
              <Route path="/app/licenses" component={Licenses} />
              <Route path="/app/memberships" component={Memberships} />
              <Route path="/app/skills" component={Skills} />

              <Route path="/app/customfields" component={CustomFields} />
              <Route path="/app/optionalfields" component={OptionalFields} />
              <Route path="/app/terminatedreasons" component={TerminatedReasons} />
              <Route path="/app/dataimport" component={DataImport()} />
              <Route path="/app/reportmethods" component={ReportMethods} />
              <Route path="/app/employeelist" component={EmployeeList} />

              <Route path="/app/addemployee" component={AddEmployee} />
              <Route path="/app/myinfo" component={MyInfo} />



              <Route path="/app/dataimport" component={DataImport()} />



            </Switch>
            {/*<Box*/}
            {/*  mt={5}*/}
            {/*  width={"100%"}*/}
            {/*  display={"flex"}*/}
            {/*  alignItems={"center"}*/}
            {/*  justifyContent="space-between"*/}
            {/*>*/}
            {/*  <div>*/}
            {/*    <Link*/}
            {/*      color={'primary'}*/}
            {/*      href={'https://flatlogic.com/'}*/}
            {/*      target={'_blank'}*/}
            {/*      className={classes.link}*/}
            {/*    >*/}
            {/*      Flatlogic*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      color={'primary'}*/}
            {/*      href={'https://flatlogic.com/about'}*/}
            {/*      target={'_blank'}*/}
            {/*      className={classes.link}*/}
            {/*    >*/}
            {/*      About Us*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      color={'primary'}*/}
            {/*      href={'https://flatlogic.com/blog'}*/}
            {/*      target={'_blank'}*/}
            {/*      className={classes.link}*/}
            {/*    >*/}
            {/*      Blog*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <Link*/}
            {/*      href={'https://www.facebook.com/flatlogic'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton aria-label="facebook">*/}
            {/*        <Icon*/}
            {/*          path={FacebookIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      href={'https://twitter.com/flatlogic'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton aria-label="twitter">*/}
            {/*        <Icon*/}
            {/*          path={TwitterIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*    <Link*/}
            {/*      href={'https://github.com/flatlogic'}*/}
            {/*      target={'_blank'}*/}
            {/*    >*/}
            {/*      <IconButton*/}
            {/*        aria-label="github"*/}
            {/*        style={{marginRight: -12}}*/}
            {/*      >*/}
            {/*        <Icon*/}
            {/*          path={GithubIcon}*/}
            {/*          size={1}*/}
            {/*          color="#6E6E6E99"*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*</Box>*/}
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
