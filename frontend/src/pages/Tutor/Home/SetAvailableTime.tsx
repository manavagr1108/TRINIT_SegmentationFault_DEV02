import { useCallback, useEffect, useState } from "react";
import { Calendar, DateTimePicker, TimeInput } from "@mantine/dates";
import { Button, Center, Flex, Text } from "@mantine/core";
import { showNotification } from "../../../utils/helpers";
import ListClass from "./ListClass";
import { useSocket } from "../../../context/SocketContextProvider";
import { useNavigate } from "react-router-dom";
import { getUpcomingClassesTutor } from "../../../utils/apiCalls";
function SetAvailableTime(data: any) {
  console.log(data);
  //   const [startTime, setStartTime] = useState<string>("");
  //   const [endTime, setEndTime] = useState<string>("");
  const [classesList, setClassesList] = useState<any[]>([]);
  const handleUpcomingClasses = async () => {
    const repsonse = await getUpcomingClassesTutor();
    if (repsonse.status === 200) {
      console.log(repsonse.data.data);
      setClassesList(repsonse.data.data);
    }
  };
  useEffect(() => {
    handleUpcomingClasses();
  }, []);
  const navigate = useNavigate();
  const socket = useSocket();
  const handleJoinVC = useCallback((code: number) => {
    console.log(code);
    socket?.emit("room:join", {
      email: data.email,
      room: code,
    });
  }, []);

  const handleJoinRoom = useCallback(
    (data: any) => {
      const { email, room } = data;
      console.log(email, room);
      navigate(`/tutor/room/${room}`);
    },
    [navigate]
  );

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
              <Text className="pr-2">{slot.student.name}'s </Text>
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

export default SetAvailableTime;
