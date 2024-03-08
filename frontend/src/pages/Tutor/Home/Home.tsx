import { Flex, Text, Button } from "@mantine/core";
import useAuthTutor from "../../../context/TutorAuthContext";
import { useNavigate } from "react-router-dom";
import { currState, showNotification } from "../../../utils/helpers";
import { tutorLogout } from "../../../utils/apiCalls";
import useRouteTypeContext from "../../../context/RouteTypeContext";

const Home = () => {
  const { student } = useAuthTutor();
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const logout = async () => {
    const response = await tutorLogout();
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setType(currState.UNPROTECTED);
      navigate("/auth/tutor");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };

  return (
    <>
      <Flex justify="space-between">
        <Text>Welcome to tutor home {student?.name}</Text>
        <Button onClick={logout}>Logout</Button>
      </Flex>
    </>
  );
};

export default Home;
