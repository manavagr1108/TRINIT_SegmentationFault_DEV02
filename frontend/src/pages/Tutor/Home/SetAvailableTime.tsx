import { useCallback, useEffect, useState } from "react";
import { Button, Center, Flex, Switch, Text, Table } from "@mantine/core";
import { useSocket } from "../../../context/SocketContextProvider";
import { useNavigate } from "react-router-dom";
import {
  getUpcomingClassesTutor,
  toggleApprovalOfMeet,
  toggleAutoApproval,
} from "../../../utils/apiCalls";
import useAuthTutor from "../../../context/TutorAuthContext";
import { showNotification } from "../../../utils/helpers";
function SetAvailableTime(data: any) {
  const [classesList, setClassesList] = useState<any[]>([]);
  const handleUpcomingClasses = async () => {
    const repsonse = await getUpcomingClassesTutor();
    if (repsonse.status === 200) {
      setClassesList(repsonse.data.data);
    }
  };
  const { tutor } = useAuthTutor();
  useEffect(() => {
    handleUpcomingClasses();
  }, []);
  const navigate = useNavigate();
  const socket = useSocket();
  const handleJoinVC = useCallback((code: number) => {
    socket?.emit("room:join", {
      email: data.email,
      room: code,
    });
  }, []);
  const [checked, setChecked] = useState(tutor?.isAutoApprovalOn || false);
  const handleJoinRoom = useCallback(
    (data: any) => {
      const { room } = data;
      navigate(`/tutor/room/${room}`);
    },
    [navigate]
  );

  const toggleAutoApprovalSubmit = async () => {
    const response = await toggleAutoApproval();
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setChecked(!checked);
      return;
    }
  };

  const toggleApprovalMeetSubmit = async (slotId: string) => {
    const response = await toggleApprovalOfMeet(slotId);
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setClassesList(
        classesList.map((elem, i) => {
          if (elem.slot._id == slotId) {
            elem.slot.isApproved = !elem.slot.isApproved;
          }
          return elem;
        })
      );
      return;
    }
  };

  useEffect(() => {
    if (socket !== null) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);
  return (
    <Flex
      direction="column"
      className="w-full items-center"
      justify={Center}
      gap={6}
    >
      <Switch
        checked={checked}
        onChange={toggleAutoApprovalSubmit}
        label="Auto approve"
      />
      {classesList.length === 0 ? (
        <Text>You have no class to attend!</Text>
      ) : (
        <Flex className="flex-col w-full self-start pt-8 items-center">
          <Text size="xl" fw={700} py="4px">
            Classes
          </Text>
          <Table striped highlightOnHover withTableBorder className="w-[70%]">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="text-center">Language</Table.Th>
                <Table.Th className="text-center">Students's Name</Table.Th>
                <Table.Th className="text-center">Date</Table.Th>
                <Table.Th className="text-center">StartTime</Table.Th>
                <Table.Th className="text-center">EndTime</Table.Th>
                <Table.Th className="text-center">Status</Table.Th>
                <Table.Th className="text-center"></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {classesList.map((slot, i) => (
                <Table.Tr className="h-[4rem]" key={i}>
                  <Table.Td className=" text-center">
                    {slot.slot.language}
                  </Table.Td>
                  <Table.Td className=" text-center">
                    {slot.student.name}
                  </Table.Td>
                  <Table.Td className=" text-center">
                    {new Date(slot.slot.date).getDate() +
                      "/" +
                      new Date(slot.slot.date).getMonth() +
                      "/" +
                      new Date(slot.slot.date).getFullYear()}
                  </Table.Td>
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
                      "Yet to be approved!"
                    )}
                  </Table.Td>
                  <Table.Td className=" text-center">
                    <Button
                      variant="subtle"
                      color="indigo"
                      className="hover:border-2 border-indigo-500"
                      onClick={() => toggleApprovalMeetSubmit(slot.slot._id)}
                    >
                      {slot.slot.isApproved ? "Cancel" : "Approve"}
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Flex>
      )}
    </Flex>
  );
}

export default SetAvailableTime;
