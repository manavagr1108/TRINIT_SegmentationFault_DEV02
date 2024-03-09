import { Drawer, Flex } from "@mantine/core";
import useAuthStudent from "../../context/StudentAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { studentLogout } from "../../utils/apiCalls";
import { currState, showNotification } from "../../utils/helpers";
import useRouteTypeContext from "../../context/RouteTypeContext";
const Navbar = ({
  loggedInNavLinks,
  unprotectedNavLinks,
}: {
  loggedInNavLinks: { name: string; link: string }[];
  unprotectedNavLinks: { name: string; link: string }[];
}) => {
  const { isLoggedIn, isProfileUpdated } = useAuthStudent();
  console.log(isLoggedIn, isProfileUpdated);
  const navigate = useNavigate();
  const { setType } = useRouteTypeContext();
  const logout = async () => {
    const response = await studentLogout();
    if (response.status === 200) {
      setType(currState.UNPROTECTED);
      navigate("/auth/user");
      showNotification("Success", response.data.message, "success");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };
  return (
    <Drawer.Root
      opened={true}
      onClose={() => {}}
      size="20%"
      className="text-xl relative text-black items-center gap-[5vmin] flex-col pt-6 overflow-y-auto scrollbar-hide"
    >
      <Drawer.Content>
        <Drawer.Header></Drawer.Header>
        {isLoggedIn == true ? (
          <Drawer.Body>
            {isProfileUpdated == true &&
              loggedInNavLinks.map((navLink, i) => {
                return (
                  <Link to={navLink.link} key={i}>
                    <div className="hover:tracking-widest hover:text-xl m-4">
                      {navLink.name}
                    </div>
                  </Link>
                );
              })}
            {isProfileUpdated == false && (
              <Link to="/user/updateProfile">
                <div className="hover:tracking-widest hover:text-xl m-4">
                  Profile
                </div>
              </Link>
            )}
          </Drawer.Body>
        ) : (
          <Drawer.Body>
            <Flex className="text-lg text-black items-center gap-[5vmin] flex-col pt-6 overflow-y-auto scrollbar-hide">
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
          </Drawer.Body>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default Navbar;
