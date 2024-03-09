import { Button, Center, Flex, Text } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSocket } from "../../../context/SocketContextProvider";
import { getUpcomingClassesStudent } from "../../../utils/apiCalls";

function BookedClasses(data: any) {
    const [classesList, setClassesList] = useState<any[]>([]);
  const navigate = useNavigate();
  const socket = useSocket();
  const handleJoinVC = useCallback((code: number) => {
    socket?.emit("room:join", {
      email: data.email,
      room: code,
    });
  }, []);

  const handleJoinRoom = useCallback(
    (data: any) => {
      const {  room } = data;
      navigate(`/student/room/${room}`);
    },
    [navigate]
  );
  const handleUpcomingClasses = async () => {
    const repsonse = await getUpcomingClassesStudent();
    if (repsonse.status === 200) {
      setClassesList(repsonse.data.data);
    }
  };

  useEffect(() => {
    handleUpcomingClasses();
  },[])

  useEffect(() => {
    if (socket !== null) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);
  return (
    <Flex direction="column" justify={Center} gap={6}>
      {classesList.length === 0 ? null : (
        <Flex>
          {classesList.map((slot: any) => (
            <Flex className=" justify-center items-center">
              <Text className="pr-2">Your </Text>
              <Text>{slot.slot.language} start at {(slot.slot.startTime / 60).toString().padStart(2, '0') + ":" + (slot.slot.startTime % 60).toString().padStart(2, "0") + " - " + (slot.slot.endTime / 60).toString().padStart(2, '0') + ":" + (slot.slot.endTime % 60).toString().padStart(2, "0")} </Text>
              <Text></Text>
              <Button
                className="ml-3"
                onClick={() => handleJoinVC(slot.slot.code)}
              >
                Join VC
              </Button>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default BookedClasses;
