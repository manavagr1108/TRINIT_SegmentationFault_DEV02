import { Button, Drawer, Flex } from "@mantine/core";
import useAuthStudent from "../../context/StudentAuthContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { studentLogout } from "../../utils/apiCalls";
import { currState, showNotification } from "../../utils/helpers";
import useRouteTypeContext from "../../context/RouteTypeContext";
import { IconActivity, IconChevronRight } from "@tabler/icons-react";
const Navbar = ({
  loggedInNavLinks,
  unprotectedNavLinks,
}: {
  loggedInNavLinks: { name: string; link: string }[];
  unprotectedNavLinks: { name: string; link: string }[];
}) => {
  const currentPath = useLocation().pathname;
  console.log(useLocation().pathname);
  const { isLoggedIn, isProfileUpdated } = useAuthStudent();
  console.log(isLoggedIn, isProfileUpdated);
  return (
    <Flex className=" max-w-[20%] w-[15rem] h-[100vh] fixed overflow-hidden">
      {isLoggedIn == true ? (
        <Flex direction="column" className="border-x-2 w-full shadow-sm h-full">
          {isProfileUpdated == true &&
            loggedInNavLinks.map((navLink, i) => {
              console.log(navLink);
              return (
                <Link to={navLink.link} key={i}>
                  {navLink.link.toLocaleLowerCase() === currentPath.toLocaleLowerCase() ? (
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
            <Link to="/user/updateProfile">
              <div className="hover:tracking-widest hover:text-md m-4">
                Profile
              </div>
            </Link>
          )}
        </Flex>
      ) : (
        <Flex className="text-lg w-full text-black items-center gap-[5vmin] flex-col pt-6 overflow-y-auto scrollbar-hide">
          {unprotectedNavLinks.map((navLink, i) => {
            return (
              <Link to={navLink.link} key={i}>
                <div className="hover:tracking-widest hover:text-xl cursor-pointer m-4">
                  {navLink.name}
                </div>
              </Link>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
