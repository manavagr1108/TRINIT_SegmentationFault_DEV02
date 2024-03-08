import { Button, Flex } from "@mantine/core";
import { getGoogleUrl } from "../../utils/tutor.utils";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Flex justify="space-around">
        <Button to={getGoogleUrl(false)} component={Link}>Login as student</Button>
        <Button to={getGoogleUrl(true)} component={Link}>Login as tutor</Button>
      </Flex>
    </div>
  );
}

export default Home;
