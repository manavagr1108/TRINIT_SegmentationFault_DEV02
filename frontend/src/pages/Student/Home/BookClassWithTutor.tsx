import { Button, Center, Flex, Tabs, Text } from "@mantine/core";
import { DateInput, DatePicker, DateTimePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { showNotification, timeZoneMap } from "../../../utils/helpers";
import { fetchTutorSlots, getRegisteredTutors } from "../../../utils/apiCalls";

function BookClassWithTutor(data: any) {
  console.log(data);
  const [startTime, setStartTime] = useState<Date>();
  const [tutors, setTutors] = useState<any[]>([]);
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);
  const fetchRegisteredTutors = async () => {
    const response = await getRegisteredTutors();
    if (response.status === 200) {
      console.log(response.data.data);
      setTutors(response.data.data);
    } else {
      showNotification("Error", "Unable to fetch users", "error");
      return;
    }
  };
  useEffect(() => {
    fetchRegisteredTutors();
  }, []);
  const handleGetSlots = async (id: number, tutor: any) => {
    const response = await fetchTutorSlots({ tutorId: id, date: startTime });
    if (response.status === 200) {
      console.log(response);
      if (response.data.data.length === 0) {
        setBookedSlots(response.data.data);
      }
    }
  };
  return (
    <Flex justify={Center} direction="column">
      <Text className=" text-center">BookClassWithTutor</Text>
      {tutors.length === 0 ? (
        "No tutors registered!!"
      ) : (
        <Tabs className="w-[50vw]">
          {tutors.map((tutor, i) => (
            <Tabs.List>
              <Tabs.Tab value={i.toString()}>{tutor.user.name}</Tabs.Tab>
            </Tabs.List>
          ))}
          {tutors.map((tutor, i) => (
            <Tabs.Panel value={i.toString()}>
              <Flex direction="column" className=" gap-4 items-center">
                <Text className="text-center">{tutor.language} Class</Text>
                <Text className="text-center">
                  {tutor.user.availableTimeZone[0] +
                    " - " +
                    timeZoneMap[tutor.user.availableTimeZone[0]]}
                </Text>
                <DateInput
                  onChange={(e) => (e !== null ? setStartTime(e) : null)}
                  label="select date"
                  placeholder="Input placeholder"
                />
                <Button
                  onClick={() => handleGetSlots(tutor.user._id, tutor)}
                  className="w-[6rem] p-0 m-0"
                >
                  Get Slots
                </Button>

                {bookedSlots.length === 0 ? null : (
                  <Flex className=" flex-col justify-center items-center">
                    List of booked slots:
                    {bookedSlots.map((slot) => (
                      <Flex className="w-[50vw] justify-evenly items-center">
                        {(slot.startTime/60).toString().padStart(2,'0')+":"+(slot.endTime%60).toString().padStart(2,"0")}
                      </Flex>
                    ))}
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
