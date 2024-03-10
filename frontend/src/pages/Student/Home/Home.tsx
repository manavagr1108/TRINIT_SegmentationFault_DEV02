import { Flex } from "@mantine/core";
import useAuthStudent from "../../../context/StudentAuthContext";
import UpdateStudentDetails from "./UpdateStudentDetails";
import Navbar from "../../../components/Navbar/Navbar";
import { loggedInNavLinks, unprotectedNavLinks } from "../NavLinks/Navlinks";
import React from "react";
import HelpDesk from "./ChatBot";

const Home = ({ children }: { children: React.ReactElement }) => {
  const { student } = useAuthStudent();
  const { isProfileUpdated } = useAuthStudent();

  const cloneChildWithProp = React.cloneElement(children, student);
  return (
    <Flex className="h-[100vh] w-[100vw] justify-start">
      <Flex className="h-full justify-start">
        <Navbar
          loggedInNavLinks={loggedInNavLinks}
          unprotectedNavLinks={unprotectedNavLinks}
        />
      </Flex>
      <Flex className="w-full h-full pl-[15rem] py-2 px-10 justify-center items-center">
        {isProfileUpdated === true ? (
          cloneChildWithProp
        ) : (
          <UpdateStudentDetails {...student} />
        )}
      </Flex>
      <HelpDesk delay={1} />
    </Flex>
  );
};

export default Home;
