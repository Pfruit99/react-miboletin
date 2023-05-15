import React from "react"
import { Redirect } from "react-router-dom"
// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Admin
import User from "../pages/Admin/User"
import Rector from "../pages/Admin/Rector"
import Teacher from "../pages/Admin/Teacher"
import Student from "../pages/Admin/Student"
import School from "../pages/Admin/School"

// Process


// Other
import NotFound from "../pages/NotFound"
import ConsumptionEmployee from "../pages/Consumption/ConsumptionEmployee";
import Contract from "../pages/Admin/Contract"
import Course from "../pages/Admin/Course"
import Subject from "../pages/Admin/Subject"
import Qualification from "../pages/Process/Qualification"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  // Administration
  { path: "/administration/user", component: User, actionsRoute:["usuario", "administrador"] },
  { path: "/administration/rector", component: Rector, actionsRoute:["usuario", "administrador", "rector"] },
  { path: "/administration/teacher", component: Teacher, actionsRoute:["usuario", "administrador", "rector"] },
  { path: "/administration/student", component: Student, actionsRoute:["usuario", "administrador", "rector", "docente"] },
  { path: "/administration/school", component: School, actionsRoute:["usuario", "administrador"] },
  { path: "/administration/contracts", component: Contract, actionsRoute:["usuario", "administrador", "rector"] },
  { path: "/administration/course", component: Course, actionsRoute:["usuario", "administrador", "rector", "docente"] },
  { path: "/administration/subject", component: Subject, actionsRoute:["usuario", "administrador", "rector", "docente"] },

  // Processes
  { path: "/process/qualification", component: Qualification, actionsRoute:["usuario", "administrador", "docente"] },

  // Report
  { path: "/report/reportCard", component: Subject, actionsRoute:["usuario","administrador", "docente",  "estudiante", "rector"] },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },

]

const publicRoutes = [
  { path: "/consumption/employee", exact: true,  component: ConsumptionEmployee},
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/not-found", component: NotFound },
]

export { authProtectedRoutes, publicRoutes }
