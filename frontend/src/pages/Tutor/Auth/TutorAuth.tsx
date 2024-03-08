import { Button } from "@mantine/core";
import { getGoogleUrl } from "../../../utils/tutor.utils";
import { Link } from "react-router-dom";
const TutorLogin = () => {
  return (
    <>
      <Button to={getGoogleUrl(true)} component={Link}>
        Login with Google
      </Button>
    </>
  );
};
export default TutorLogin;
