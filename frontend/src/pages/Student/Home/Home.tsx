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
  const { isProfileUpdated } = useAuthStudent();

  const cloneChildWithProp = React.cloneElement(children, student);
  return (
    <Flex direction="column" className="h-full justify-start">
      <Flex className="h-full justify-start">
        <Navbar
          loggedInNavLinks={loggedInNavLinks}
          unprotectedNavLinks={unprotectedNavLinks}
        />
        <Flex className="w-full ml-[15rem] py-2 px-10 justify-center items-start">
          {isProfileUpdated === true ? (
            cloneChildWithProp
          ) : (
            <UpdateStudentDetails {...student} />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
