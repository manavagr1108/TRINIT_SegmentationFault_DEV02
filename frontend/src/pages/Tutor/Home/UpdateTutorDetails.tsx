import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
  Select,
  MultiSelect,
  Flex,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  currState,
  genders,
  languages,
  showNotification,
} from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { updateTutorProfile } from "../../../utils/apiCalls";
import useRouteTypeContext from "../../../context/RouteTypeContext";
import { useState } from "react";
import useAuthTutor from "../../../context/TutorAuthContext";

function UpdateStudentDetails(student: any) {
  const expArray = ["low", "medium", "high"];
  const navigate = useNavigate();
  const { setIsProfileUpdated } = useAuthTutor();
  const { setType } = useRouteTypeContext();
  const [data, setData] = useState<any[]>(student.languages);
  const [language, setLanguages] = useState<any[]>(
    student.languages.map((lang: any) => lang.language)
  );
  const updateProfileForm = useForm({
    initialValues: {
      name: student.name !== null ? student.name : "",
      email: student.email !== null ? student.email : "",
      age: student.age !== null ? student.age : "",
      gender: student.gender !== null ? student.gender : "",
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
    const response = await updateTutorProfile({
      name: updateProfileForm.values.name,
      email: updateProfileForm.values.email,
      gender: updateProfileForm.values.gender,
      age: updateProfileForm.values.age,
      languages: data,
    });
    if (response.status === 200) {
      showNotification("Success", response.data.message, "success");
      setIsProfileUpdated(true);
      navigate("/tutor/home");
      return;
    } else if (response.status === 401) {
      showNotification("Error", response.data.message, "error");
      setType(currState.UNPROTECTED);
      navigate("/auth/tutor");
      return;
    } else if (response.status === 403) {
      showNotification("Error", response.data.message, "error");
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      navigate("/tutor/home");
      return;
    }
  };
  const addLang = (event: any) => {
    if (language.length > event.length) {
      const a: any = [];
      data.forEach((elem) => {
        if (event.includes(elem.language)) {
          a.push(elem);
        }
      });
      setData(a);
    } else {
      const a: any = data;
      a.push({ language: event[event.length - 1], experience: 0, price: 5000 });
      setData(a);
    }
    setLanguages(event);
  };
  const setExp = (i: number, key: number) => {
    setData(
      data.map((elem, ind) => {
        if (ind == key) {
          elem.experience = i;
        }
        return elem;
      })
    );
  };
  const setPrice = (i: number | string, key: number) => {
    setData(
      data.map((elem, ind) => {
        if (ind == key) {
          elem.price = i;
        }
        return elem;
      })
    );
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
        value={language}
        onChange={(event) => addLang(event)}
      />
      {data.map((elem, key) => {
        return (
          <Flex key={key} className="flex-col">
            <TextInput label="Language" readOnly value={elem.language} />
            <Select
              label="Experience"
              withAsterisk
              placeholder="Experience"
              data={expArray}
              value={expArray[elem.experience]}
              onChange={(v) => {
                if (v != null) {
                  setExp(expArray.indexOf(v), key);
                }
              }}
              maw={100}
            />
            <NumberInput
              value={elem.price}
              label="Price"
              withAsterisk
              onChange={(event) => setPrice(event, key)}
              min={5000}
              max={20000}
            />
          </Flex>
        );
      })}
      <Group justify="center" mt="md">
        <Button onClick={updateProfile} type="submit">
          Submit
        </Button>
      </Group>
    </Box>
  );
}

export default UpdateStudentDetails;
