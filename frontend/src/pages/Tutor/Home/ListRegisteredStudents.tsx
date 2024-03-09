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
    <Flex direction="column" justify="center" align="center">
      <Text>List of Registered Users</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Student Name</Table.Th>
            <Table.Th>Subject</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Gender</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((d, i) => (
            <Table.Tr key={i}>
              <Table.Td>{d.user.name}</Table.Td>
              <Table.Td>{d.language}</Table.Td>
              <Table.Td>{d.user.age}</Table.Td>
              <Table.Td>{d.user.gender}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Flex>
  );
}

export default ListRegisteredStudents;
