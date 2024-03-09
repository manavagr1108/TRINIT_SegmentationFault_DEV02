import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
  Select,
  MultiSelect,
  Flex,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  currState,
  genders,
  languages,
  showNotification,
} from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../../utils/apiCalls";
import useAuthStudent from "../../../context/StudentAuthContext";
import useRouteTypeContext from "../../../context/RouteTypeContext";

function UpdateStudentDetails(student: any) {
  const navigate = useNavigate();
  const { setIsProfileUpdated } = useAuthStudent();
  const { setType } = useRouteTypeContext();
  const updateProfileForm = useForm({
    initialValues: {
      name: student.name !== null ? student.name : "",
      email: student.email !== null ? student.email : "",
      age: student.age !== null ? student.age : "",
      gender: student.gender !== null ? student.gender : "",
      languages: student.languages !== null ? student.languages : "",
    },

    validate: {
      name: (value: string) =>
        value !== undefined ? null : "Please enter your name",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
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

  const updateProfile = async () => {
    if (updateProfileForm.validate().hasErrors) {
      return;
    }
    const response = await updateUserProfile({
      name: updateProfileForm.values.name,
      email: updateProfileForm.values.email,
      gender: updateProfileForm.values.gender,
      age: updateProfileForm.values.age,
      languages: updateProfileForm.values.languages,
    });
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setIsProfileUpdated(true);
      navigate("/student/home");
      return;
    } else if (response.status === 401) {
      showNotification("Error", response.data.message, "error");
      setType(currState.UNPROTECTED);
      navigate("/auth/student");
      return;
    } else if (response.status === 403) {
      showNotification("Error", response.data.message, "error");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      navigate("/student/home");
      return;
    }
  };
  return (
    <Flex
      maw={340}
      mx="auto"
      className=" flex-row justify-between max-w-[80%] h-[60%] py-4 bg-white rounded shadow-lg p-4 md:p-8 mb-6"
    >
      <Flex className="flex-col w-[45%] mt-4">
        <Text ta="left" fw={700} className="w-full" size="lg">
          Personal Details
        </Text>
        <Text ta="left" fw={200} className="w-full text-indigo-400" size="sm">
          Please fill your personal Details
        </Text>
        <Image
          radius="md"
          className="h-full"
          src="https://img.freepik.com/free-vector/boy-student-sitting-stack-books-with-laptop-flat-icon-illustration_1284-64037.jpg?size=338&ext=jpg&ga=GA1.1.1827530304.1709942400&semt=ais"
        />
      </Flex>
      <Flex className="flex-col w-[50%] self-center">
        <TextInput
          label="Name"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          placeholder="enter your name"
          {...updateProfileForm.getInputProps("name")}
        />
        <TextInput
          label="Email"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          placeholder="your@email.com"
          {...updateProfileForm.getInputProps("email")}
        />
        <TextInput
          label="Age"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          placeholder="enter your age"
          {...updateProfileForm.getInputProps("age")}
        />
        <Select
          label="Gender"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          placeholder="Select gender"
          data={genders}
          {...updateProfileForm.getInputProps("gender")}
        />
        <MultiSelect
          label="Languages"
          placeholder="Select at max 3"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          data={languages}
          maxValues={3}
          {...updateProfileForm.getInputProps("languages")}
        />

        <Group justify="center" mt="md">
          <Button
            onClick={updateProfile}
            variant="subtle"
            color="indigo"
            className="hover:border-2 border-indigo-500"
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}

export default UpdateStudentDetails;
