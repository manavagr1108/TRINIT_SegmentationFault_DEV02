import { Avatar, Button, Flex, Indicator, Text } from "@mantine/core";
import useAuthStudent from "../../context/StudentAuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthTutor from "../../context/TutorAuthContext";
import useRouteTypeContext from "../../context/RouteTypeContext";
import { studentLogout } from "../../utils/apiCalls";
import { currState, showNotification } from "../../utils/helpers";
import { useEffect } from "react";
const Navbar = ({
  loggedInNavLinks,
  unprotectedNavLinks,
}: {
  loggedInNavLinks: { name: string; link: string }[];
  unprotectedNavLinks: { name: string; link: string }[];
}) => {
  let user;
  const currentPath = useLocation().pathname;
  const { isLoggedIn, isProfileUpdated } = currentPath.includes("tutor")
    ? useAuthTutor()
    : useAuthStudent();
  if (currentPath.includes("tutor")) {
    const { tutor } = useAuthTutor();
    user = tutor;
  } else {
    const { student } = useAuthStudent();
    user = student;
  }
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
  const handleDarkToogle = (e: any) => {
    if (e.target.classList.value.includes("translate-x-10")) {
      document.body.classList.remove("dark");
      e.target.classList.remove("translate-x-10");
    } else {
      e.target.classList.add("translate-x-10");
      document.body.classList.add("dark");
    }
  };
  return (
    <Flex className="flex-col max-w-[20%] w-[15rem] bg-white rounded shadow-lg h-[100vh] pt-6 fixed overflow-hidden border-x-2">
      {isLoggedIn == true ? (
        <Flex direction="column" className="w-full h-full">
          <Flex className=" justify-evenly flex-wrap items-center">
            <Indicator inline label="New" color="indigo" size={18}>
              {user?.gender === "Male" ? (
                <Avatar
                  size="lg"
                  radius="sm"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                />
              ) : (
                <Avatar
                  size="lg"
                  radius="sm"
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png"
                />
              )}
            </Indicator>
            <Text fw={700}> {user?.name}</Text>
          </Flex>
          {isProfileUpdated == true &&
            loggedInNavLinks.map((navLink, i) => {
              return navLink.link.toLocaleLowerCase() ===
                currentPath.toLocaleLowerCase() ? (
                <Button
                  component={Link}
                  to={navLink.link}
                  variant="filled"
                  color="indigo"
                  className="hover:tracking-widest hover:border-2 text-white border-indigo-700 hover:text-md m-4 "
                >
                  {navLink.name}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={navLink.link}
                  variant="subtle"
                  color="indigo"
                  className="hover:tracking-widest hover:border-2 text-indigo-950 border-indigo-500 hover:text-md m-4"
                >
                  {navLink.name}
                </Button>
              );
            })}
          {isProfileUpdated === false ? (
            `/${currentPath.includes("tutor") ? "tutor" : "student"}/home` ===
            currentPath.toLocaleLowerCase() ? (
              <Button
                component={Link}
                to={`/${
                  currentPath.includes("tutor") ? "tutor" : "student"
                }/home`}
                variant="filled"
                color="indigo"
                className="hover:tracking-widest hover:border-2 text-white border-indigo-700 hover:text-md m-4 "
              >
                Update Profile
              </Button>
            ) : (
              <Button
                variant="subtle"
                color="indigo"
                component={Link}
                to={`/${
                  currentPath.includes("tutor") ? "tutor" : "student"
                }/home`}
                className="hover:tracking-widest hover:border-2 text-indigo-950 border-indigo-500 hover:text-md m-4"
              >
                Update Profile
              </Button>
            )
          ) : null}
          <Button
            variant="subtle"
            color="indigo"
            className="hover:tracking-widest hover:border-2 text-indigo-950 border-indigo-500 hover:text-md m-4"
            onClick={logout}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex className="text-lg w-full text-black items-center gap-[5vmin] flex-col pt-6 overflow-y-auto scrollbar-hide">
          {unprotectedNavLinks.map((navLink, i) => {
            return navLink.link.toLocaleLowerCase() ===
              currentPath.toLocaleLowerCase() ? (
              <Button
                component={Link}
                to={navLink.link}
                variant="filled"
                color="indigo"
                className="hover:tracking-widest hover:border-2 text-white border-indigo-700 hover:text-md m-4 "
              >
                {navLink.name}
              </Button>
            ) : (
              <Button
                component={Link}
                to={navLink.link}
                color="indigo"
                variant="subtle"
                className="hover:tracking-widest hover:border-2 text-indigo-950 border-indigo-700 hover:text-md m-4"
              >
                {navLink.name}
              </Button>
            );
          })}
        </Flex>
      )}
      {/* <Flex className="justify-items-end mb-5 mr-5 self-end">
        <div className="bg-indigo-500 w-[60px] mx-auto mt-10 cursor-pointer rounded-3xl toggler dark:bg-blue-50">
          <div
            onClick={(e) => handleDarkToogle(e)}
            className="bg-white w-[30px] h-[30px] scale-75 rounded-3xl transition-transform dark:bg-black"
          ></div>
        </div>
      </Flex> */}
    </Flex>
  );
};

export default Navbar;
