import { Button, Flex, Text } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import React from "react";
import useAuthStudent from "../../context/StudentAuthContext";
import { studentLogout } from "../../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import useRouteTypeContext from "../../context/RouteTypeContext";
import { currState, showNotification } from "../../utils/helpers";

function Header() {
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
    <Flex className="w-full py-4 px-2" justify="space-between" align="center">
      <Flex justify="space-evenly" align="center">
        <IconUserCircle size={35} />
        <Text> Welcome {student?.name}</Text>
      </Flex>
      <Button onClick={logout}>Logout</Button>
    </Flex>
  );
}

export default Header;
