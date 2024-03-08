import { TextInput, Button, Group, Box, Text, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { genders } from "../../../utils/helpers";

function UpdateStudentDetails(student: any) {
  const form = useForm({
    initialValues: {
      name: student.name !== null ? student.name : "",
      email: student.email !== null ? student.email : "",
      phone_no: student.phone_no !== null ? student.phone_no : "",
      age: student.age !== null ? student.age : "",
      gender: student.gender !== null ? student.gender : "",
    },

    validate: {
      name: (value: string) =>
        value !== undefined ? null : "Please enter your name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone_no: (value) =>
        /^\d{10,15}$/.test(value) ? null : "Invalid phone number",
      age: (value) =>
        /^\d+$/.test(value)
          ? parseInt(value) > 5
            ? null
            : "Should be age 5 and above"
          : "Enter only digits",
      gender: (value) =>
        genders.includes(value) ? null : "Please select your gender",
    },
  });
  return (
    <Box
      maw={340}
      mx="auto"
      className="p-3 border-2 border-[#228be6] rounded-lg"
    >
      <Text ta="center" fw={500} size="lg">
        Update Your Details
      </Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="enter your name"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Phone No"
          placeholder="enter your phone no"
          {...form.getInputProps("phone_no")}
        />
        <TextInput
          withAsterisk
          label="Age"
          placeholder="enter your age"
          {...form.getInputProps("age")}
        />
        <Select
          label="Gender"
          withAsterisk
          placeholder="Select gender"
          data={genders}
          {...form.getInputProps("gender")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default UpdateStudentDetails;
