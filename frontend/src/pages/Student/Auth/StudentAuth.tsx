import { Button } from "@mantine/core";
import { getGoogleUrl } from "../../../utils/tutor.utils";
import { Link } from "react-router-dom";
const StudentLogin = () => {
  return (
    <>
      <Button to={getGoogleUrl(false)} component={Link}>
        Login with Google
      </Button>
    </>
  );
};
export default StudentLogin;
