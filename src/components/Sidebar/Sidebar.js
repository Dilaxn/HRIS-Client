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
  FolderShared, Chat,
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

    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
      id: 1, label: "Admin", link: "/app/admin", icon: <BusinessCenter />,
      children: [
        {
          label: "User Management", link: "/app/admin/usermanagement",
          children: [
            { label: "Users", link: "/app/admin/usermanagement/users/" },
          ],
        },

        {
          label: "Job", link: "/app/admin/job",
          children: [
            { label: "Job Titles", link: "/app/admin/job/jobtitles" },
            { label: "Pay Grades", link: "/app/admin/job/paygrades" },
            { label: "Employment Status", link: "/app/admin/job/employementstatus" },
            { label: "Job Categories", link: "/app/admin/job/jobcategories" },
            { label: "Work Shifts", link: "/app/admin/job/addworkshift" },
          ],
        },
        {
          label: "Organization", link: "/app/admin/organization",
          children: [
            { label: "General Information", link: "/app/admin/organization/generalinformation" },
            { label: "Locations", link: "/app/admin/organization/locations" },
            { label: "Structure", link: "/app/admin/organization/ui/maps" },
          ],
        },
        {
          label: "Qualifications", link: "/app/admin/qualifications",
          children: [
            { label: "Skills", link: "/app/admin/qualifications/skills" },
            { label: "Education", link: "/app/admin/qualifications/education" },
            { label: "Licenses", link: "/app/admin/qualifications/licenses" },
            { label: "Languages", link: "/app/admin/qualifications/languages" },
            { label: "Memberships", link: "/app/admin/qualifications/memberships" },
          ],
        },
        { label: "Nationality", link: "/app/admin/nationality" },
        {
          label: "Configuration", link: "/app/admin/configuration",
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
          label: "Configuration", link: "/app/pim/configuration",
          children: [
            { label: "Optional Fields", link: "/app/pim/configuration/optionalFields" },
            { label: "Custom Fields", link: "/app/pim/configuration/customFields" },
            { label: "Data Import", link: "/app/pim/configuration/dataImport" },
            { label: "Reporting Methods", link: "/app/pim/configuration/reportMethods" },
            { label: "Terminated Reasons", link: "/app/pim/configuration/terminatedReasons" },
          ],
        },
        { label: "Employee List", link: "/app/pim/employeeList" },
        { label: "Add Employee", link: "/app/pim/addEmployee" },
        { label: "Reports", link: "/app/pim/reports" },
      ],
    },

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
        { label: "Assign Leave", link: "/app/leave/assignLeave" },
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

    // {
    //   id: 1,
    //   label: "Typography",
    //   link: "/app/typography",
    //   icon: <TypographyIcon />,
    // },
    // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    // {
    //   id: 3,
    //   label: "Notifications",
    //   link: "/app/notifications",
    //   icon: <NotificationsIcon />,
    // },
    // {
    //   id: 4,
    //   label: "UI Elements",
    //   link: "/app/ui",
    //   icon: <UIElementsIcon />,
    //   children: [
    //     { label: "Icons", link: "/app/ui/icons" },
    //     { label: "Charts", link: "/app/ui/charts" },
    //     { label: "Maps", link: "/app/ui/maps" },
    //   ],
    // },
    // { id: 5, type: "divider" },
    // { id: 6, type: "title", label: "HELP" },
    // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
    // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
    // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
    // { id: 10, type: "divider" },
    // { id: 11, type: "title", label: "PROJECTS" },
    // {
    //   id: 12,
    //   label: "My recent",
    //   link: "",
    //   icon: <Dot size="small" color="warning" />,
    // },
    // {
    //   id: 13,
    //   label: "Starred",
    //   link: "",
    //   icon: <Dot size="small" color="primary" />,
    // },
    // {
    //   id: 14,
    //   label: "Background",
    //   link: "",
    //   icon: <Dot size="small" color="secondary" />,
    // },
  ];


  let structure2 = [

    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },


    {
      id: 4, label: "Leave", link: "/app/dashboard", icon: <Beenhere />,
      children: [
        { label: "Apply", link: "/app/ui/icons" },
        { label: "My Leave", link: "/app/ui/charts" },
        {
          label: "Entitlements", link: "/app/ui/maps",
          children: [
            { label: "Add Entitlements", link: "/app/users" },
            { label: "Employee Entitlements", link: "/app/jobtitles" },
            { label: "My Entitlements", link: "/app/ui/maps" },
          ],
        },
        {
          label: "Reports", link: "/app/ui/icons",
          children: [
            { label: "Leave Entitlements and Usage Report", link: "/app/users" },
            { label: "My Leave Entitlements and Usage Report", link: "/app/jobtitles" },
          ],
        },
        {
          label: "Configure", link: "/app/ui/charts",
          children: [
            { label: "Leave Period", link: "/app/users" },
            { label: "Leave Types", link: "/app/jobtitles" },
            { label: "Work Week", link: "/app/ui/maps" },
            { label: "Holidays", link: "/app/ui/charts" },
          ],
        },
        { label: "Leave List", link: "/app/ui/maps" },
        { label: "Assign Leave", link: "/app/ui/maps" },
      ],
    },

    {
      id: 5, label: "Time", link: "/app/dashboard", icon: <AccessTime />,
      children: [
        {
          label: "Timesheets", link: "/app/ui/icons",
          children: [
            { label: "My Timesheets", link: "/app/users" },
            { label: "Employee Timesheets", link: "/app/jobtitles" },
          ],
        },
        {
          label: "Attendance", link: "/app/ui/charts",
          children: [
            { label: "My Records", link: "/app/users" },
            { label: "Punch In/Out", link: "/app/jobtitles" },
            { label: "Employee Records", link: "/app/ui/maps" },
            { label: "Configuration", link: "/app/ui/maps" },
          ],
        },
        {
          label: "Reports", link: "/app/ui/maps",
          children: [
            { label: "Project Reports", link: "/app/users" },
            { label: "Employee Reports", link: "/app/jobtitles" },
            { label: "Attendance Summary", link: "/app/ui/maps" },
          ],
        },
        {
          label: "Project Info", link: "/app/ui/maps",
          children: [
            { label: "Customers", link: "/app/users" },
            { label: "Projects", link: "/app/jobtitles" },
          ],
        },
      ],
    },
    { id: 6, label: "Recruitment", link: "/app/dashboard", icon: <GroupAdd /> },
    { id: 7, label: "MyInfo", link: "/app/myinfo", icon: <PersonIcon /> },
    { id: 8, label: "Directory", link: "/app/dashboard", icon: <FolderShared /> },
    { id: 9, label: "Buzz", link: "/app/dashboard", icon: <Chat /> },

    // {
    //   id: 1,
    //   label: "Typography",
    //   link: "/app/typography",
    //   icon: <TypographyIcon />,
    // },
    // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    // {
    //   id: 3,
    //   label: "Notifications",
    //   link: "/app/notifications",
    //   icon: <NotificationsIcon />,
    // },
    // {
    //   id: 4,
    //   label: "UI Elements",
    //   link: "/app/ui",
    //   icon: <UIElementsIcon />,
    //   children: [
    //     { label: "Icons", link: "/app/ui/icons" },
    //     { label: "Charts", link: "/app/ui/charts" },
    //     { label: "Maps", link: "/app/ui/maps" },
    //   ],
    // },
    // { id: 5, type: "divider" },
    // { id: 6, type: "title", label: "HELP" },
    // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
    // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
    // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
    // { id: 10, type: "divider" },
    // { id: 11, type: "title", label: "PROJECTS" },
    // {
    //   id: 12,
    //   label: "My recent",
    //   link: "",
    //   icon: <Dot size="small" color="warning" />,
    // },
    // {
    //   id: 13,
    //   label: "Starred",
    //   link: "",
    //   icon: <Dot size="small" color="primary" />,
    // },
    // {
    //   id: 14,
    //   label: "Background",
    //   link: "",
    //   icon: <Dot size="small" color="secondary" />,
    // },
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
