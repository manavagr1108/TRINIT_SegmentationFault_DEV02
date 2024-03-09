import { useNavigate } from "react-router-dom";
import useAuthTutor from "../../context/TutorAuthContext";
import { useEffect } from "react";
import useAuthStudent from "../../context/StudentAuthContext";
import { showNotification } from "../../utils/helpers";
const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  let user: Student | Tutor | undefined = undefined;
  const { isLoggedIn, isFetched, isProfileUpdated } =
    type === "student" ? useAuthStudent() : useAuthTutor();
  if (type === "student") {
    const { student } = useAuthStudent();
    user = student;
  } else {
    const { tutor } = useAuthTutor();
    user = tutor;
  }
  const navigate = useNavigate();
  useEffect(() => {
    if ((!user || !isLoggedIn) && isFetched) {
      if (type === "student") {
        navigate("/auth/student");
        return;
      } else {
        navigate("/auth/tutor");
        return;
      }
    }
    if (
      user &&
      isLoggedIn &&
      isFetched &&
      type == "student" &&
      isProfileUpdated == false
    ) {
      showNotification(
        "Warning",
        "Update your profile before accessing any page",
        "warning"
      );
      navigate("/student/updateProfile");
      return;
    }
  }, [user, isLoggedIn, type, isProfileUpdated]);

  return isFetched && children;
};

export default ProtectedRoutes;
