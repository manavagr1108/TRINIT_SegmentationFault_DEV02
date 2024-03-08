import { Loader } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { currState, showNotification } from "../../../utils/helpers";
import { getGoogleStudentLogin } from "../../../utils/apiCalls";
import useRouteTypeContext from "../../../context/RouteTypeContext";

const GoogleStudentCallback = () => {
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const getStudentDetails = async (code: string) => {
    const response = await getGoogleStudentLogin(code);
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setType(currState.STUDENT);
      navigate("/student/home");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      setType(currState.UNPROTECTED);
      navigate("/auth/student");
      return;
    }
  };

  useEffect(() => {
    if (!queryParams.get("code")) {
      showNotification("Error", "Invalid code", "error");
      navigate("/auth/student");
      return;
    }
    getStudentDetails(queryParams.get("code") as string);
  }, []);
  return (
    <>
      <Loader size={30} />
    </>
  );
};

export default GoogleStudentCallback;
