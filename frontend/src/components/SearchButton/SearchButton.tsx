import { Flex, NumberFormatter, Text } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

function SearchButton(data: any) {
  return (
    <Flex justify="space-between">
      <Flex direction="column">
        <Flex align="center">
          <IconLanguage size={20} />
          <Text className=" self-start">{data.language}</Text>
        </Flex>
        <Text>{data.name}</Text>
      </Flex>
      <Flex direction="column">
        <NumberFormatter
          prefix="Rs "
          value={`${data.prices[0]}-${data.prices[2]}`}
          thousandSeparator
        />
      </Flex>
    </Flex>
  );
}

export default SearchButton;
