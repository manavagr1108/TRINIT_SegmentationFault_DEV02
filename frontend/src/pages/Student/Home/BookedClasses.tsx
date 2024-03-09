import { Button, Center, Flex, Table, Text } from "@mantine/core";
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
      const { room } = data;
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
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);
  return classesList.length === 0 ? (
    <Text>You have no class to attend!</Text>
  ) : (
    <Flex className="flex-col self-start pt-8 items-center w-full">
      <Text size="xl" fw={700} py="4px">
        Classes
      </Text>
      <Table striped highlightOnHover withTableBorder className="w-[70%]">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-center">Language</Table.Th>
            <Table.Th className="text-center">Tutor's Name</Table.Th>
            <Table.Th className="text-center">StartTime</Table.Th>
            <Table.Th className="text-center">EndTime</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {classesList.map((slot, i) => (
            <Table.Tr className="h-[4rem]" key={i}>
              <Table.Td className=" text-center">{slot.slot.language}</Table.Td>
              <Table.Td className=" text-center">{slot.tutor.name}</Table.Td>
              <Table.Td className=" text-center">
                {(slot.slot.startTime / 60).toString().padStart(2, "0") +
                  ":" +
                  (slot.slot.startTime % 60).toString().padStart(2, "0")}
              </Table.Td>
              <Table.Td className=" text-center">
                {(slot.slot.endTime / 60).toString().padStart(2, "0") +
                  ":" +
                  (slot.slot.endTime % 60).toString().padStart(2, "0")}
              </Table.Td>
              <Table.Td className=" text-center">
                {slot.slot.isApproved ? (
                  <Button
                    variant="subtle"
                    color="indigo"
                    className="hover:border-2 border-indigo-500"
                    onClick={() => handleJoinVC(slot.slot.code)}
                  >
                    Join VC
                  </Button>
                ) : (
                  "Yet to be approved"
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default BookedClasses;
