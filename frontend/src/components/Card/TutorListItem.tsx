import {
  Badge,
  Button,
  Center,
  Flex,
  HoverCard,
  NumberFormatter,
  Select,
  Text,
} from "@mantine/core";
import { IconBookUpload, IconLanguage } from "@tabler/icons-react";
import React from "react";
import { expArray } from "../../utils/helpers";
function removeDuplicateStrings(arr: string[]) {
  var uniqueSet = new Set(arr);
  var uniqueArray = Array.from(uniqueSet);
  return uniqueArray;
}
function TutorListItem(data: any) {
  const languages = removeDuplicateStrings(
    data.languages.map((language: any) => language.language)
  );
  const [languageIndex, setLanguageInde] = React.useState<number>(0);
  const [time, setTime] = React.useState<string>(data.availableTimeZone[0]);
  const bookTutor = async () => {};
  return (
    <Flex
      justify="space-between"
      className=" w-max border-2 border-blue-400 rounded-lg p-6 px-4 py-1"
    >
      <Flex direction="column">
        <Flex justify="space-between" gap={2}>
          <Flex>
            {data.name}
            {" - "}
            {
              <NumberFormatter
                prefix=" $"
                value={data.languages[languageIndex].price}
                thousandSeparator
              />
            }
            {" - "}
            {expArray[languageIndex]}
          </Flex>
          <Flex>
            <HoverCard width={100} shadow="md">
              <HoverCard.Target>
                <Button onClick={bookTutor}>
                  <IconBookUpload />
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown p={0} m={0} className=" text-center">
                <Text size="sm">Book Tutor</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Flex>
        </Flex>
        <Flex gap={3} justify={Center} align={Center}>
          <Select
            label="Available Languages"
            placeholder="Pick value"
            data={languages}
            value={languages[languageIndex]}
            onChange={(v) =>
              v !== null
                ? setLanguageInde(languages.indexOf(v))
                : setLanguageInde(0)
            }
          />
          <Select
            label="Available Time"
            placeholder="Pick value"
            data={data.availableTimeZone}
            value={time}
            onChange={(v) =>
              v !== null ? setTime(v) : setTime(data.availableTimeZone[0])
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TutorListItem;
