import { useNavigate } from "react-router-dom";
import useAuthTutor from "../../context/TutorAuthContext";
import { useEffect } from "react";
import useAuthStudent from "../../context/StudentAuthContext";
const ProtectedRoutes = (props: any) => {
  const { type, children } = props;
  const { student, isLoggedIn, isFetched } =
    type === "student" ? useAuthStudent() : useAuthTutor();
  const navigate = useNavigate();
  useEffect(() => {
    if ((!student || !isLoggedIn) && isFetched) {
      if (type === "student") {
        navigate("/auth/student");
      } else {
        navigate("/auth/tutor");
      }
    }
  }, [student, isLoggedIn, type]);

  return isFetched && children;
};

export default ProtectedRoutes;
