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
  Text,
  useCombobox,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import SearchButton from "../../../components/SearchButton/SearchButton";
import { languages as LANGUAGES } from "../../../utils/helpers";
import { searchTutor } from "../../../utils/apiCalls";

function SearchTutor() {
  const expArray = ["low", "medium", "high"];
  const [languages, setLanguages] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 5000]);
  const handleSearch = async () => {
    const response = await searchTutor({
      languages,
      experience,
      lowerPrice: priceRange[0],
      upperPrice: priceRange[1],
    });
    if(response.status === 200){
      console.log(response);
    }
  };

  return (
    <Flex direction="column" className="w-fit">
      <MultiSelect
        label="Languages"
        withAsterisk
        placeholder="Select known languages"
        data={LANGUAGES}
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
        defaultValue={[100, 5000]}
        minRange={100}
        min={100}
        max={10000}
        step={50}
      />
      <Button onClick={handleSearch}>Search Tutor</Button>
    </Flex>
  );
}

export default SearchTutor;
