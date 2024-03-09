import { useState } from "react";
import { Calendar, DateTimePicker, TimeInput } from "@mantine/dates";
import { Center, Flex, Text } from "@mantine/core";
import { showNotification } from "../../../utils/helpers";
import ListClass from "./ListClass";
function SetAvailableTime(data: any) {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  return (
    <Flex direction="column" justify={Center} gap={6}>
      <Text>Set todays Available time</Text>
      <Flex>
        <DateTimePicker
          //   value={new Date(startTime)}
          onChange={(e) => (e !== null ? setStartTime(e.toString()) : null)}
          label="start time"
          placeholder="Input placeholder"
        />
        <DateTimePicker
          onChange={(e) =>
            e !== null && new Date(e) > new Date(startTime)
              ? setEndTime(e.toString())
              : showNotification(
                  "Error",
                  "start time should be less than end time",
                  "error"
                )
          }
          //   value={new Date(endTime)}
          label="end time"
          placeholder="Input placeholder"
        />
      </Flex>
      <ListClass {...data} />
    </Flex>
  );
}

export default SetAvailableTime;
