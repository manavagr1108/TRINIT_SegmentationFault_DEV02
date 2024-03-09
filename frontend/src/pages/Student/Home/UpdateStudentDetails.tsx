import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
  Select,
  MultiSelect,
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
  console.log(student);
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
    console.log(updateProfileForm.values.languages);
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
    <Box
      maw={340}
      mx="auto"
      className="px-[4rem] py-4 border-2 border-[#228be6] rounded-lg"
    >
      <Text ta="center" fw={500} size="lg">
        Update Your Details
      </Text>
      <form
        onSubmit={updateProfileForm.onSubmit((values) => console.log(values))}
      >
        <TextInput
          withAsterisk
          label="Name"
          placeholder="enter your name"
          {...updateProfileForm.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...updateProfileForm.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Age"
          placeholder="enter your age"
          {...updateProfileForm.getInputProps("age")}
        />
        <Select
          label="Gender"
          withAsterisk
          placeholder="Select gender"
          data={genders}
          {...updateProfileForm.getInputProps("gender")}
        />
        <MultiSelect
          label="Languages"
          withAsterisk
          placeholder="Select known languages"
          data={languages}
          {...updateProfileForm.getInputProps("languages")}
        />

        <Group justify="center" mt="md">
          <Button onClick={updateProfile} type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default UpdateStudentDetails;
