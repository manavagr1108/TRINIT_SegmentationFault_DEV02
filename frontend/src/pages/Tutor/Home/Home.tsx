import { Flex } from "@mantine/core";
import UpdateTutorDetails from "./UpdateTutorDetails";
import React from "react";
import useAuthTutor from "../../../context/TutorAuthContext";
import Navbar from "../../../components/Navbar/Navbar";
import { loggedInNavLinks, unprotectedNavLinks } from "../NavLinks/Navlinks";

const Home = ({ children }: { children: React.ReactElement }) => {
  const { tutor, isProfileUpdated } = useAuthTutor();
  console.log(tutor);
  const cloneChildWithProp = React.cloneElement(children, tutor);
  return (
    <Flex direction="column" className="h-full w-[100vw] justify-start">
      <Flex className="h-full justify-start">
        <Navbar
          loggedInNavLinks={loggedInNavLinks}
          unprotectedNavLinks={unprotectedNavLinks}
        />
      </Flex>
      <Flex className="w-full pl-[15rem] py-2 px-10 justify-center items-start">
        {isProfileUpdated === true ? (
          cloneChildWithProp
        ) : (
          <UpdateTutorDetails {...tutor} />
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
