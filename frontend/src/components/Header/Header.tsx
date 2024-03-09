import { Button, Flex, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import useAuthStudent from "../../context/StudentAuthContext";
import { studentLogout } from "../../utils/apiCalls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useRouteTypeContext from "../../context/RouteTypeContext";
import { currState, showNotification } from "../../utils/helpers";
import useAuthTutor from "../../context/TutorAuthContext";

function Header() {
  const currentPath = useLocation().pathname;

  const { isLoggedIn, student } = currentPath.includes("student")
    ? useAuthStudent()
    : useAuthTutor();
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const logout = async () => {
    const response = await studentLogout();
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setType(currState.UNPROTECTED);
      navigate("/home");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };
  return (
    <Flex className="w-full py-4 px-2" justify="space-between" align="center">
      {isLoggedIn ? (
        <Flex justify="space-evenly" align="center">
          <IconUserCircle size={35} />
          <Text> Welcome {student?.name}</Text>
        </Flex>
      ) : null}

      {isLoggedIn ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        "Welcome to LinguaConnect"
      )}
    </Flex>
  );
}

export default Header;
