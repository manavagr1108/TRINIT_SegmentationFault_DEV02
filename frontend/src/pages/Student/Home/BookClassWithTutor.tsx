import { Button, Center, Flex, Tabs, Text } from "@mantine/core";
import {
  DateInput,
  TimeInput,
} from "@mantine/dates";
import { useEffect, useState } from "react";
import { showNotification } from "../../../utils/helpers";
import {
  bookSlotsApi,
  fetchTutorSlots,
  getRegisteredTutors,
} from "../../../utils/apiCalls";

function BookClassWithTutor() {
  const [startTime, setStartTime] = useState<Date>();
  const [tutors, setTutors] = useState<any[]>([]);
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);
  const fetchRegisteredTutors = async () => {
    const response = await getRegisteredTutors();
    if (response.status === 200) {
      setTutors(response.data.data);
    } else {
      showNotification("Error", "Unable to fetch users", "error");
      return;
    }
  };
  const [startTimeSlot, setStartTimeSlot] = useState<string>("09:00");
  const [endTimeSlot, setEndTimeSlot] = useState<string>("10:00");

  const bookSlot = async (
    tutorId: string,
    language: string,
    startTime: string,
    endTime: string,
    date: Date | undefined
  ) => {
    if (!startTimeSlot || !endTimeSlot) {
      showNotification(
        "Warning",
        "Start and end time can't be null",
        "warning"
      );
      return;
    }
    const start = startTime.split(":");
    const end = endTime.split(":");

    if (start.length < 2 || endTimeSlot.length < 2) {
      showNotification(
        "Warning",
        "Invalid time, enter in 24 hour format",
        "warning"
      );
      return;
    }
    const startTimeBackend = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endTimeBackend = parseInt(end[0]) * 60 + parseInt(start[1]);

    const response = await bookSlotsApi({
      tutorId: tutorId,
      language: language,
      startTime: startTimeBackend,
      endTime: endTimeBackend,
      date: date,
    });
    if (response.status == 200) {
      showNotification("Success", response.data.message, "success");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
    }
  };

  const [isSlotsFetched, setIsSlotsFetched] = useState(false);
  useEffect(() => {
    fetchRegisteredTutors();
  }, []);

  const handleGetSlots = async (id: number) => {
    const response = await fetchTutorSlots({ tutorId: id, date: startTime });
    if (response.status === 200) {
      setIsSlotsFetched(true);
      setBookedSlots(response.data.data);
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };
  return (
    <Flex className=" justify-start self-start pt-4" direction="column">
      <Text className=" text-center" fw={700}>
        BookClassWithTutor
      </Text>
      {tutors.length === 0 ? (
        "No tutors registered!!"
      ) : (
        <Tabs color="indigo" className="w-[50vw]">
          {tutors.map((tutor, i) => (
            <Tabs.List>
              <Tabs.Tab value={i.toString()}>{tutor.user.name}</Tabs.Tab>
            </Tabs.List>
          ))}
          {tutors.map((tutor, i) => (
            <Tabs.Panel value={i.toString()}>
              <Flex direction="column" className=" gap-4 items-center">
                <Text className="text-center pt-4" fw={600}>
                  {tutor.language} Class
                </Text>
                <DateInput
                  onChange={(e: any) => (e !== null ? setStartTime(e) : null)}
                  label="select date"
                  placeholder="Select date"
                  variant="filled"
                  classNames={{
                    label: "text-indigo-500 text-xs",
                  }}
                  minDate={new Date()}
                />
                <Button
                  variant="subtle"
                  color="indigo"
                  className="hover:border-2 w-[6rem] p-0 m-0 border-indigo-500"
                  onClick={() => handleGetSlots(tutor.user._id)}
                >
                  Get Slots
                </Button>

                {bookedSlots.length === 0 ? null : (
                  <Flex className=" justify-center items-center">
                    List of booked slots:
                    {bookedSlots.map((slot) => (
                      <Flex className="w-[50vw] justify-evenly items-center">
                        {(slot.startTime / 60).toString().padStart(2, "0") +
                          ":" +
                          (slot.startTime % 60).toString().padStart(2, "0") +
                          " - " +
                          (slot.endTime / 60).toString().padStart(2, "0") +
                          ":" +
                          (slot.endTime % 60).toString().padStart(2, "0")}
                      </Flex>
                    ))}
                  </Flex>
                )}
                {isSlotsFetched && (
                  <Flex className="flex-col gap-5">
                    <Flex className=" gap-5">
                      <TimeInput
                        label="Start time"
                        value={startTimeSlot}
                        minTime="09:00"
                        maxTime="22:00"
                        w={100}
                        variant="filled"
                        classNames={{
                          label: "text-indigo-500 text-xs",
                        }}
                        onChange={(event) =>
                          setStartTimeSlot(event.target.value)
                        }
                      />
                      <TimeInput
                        label="End time"
                        value={endTimeSlot}
                        variant="filled"
                        classNames={{
                          label: "text-indigo-500 text-xs",
                        }}
                        minTime={startTimeSlot}
                        maxTime="22:00"
                        w={100}
                        onChange={(event) => setEndTimeSlot(event.target.value)}
                      />
                    </Flex>
                    <Button
                      variant="subtle"
                      color="indigo"
                      className="hover:border-2 border-indigo-500"
                      onClick={() =>
                        bookSlot(
                          tutor.user._id,
                          tutor.language,
                          startTimeSlot,
                          endTimeSlot,
                          startTime
                        )
                      }
                    >
                      {" "}
                      Book Slot
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
    </Flex>
  );
}

export default BookClassWithTutor;
