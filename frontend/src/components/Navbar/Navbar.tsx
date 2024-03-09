import { Button, Flex } from "@mantine/core";
import useAuthStudent from "../../context/StudentAuthContext";
import { Link, useLocation } from "react-router-dom";
import useAuthTutor from "../../context/TutorAuthContext";
const Navbar = ({
  loggedInNavLinks,
  unprotectedNavLinks,
}: {
  loggedInNavLinks: { name: string; link: string }[];
  unprotectedNavLinks: { name: string; link: string }[];
}) => {
  const currentPath = useLocation().pathname;
  const { isLoggedIn, isProfileUpdated } = currentPath.includes("tutor")
    ? useAuthTutor()
    : useAuthStudent();
  return (
    <Flex className=" max-w-[20%] w-[15rem] h-[100vh] fixed overflow-hidden">
      {isLoggedIn == true ? (
        <Flex direction="column" className="border-x-2 w-full shadow-sm h-full">
          {isProfileUpdated == true &&
            loggedInNavLinks.map((navLink, i) => {
              return (
                <Link to={navLink.link} key={i}>
                  {navLink.link.toLocaleLowerCase() ===
                  currentPath.toLocaleLowerCase() ? (
                    <Button
                      variant="filled"
                      className="hover:tracking-widest hover:text-md m-4 "
                    >
                      {navLink.name}
                    </Button>
                  ) : (
                    <Button
                      variant="subtle"
                      className="hover:tracking-widest hover:text-md m-4"
                    >
                      {navLink.name}
                    </Button>
                  )}
                </Link>
              );
            })}
          {isProfileUpdated == false && (
            <Link
              to={`/${
                currentPath.includes("tutor") ? "tutor" : "student"
              }/home`}
            >
              {`/${
                currentPath.includes("tutor") ? "tutor" : "student"
              }/home` === currentPath.toLocaleLowerCase() ? (
                <Button
                  variant="filled"
                  className="hover:tracking-widest hover:text-md m-4 "
                >
                  profile
                </Button>
              ) : (
                <Button
                  variant="subtle"
                  className="hover:tracking-widest hover:text-md m-4"
                >
                  profile
                </Button>
              )}
            </Link>
          )}
        </Flex>
      ) : (
        <Flex className="text-lg w-full text-black items-center gap-[5vmin] flex-col pt-6 overflow-y-auto scrollbar-hide">
          {unprotectedNavLinks.map((navLink, i) => {
            return (
              <Link to={navLink.link} key={i}>
                {navLink.link.toLocaleLowerCase() ===
                currentPath.toLocaleLowerCase() ? (
                  <Button
                    variant="filled"
                    className="hover:tracking-widest hover:text-md m-4 "
                  >
                    {navLink.name}
                  </Button>
                ) : (
                  <Button
                    variant="subtle"
                    className="hover:tracking-widest hover:text-md m-4"
                  >
                    {navLink.name}
                  </Button>
                )}
              </Link>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
