import { Navigate } from "react-router-dom";
import { TutorHome, TutorUpdateProfile } from "../pages";
import ListClass from "../pages/Tutor/Home/ListClass";
import SetAvailableTime from "../pages/Tutor/Home/SetAvailableTime";
import ListRegisteredStudents from "../pages/Tutor/Home/ListRegisteredStudents";

export const tutorRoutes: RouteType[] = [
  {
    path: "/tutor/getRegisteredStudents",
    element: <TutorHome children={<ListRegisteredStudents />}></TutorHome>,
    title: "Home",
    description: "Home page for tutor",
  },
  {
    path: "/tutor/setAvailableTime",
    element: <TutorHome children={<SetAvailableTime />}></TutorHome>,
    title: "Home",
    description: "Home page for tutor",
  },
  {
    path: "/tutor/home",
    element: <TutorHome children={<TutorUpdateProfile />}></TutorHome>,
    title: "Home",
    description: "Home page for tutor",
  },
  {
    path: "*",
    element: <Navigate to="/tutor/home" />,
    title: "Home",
    description: "Home page for tutor",
  },
];
