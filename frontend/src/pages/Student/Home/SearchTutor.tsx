import {
  Box,
  Button,
  Collapse,
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Loader,
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
  expArray,
  showNotification,
} from "../../../utils/helpers";
import { searchTutor } from "../../../utils/apiCalls";
import TutorListItem from "../../../components/Card/TutorListItem";

function SearchTutor() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([5000, 20000]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tutorsList, setTutorsList] = useState<any[]>();
  const handleSearch = async () => {
    if (languages.length === 0) {
      showNotification("Error", "select atleast one language", "error");
      return;
    }
    setLoading(true);
    const response = await searchTutor({
      languages,
      experience,
      lowerPrice: priceRange[0],
      upperPrice: priceRange[1],
    });
    if (response.status === 200) {
      setTutorsList(response.data.data);
      setLoading(false);
    } else {
    }
  };

  return (
    <Flex className="w-full flex-col items-center justify-start h-full pt-4 gap-2">
      <Text ta="center" fw={700}>
        Filter Tutor
      </Text>
      <Flex className="border-2 flex-wrap mb-3 min-h-[15%] w-[80%] overflow-auto justify-evenly items-center  shadow-lg border-indigo-400 rounded-lg">
        <MultiSelect
          label="Languages"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          maw={300}
          placeholder="Select known languages"
          data={LANGUAGES}
          onChange={(v) => setLanguages(v)}
          maxDropdownHeight={200}
        />
        <Select
          label="Experience"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          placeholder="required experience"
          data={expArray}
          value={expArray[experience]}
          onChange={(v) =>
            v === null ? setExperience(0) : setExperience(expArray.indexOf(v))
          }
          maw={100}
        />
        <Flex className="flex-col justify-start pt-3 w-[40%]">
          <Text className="text-indigo-500 text-xs m-0" mt="md">
            Set Min Max Prices:{" "}
          </Text>
          <RangeSlider
            className=" justify-self-center"
            value={priceRange}
            onChange={setPriceRange}
            minRange={100}
            min={100}
            max={10000}
            step={50}
            color="indigo"
          />
        </Flex>
      </Flex>
      <Button
        variant="subtle"
        color="indigo"
        className="hover:border-2 w-[8rem] min-h-[2rem] border-indigo-500"
        onClick={handleSearch}
      >
        Search Tutor
      </Button>
      <Flex
        gap={2}
        className="w-[80%] flex-wrap gap-4 items-center justify-evenly overflow-auto"
      >
        {loading === true ? (
          <Loader />
        ) : (
          tutorsList?.map((tutor, index) => (
            <TutorListItem key={index} {...tutor} />
          ))
        )}
      </Flex>
    </Flex>
  );
}

export default SearchTutor;
