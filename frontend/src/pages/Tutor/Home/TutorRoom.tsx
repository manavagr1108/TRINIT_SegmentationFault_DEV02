import { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { PeerService } from "../../../service/peer";
import { useSocket } from "../../../context/SocketContextProvider";
import { Button, Flex, Text } from "@mantine/core";

const RoomPage = () => {
  const peer = new PeerService();
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<number | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | undefined>();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: number }) => {
      setRemoteSocketId(id);
    },
    []
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    if (socket) {
      socket.emit("user:call", { to: remoteSocketId, offer });
      setMyStream(stream);
    }
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }: { from: any; offer: any }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      if (socket) {
        socket.emit("call:accepted", { to: from, ans });
      }
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream!.getTracks()) {
      if (peer && peer.peer && myStream) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: any; ans: any }) => {
      peer.setLocalDescription(ans);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    if (socket) {
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }
  }, [remoteSocketId, socket]);

  useEffect(() => {
    if (peer && peer.peer) {
      peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    }
    return () => {
      if (peer && peer.peer) {
        peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      }
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }: { from: any; offer: any }) => {
      const ans = await peer.getAnswer(offer);
      if (socket) {
        socket.emit("peer:nego:done", { to: from, ans });
      }
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: any }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    if (peer && peer.peer) {
      peer.peer.addEventListener("track", async (ev: any) => {
        const remoteStream = ev.streams;
        setRemoteStream(remoteStream[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user:joined", handleUserJoined);
      socket.on("incomming:call", handleIncommingCall);
      socket.on("call:accepted", handleCallAccepted);
      socket.on("peer:nego:needed", handleNegoNeedIncomming);
      socket.on("peer:nego:final", handleNegoNeedFinal);
    }

    return () => {
      if (socket) {
        socket.off("user:joined", handleUserJoined);
        socket.off("incomming:call", handleIncommingCall);
        socket.off("call:accepted", handleCallAccepted);
        socket.off("peer:nego:needed", handleNegoNeedIncomming);
        socket.off("peer:nego:final", handleNegoNeedFinal);
      }
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <Flex className="flex-col items-center justify-center gap-5 self-start">
      <Text fw={700} size="xl">
        Video Calling
      </Text>
      <Text fw={300} size="md">
        {remoteSocketId ? "Connected" : "No one in room"}
      </Text>
      {myStream && (
        <Button
          variant="subtle"
          color="indigo"
          className="hover:border-2 border-indigo-500"
          onClick={sendStreams}
        >
          Send Stream
        </Button>
      )}
      {remoteSocketId && (
        <Button
          variant="subtle"
          color="indigo"
          className="hover:border-2 border-indigo-500"
          onClick={handleCallUser}
        >
          CALL
        </Button>
      )}
      <Flex className="w-full justify-around">
        {myStream && (
          <Flex className="flex-col justify-center items-center">
            <Text>My Stream</Text>
            <ReactPlayer
              playing
              muted
              height="60vh"
              width="80vw"
              url={myStream}
            />
          </Flex>
        )}
        {remoteStream && (
          <Flex className="flex-col">
            <Text>Remote Stream</Text>
            <ReactPlayer
              height="60vh"
              width="80vw"
              playing
              url={remoteStream}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default RoomPage;
