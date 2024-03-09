import React, { useEffect, useState } from "react";
import { getRegisteredStudents } from "../../../utils/apiCalls";
import { showNotification } from "../../../utils/helpers";
import { Flex, Table, Text } from "@mantine/core";

function ListRegisteredStudents() {
  const [data, setData] = useState<any[]>([]);
  const fetchRegisteredStudents = async () => {
    const response = await getRegisteredStudents();
    if (response.status === 200) {
      setData(response.data.data);
    } else {
      showNotification("Error", "Unable to fetch users", "error");
      return;
    }
  };
  useEffect(() => {
    fetchRegisteredStudents();
  }, []);
  return data.length === 0 ? (
    <Flex> No registered students </Flex>
  ) : (
    <Flex
      direction="column"
      className="w-full self-start mt-4"
      justify="center"
      align="center"
    >
      <Text fw={700} size="lg" py={8}>
        List of Registered Users
      </Text>
      <Table striped highlightOnHover withTableBorder className="w-[70%]">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-center">Student Name</Table.Th>
            <Table.Th className="text-center">Subject</Table.Th>
            <Table.Th className="text-center">Age</Table.Th>
            <Table.Th className="text-center">Gender</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((d, i) => (
            <Table.Tr key={i}>
              <Table.Td className="text-center">{d.user.name}</Table.Td>
              <Table.Td className="text-center">{d.language}</Table.Td>
              <Table.Td className="text-center">{d.user.age}</Table.Td>
              <Table.Td className="text-center">{d.user.gender}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default ListRegisteredStudents;
