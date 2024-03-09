import { Button, Container, Drawer, Flex, Text } from "@mantine/core";
import useAuthStudent from "../../../context/StudentAuthContext";
import { IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { currState, genders, showNotification } from "../../../utils/helpers";
import { studentLogout } from "../../../utils/apiCalls";
import useRouteTypeContext from "../../../context/RouteTypeContext";
import UpdateStudentDetails from "./UpdateStudentDetails";
import Navbar from "../../../components/Navbar/Navbar";
import { loggedInNavLinks, unprotectedNavLinks } from "../NavLinks/Navlinks";
import React from "react";

const Home = ({ children }: { children: React.ReactElement }) => {
  const { student } = useAuthStudent();
  console.log(student);
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const { isProfileUpdated } = useAuthStudent();

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
  const cloneChildWithProp = React.cloneElement(children, student);
  return (
    <Flex direction="column" className="h-[100vh]">
      <Flex className="mt-[7%]">
        <Navbar
          loggedInNavLinks={loggedInNavLinks}
          unprotectedNavLinks={unprotectedNavLinks}
        />
        <Flex className="w-full justify-center">
          {isProfileUpdated === true ? (
            cloneChildWithProp
          ) : (
            <UpdateStudentDetails student={student} />
          )}
        </Flex>
      </Flex>
      <Drawer.Root position="top" size="7%" opened={true} onClose={() => {}}>
        <Drawer.Content className="!shadow">
          <Drawer.Body py={0} className="h-full">
            <Flex className="h-full" justify="space-between" align="center">
              <Flex justify="space-evenly" align="center">
                <IconUserCircle size={35} />
                <Text> Welcome {student?.name}</Text>
              </Flex>
              <Button onClick={logout}>Logout</Button>
            </Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Flex>
  );
};

export default Home;
