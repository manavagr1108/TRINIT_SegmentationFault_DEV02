import { Flex } from "@mantine/core";
import UpdateTutorDetails from "./UpdateTutorDetails";
import React from "react";
import useAuthTutor from "../../../context/TutorAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import { loggedInNavLinks, unprotectedNavLinks } from "../NavLinks/Navlinks";
import HelpDesk from "./ChatBot";

const Home = ({ children }: { children: React.ReactElement }) => {
  const { tutor, isProfileUpdated } = useAuthTutor();
  const cloneChildWithProp = React.cloneElement(children, tutor);
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
          <UpdateTutorDetails {...tutor} />
        )}
      </Flex>
      <HelpDesk delay={1} />

    </Flex>
  );
};

export default Home;
