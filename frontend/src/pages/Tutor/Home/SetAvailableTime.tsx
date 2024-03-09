import { useCallback, useEffect, useState } from "react";
import { Button, Center, Flex, Switch, Text } from "@mantine/core";
import { useSocket } from "../../../context/SocketContextProvider";
import { useNavigate } from "react-router-dom";
import { getUpcomingClassesTutor, toggleApprovalOfMeet, toggleAutoApproval } from "../../../utils/apiCalls";
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
      const {  room } = data;
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
  }

  const toggleApprovalMeetSubmit = async (slotId: string) => {
    const response = await toggleApprovalOfMeet(slotId);
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setClassesList(classesList.map((elem, i) => {
        if (elem.slot._id == slotId) {
          elem.slot.isApproved = !elem.slot.isApproved
        }
        return elem;
      }))
      return;
    }
  }

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
      <Switch
        checked={checked}
        onChange={toggleAutoApprovalSubmit}
        label="I agree to sell my privacy"
      />
      {classesList.length === 0 ? null : (
        <Flex>
          {classesList.map((slot: any, key) => (
            <Flex className=" justify-center items-center" key={key}>
              <Text className="pr-2">{slot.student.name}'s </Text>
              <Text>{slot.slot.language} start at {(slot.slot.startTime / 60).toString().padStart(2, '0') + ":" + (slot.slot.startTime % 60).toString().padStart(2, "0") + " - " + (slot.slot.endTime / 60).toString().padStart(2, '0') + ":" + (slot.slot.endTime % 60).toString().padStart(2, "0")} </Text>
              {slot.slot.isApproved && <Button
                className="ml-3"
                onClick={() => handleJoinVC(slot.slot.code)}
              >
                Join VC
              </Button>}
              <Button onClick={() => toggleApprovalMeetSubmit(slot.slot._id)}>{slot.slot.isApproved ? "Cancel" : "Approve"}</Button>

            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default SetAvailableTime;
