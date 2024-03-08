import { Button, Flex, Text } from "@mantine/core";
import useAuthStudent from "../../../context/StudentAuthContext";
import { useNavigate } from "react-router-dom";
import { currState, showNotification } from "../../../utils/helpers";
import { studentLogout } from "../../../utils/apiCalls";
import useRouteTypeContext from "../../../context/RouteTypeContext";

const Home = () => {
  const { student } = useAuthStudent();
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();

  const logout = async () => {
    const response = await studentLogout();
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setType(currState.UNPROTECTED);
      navigate("/auth/student");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };

  return (
    <>
      <Flex justify="space-between">
        <Text>Welcome to student home {student?.name}</Text>
        <Button onClick={logout}>Logout</Button>
      </Flex>
    </>
  );
};

export default Home;
