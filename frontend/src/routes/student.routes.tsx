import { Navigate } from "react-router";
import { StudentHome } from "../pages";
import UpdateStudentDetails from "../pages/Student/Home/UpdateStudentDetails";
import SearchTutor from "../pages/Student/Home/SearchTutor";
import BookClassWithTutor from "../pages/Student/Home/BookClassWithTutor";

export const studentRoutes: RouteType[] = [
  {
    path: "/student/bookclass",
    element: <StudentHome children={<BookClassWithTutor />}></StudentHome>,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "/student/searchTutor",
    element: <StudentHome children={<SearchTutor />}></StudentHome>,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "/student/home",
    element: <StudentHome children={<UpdateStudentDetails />}></StudentHome>,
    title: "Home",
    description: "Home page for student",
  },
  {
    path: "*",
    element: <Navigate to="/student/home" />,
    title: "Home",
    description: "Home page for students",
  },
];
