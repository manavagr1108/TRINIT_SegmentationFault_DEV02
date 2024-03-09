import {
  Box,
  Button,
  Collapse,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  MultiSelect,
  RangeSlider,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useCombobox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import SearchButton from "../../../components/SearchButton/SearchButton";
import {
  languages as LANGUAGES,
  showNotification,
} from "../../../utils/helpers";
import { searchTutor } from "../../../utils/apiCalls";

function SearchTutor() {
  const expArray = ["low", "medium", "high"];
  const [languages, setLanguages] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 5000]);
  const handleSearch = async () => {
    if (languages.length === 0) {
      showNotification("Error", "select atleast one language", "error");
      return;
    }
    console.log(languages, experience, priceRange[0], priceRange[1]);
    const response = await searchTutor({
      languages,
      experience,
      lowerPrice: priceRange[0],
      upperPrice: priceRange[1],
    });
    if (response.status === 200) {
      console.log(response);
    }
  };

  return (
    <Flex direction="column" className="w-fit">
      <Stack className="border-2 border-blue-400 rounded-lg p-6">
        <MultiSelect
          label="Languages"
          withAsterisk
          placeholder="Select known languages"
          data={LANGUAGES}
          onChange={(v) => setLanguages(v)}
          maw={400}
        />
        <Select
          label="Experience"
          withAsterisk
          placeholder="required experience"
          data={expArray}
          value={expArray[experience]}
          onChange={(v) =>
            v === null ? setExperience(0) : setExperience(expArray.indexOf(v))
          }
          maw={100}
        />
        <Text mt="md">Set Min Max Prices: </Text>
        <RangeSlider
          value={priceRange}
          onChange={setPriceRange}
          minRange={100}
          min={100}
          max={10000}
          step={50}
        />
        <Button onClick={handleSearch}>Search Tutor</Button>
      </Stack>
    </Flex>
  );
}

export default SearchTutor;
