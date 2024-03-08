import React from "react";
import { Center } from "@mantine/core";

const FallbackUI: React.FC = () => {
  return (
    <Center className="h-full w-full flex-col">
      <h1 className="font-heading error-shadow font-thin text-[18rem]">
        OOPS!
      </h1>
    </Center>
  );
};

export default FallbackUI;
