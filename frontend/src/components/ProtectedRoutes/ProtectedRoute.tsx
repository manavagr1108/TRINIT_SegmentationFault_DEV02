import { useNavigate } from "react-router-dom";
import useAuthTutor from "../../context/TutorAuthContext";
import { useEffect } from "react";
import useAuthStudent from "../../context/StudentAuthContext";
import { showNotification } from "../../utils/helpers";
const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  const { student, isLoggedIn, isFetched, isProfileUpdated } =
    type === "student" ? useAuthStudent() : useAuthTutor();
  const navigate = useNavigate();
  useEffect(() => {
    if ((!student || !isLoggedIn) && isFetched) {
      if (type === "student") {
        navigate("/auth/student");
        return;
      } else {
        navigate("/auth/tutor");
        return;
      }
    }
    if (
      student &&
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
  }, [student, isLoggedIn, type, isProfileUpdated]);

  return isFetched && children;
};

export default ProtectedRoutes;
