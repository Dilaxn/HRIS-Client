import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  Person as PersonIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  EmojiPeople,
  Beenhere,
  AccessTime,
  HowToReg,
  GroupAdd,
  BusinessCenter,
  FolderShared,
  Chat,
  SupervisedUserCircle,
  SupervisorAccount,
  People as PeopleIcon,
  Toc as TocIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  CastForEducation,
  AccountBox,
  SettingsApplications,
  ListAlt,
  PersonAdd,
  Description,
  Bookmark, Book, Assessment, Assignment, PlaylistAddCheck, HourglassEmpty, AccountTree
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
import { loginUser, readUser, readUserRole, useUserDispatch, useUserState } from "../../context/UserContext";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import axios from "axios";
// let x = readUserRole()
let structure =[]


function Sidebar({ location }) {


  var x = localStorage.getItem('userRole');


  let structure1 = [

    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> ,},
    {
      id: 1, label: "Admin", link: "/app/admin", icon: <BusinessCenter />,
      children: [
        {
          label: "User Management", link: "/app/admin/userManagement",icon: <SupervisedUserCircle />,
          children: [
            { label: "Users", link: "/app/admin/userManagement/users/", icon: <PeopleIcon />},
          ],
        },

        {
          label: "Job", link: "/app/admin/job",icon: <WorkIcon />,
          children: [
            { label: "Job Titles", icon: <TocIcon />,link: "/app/admin/job/jobTitles",},
            { label: "Pay Grades", link: "/app/admin/job/payGrades" ,icon: <WorkIcon />},
            { label: "Employment Status", link: "/app/admin/job/employmentStatus",icon: <WorkIcon /> },
            { label: "Job Categories", link: "/app/admin/job/jobCategories" ,icon: <WorkIcon />},
            { label: "Work Shifts", link: "/app/admin/job/addWorkShift" ,icon: <WorkIcon />},
          ],
        },
        {
          label: "Organization", link: "/app/admin/organization",icon :<BusinessIcon />,
          children: [
            { label: "General Information", link: "/app/admin/organization/generalInformation" },
            { label: "Locations", link: "/app/admin/organization/locations" },
            { label: "Structure", link: "/app/admin/organization/ui/maps" },
          ],
        },
        {
          label: "Qualifications", link: "/app/admin/qualifications",icon :<CastForEducation />,
          children: [
            { label: "Skills", link: "/app/admin/qualifications/skills" },
            { label: "Education", link: "/app/admin/qualifications/education" },
            { label: "Licenses", link: "/app/admin/qualifications/licenses" },
            { label: "Languages", link: "/app/admin/qualifications/languages" },
            { label: "Memberships", link: "/app/admin/qualifications/memberships" },
          ],
        },
        { label: "Nationality", link: "/app/admin/nationality" ,icon :<AccountBox />,children: [     { label: "Nationality", link: "/app/admin/nationality"}]},
        {
          label: "Configuration", link: "/app/admin/configuration",icon :<SettingsApplications />,
          children: [
            { label: "Email Configuration", link: "/app/admin/configuration/emailConfiguration" },
            { label: "Email Subscription", link: "/app/admin/configuration/emailSubscription" },
            { label: "Location", link: "/app/admin/configuration/location" },
            { label: "Modules", link: "/app/admin/configuration/modules" },
            { label: "Social Media Authentication", link: "/app/admin/configuration/socialAndAuth" },
            { label: "Register OAuth Client", link: "/app/admin/configuration/registerOAuthClient" },
          ],
        },
      ],
    },

    {
      id: 3, label: "PIM", link: "/app/pim", icon: <EmojiPeople />,
      children: [
        {
          label: "Configuration", link: "/app/pim/configuration",icon :<SettingsApplications />,
          children: [
            { label: "Optional Fields", link: "/app/pim/configuration/optionalFields" },
            { label: "Custom Fields", link: "/app/pim/configuration/customFields" },
            { label: "Data Import", link: "/app/pim/configuration/dataImport" },
            { label: "Reporting Methods", link: "/app/pim/configuration/reportMethods" },
            { label: "Terminated Reasons", link: "/app/pim/configuration/terminatedReasons" },
          ],
        },
        { label: "Employee List", link: "/app/pim/employeeList" ,icon :<ListAlt />,children: [{ label: "Employee List", link: "/app/pim/employeeList" }]},
        { label: "Add Employee", link: "/app/pim/addEmployee",icon :<PersonAdd />,children: [ { label: "Add Employee", link: "/app/pim/addEmployee"}] },
        { label: "Reports", link: "/app/pim/reports",icon :<Description />,children: [ { label: "Reports", link: "/app/pim/reports"}] },
      ],
    },

    {
      id: 4, label: "Leave", link: "/app/leave", icon: <Beenhere />,
      children: [
        { label: "Apply", link: "/app/leave/applyLeave" ,icon :<Bookmark />,children: [ { label: "Apply Leave", link: "/app/leave/applyLeave"}] },
        { label: "My Leave", link: "/app/leave/myLeave" ,icon :<Book />,children: [{ label: "My Leave", link: "/app/leave/myLeave"}] },
        {
          label: "Entitlements", link: "/app/leave/entitlements",icon :<Assessment />,
          children: [
            { label: "Add Entitlements", link: "/app/leave/entitlements/addEntitlements" },
            { label: "Employee Entitlements", link: "/app/leave/entitlements/employeeEntitlements" },
            { label: "My Entitlements", link: "/app//leave/entitlements/myEntitlements" },
          ],
        },
        {
          label: "Reports", link: "/app/leave/reports",icon :<ListAlt />,
          children: [
            { label: "Leave Entitlements and Usage Report", link: "/app/leave/reports/leaveAndUsage" },
            { label: "My Leave Entitlements and Usage Report", link: "/app/leave/reports/myLeaveAndUsage" },
          ],
        },
        {
          label: "Configure", link: "/app/leave/configure",icon :<SettingsApplications />,
          children: [
            { label: "Leave Period", link: "/app/leave/configure/leavePeriod" },
            { label: "Leave Types", link: "/app/leave/configure/leaveTypes" },
            { label: "Work Week", link: "/app/leave/configure/workWeek" },
            { label: "Holidays", link: "/app/leave/configure/holidays" },
          ],
        },
        { label: "Leave List", link: "/app/leave/leaveList" ,icon :<Book />,children: [ { label: "Leave List", link: "/app/leave/leaveList" }]},
        { label: "Assign Leave", link: "/app/leave/assignLeave" ,icon :<Assignment />,children: [{ label: "Assign Leave", link: "/app/leave/assignLeave" }]},
      ],
    },

    {
      id: 5, label: "Time", link: "/app/time", icon: <AccessTime />,
      children: [
        {
          label: "Timesheets", link: "/app/time/timeSheets", icon: <HourglassEmpty />,
          children: [
            { label: "My Timesheets", link: "/app/time/timeSheets/myTimeSheets" },
            { label: "Employee TimeSheets", link: "/app/time/timeSheets/employeeTimeSheets" },
          ],
        },
        {
          label: "Attendance", link: "/app/time/attendance", icon: <PlaylistAddCheck />,
          children: [
            { label: "My Records", link: "/app/time/attendance/myRecords" },
            { label: "Punch In/Out", link: "/app/time/attendance/punchInOut" },
            { label: "Employee Records", link: "/app/time/attendance/employeeRecords" },
            { label: "Configuration", link: "/app/time/attendance/configuration" },
          ],
        },
        {
          label: "Reports", link: "/app/time/reports", icon: <ListAlt />,
          children: [
            { label: "Project Reports", link: "/app/time/reports/projectReports" },
            { label: "Employee Reports", link: "/app/time/reports/employeeReports" },
            { label: "Attendance Summary", link: "/app/time/reports/attendanceSummary" },
          ],
        },
        {
          label: "Project Info", link: "/app/time/projectInfo", icon: <AccountTree />,
          children: [
            { label: "Customers", link: "/app/time/projectInfo/customers" },
            { label: "Projects", link: "/app/time/projectInfo/projects" },
          ],
        },
      ],
    },
    { id: 6, label: "Recruitment", link: "/app/recruitment", icon: <GroupAdd />,children: [{ id: 6, label: "Recruitment", link: "/app/recruitment"}] },
    { id: 7, label: "MyInfo", link: "/app/myInfo", icon: <PersonIcon /> ,children: [ { id: 7, label: "MyInfo", link: "/app/myInfo"}]},
    { id: 8, label: "Directory", link: "/app/directory", icon: <FolderShared />,children: [ { id: 8, label: "Directory", link: "/app/directory"}] },
    { id: 9, label: "Buzz", link: "/app/buzz", icon: <Chat />,children: [   { id: 9, label: "Buzz", link: "/app/buzz"}] },


  ];


  let structure2 = [

    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },


    {
      id: 4, label: "Leave", link: "/app/leave", icon: <Beenhere />,
      children: [
        { label: "Apply", link: "/app/leave/applyLeave" },
        { label: "My Leave", link: "/app/leave/myLeave" },
        {
          label: "Entitlements", link: "/app/leave/entitlements",
          children: [
            { label: "Add Entitlements", link: "/app/leave/entitlements/addEntitlements" },
            { label: "Employee Entitlements", link: "/app/leave/entitlements/employeeEntitlements" },
            { label: "My Entitlements", link: "/app//leave/entitlements/myEntitlements" },
          ],
        },
        {
          label: "Reports", link: "/app/leave/reports",
          children: [
            { label: "Leave Entitlements and Usage Report", link: "/app/leave/reports/leaveAndUsage" },
            { label: "My Leave Entitlements and Usage Report", link: "/app/leave/reports/myLeaveAndUsage" },
          ],
        },
        {
          label: "Configure", link: "/app/leave/configure",
          children: [
            { label: "Leave Period", link: "/app/leave/configure/leavePeriod" },
            { label: "Leave Types", link: "/app/leave/configure/leaveTypes" },
            { label: "Work Week", link: "/app/leave/configure/workWeek" },
            { label: "Holidays", link: "/app/leave/configure/holidays" },
          ],
        },
        { label: "Leave List", link: "/app/leave/leaveList" },
        // { label: "Assign Leave", link: "/app/leave/assignLeave" },
      ],
    },

    {
      id: 5, label: "Time", link: "/app/time", icon: <AccessTime />,
      children: [
        {
          label: "Timesheets", link: "/app/time/timeSheets",
          children: [
            { label: "My Timesheets", link: "/app/time/timeSheets/myTimeSheets" },
            { label: "Employee TimeSheets", link: "/app/time/timeSheets/employeeTimeSheets" },
          ],
        },
        {
          label: "Attendance", link: "/app/time/attendance",
          children: [
            { label: "My Records", link: "/app/time/attendance/myRecords" },
            { label: "Punch In/Out", link: "/app/time/attendance/punchInOut" },
            { label: "Employee Records", link: "/app/time/attendance/employeeRecords" },
            { label: "Configuration", link: "/app/time/attendance/configuration" },
          ],
        },
        {
          label: "Reports", link: "/app/time/reports",
          children: [
            { label: "Project Reports", link: "/app/time/reports/projectReports" },
            { label: "Employee Reports", link: "/app/time/reports/employeeReports" },
            { label: "Attendance Summary", link: "/app/time/reports/attendanceSummary" },
          ],
        },
        {
          label: "Project Info", link: "/app/time/projectInfo",
          children: [
            { label: "Customers", link: "/app/time/projectInfo/customers" },
            { label: "Projects", link: "/app/time/projectInfo/projects" },
          ],
        },
      ],
    },
    { id: 6, label: "Recruitment", link: "/app/recruitment", icon: <GroupAdd /> },
    { id: 7, label: "MyInfo", link: "/app/myInfo", icon: <PersonIcon /> },
    { id: 8, label: "Directory", link: "/app/directory", icon: <FolderShared /> },
    { id: 9, label: "Buzz", link: "/app/buzz", icon: <Chat /> },

  ];


  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var [role, setRole] = useState("");
  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    var x = localStorage.getItem('userRole');
    // alert(x);
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });


  if (x === 'admin') {
    return (
      <Drawer

        variant={isPermanent ? "permanent" : "temporary"}
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: isSidebarOpened,
            [classes.drawerClose]: !isSidebarOpened,
          }),
        }}
        open={isSidebarOpened}
      >
        <div className={classes.toolbar} />
        <div className={classes.mobileBackButton}>
          <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          </IconButton>

        </div>
        <List className={classes.sidebarList}>

          {

            structure1.map(link => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))}

        </List>
      </Drawer>
    );

  } else {
    return (
      <Drawer

        variant={isPermanent ? "permanent" : "temporary"}
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: isSidebarOpened,
            [classes.drawerClose]: !isSidebarOpened,
          }),
        }}
        open={isSidebarOpened}
      >
        <div className={classes.toolbar} />
        <div className={classes.mobileBackButton}>
          <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          </IconButton>

        </div>
        <List className={classes.sidebarList}>

          {

            structure2.map(link => (
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
            ))}

        </List>
      </Drawer>
    );
  }
    // ##################################################################
    function handleWindowWidthChange() {
      var windowWidth = window.innerWidth;
      var breakpointWidth = theme.breakpoints.values.md;
      var isSmallScreen = windowWidth < breakpointWidth;

      if (isSmallScreen && isPermanent) {
        setPermanent(false);
      } else if (!isSmallScreen && !isPermanent) {
        setPermanent(true);
      }
    }

}

export default withRouter(Sidebar);
