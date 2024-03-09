import {
  Badge,
  Center,
  Flex,
  NumberFormatter,
  Select,
  Text,
} from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
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
  console.log(data);
  return (
    <Flex
      justify="space-between"
      className="w-[60%] border-2 border-blue-400 rounded-lg p-6 px-4 py-1"
    >
      <Flex direction="column">
        <Flex gap={2}>
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
