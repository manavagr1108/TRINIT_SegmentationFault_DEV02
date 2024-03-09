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
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  currState,
  expArray,
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
    <Flex
      mx="auto"
      className="flex-row  justify-between max-w-[80%] h-[70%] bg-white rounded shadow-lg p-4 md:p-8 mb-6"
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
          className="h-[40rem]"
          src="https://img.freepik.com/free-vector/boy-student-sitting-stack-books-with-laptop-flat-icon-illustration_1284-64037.jpg?size=338&ext=jpg&ga=GA1.1.1827530304.1709942400&semt=ais"
        />
      </Flex>
      <Flex className="flex-col gap-2 overflow-auto h-[100%] w-[50%] self-start">
        <TextInput
          label="Name"
          placeholder="enter your name"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          {...updateProfileForm.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          variant="filled"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          {...updateProfileForm.getInputProps("email")}
        />
        <Flex className="w-full justify-between gap-2">
          <TextInput
            label="Age"
            placeholder="enter your age"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            {...updateProfileForm.getInputProps("age")}
          />
          <Select
            label="Gender"
            placeholder="Select gender"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            data={genders}
            {...updateProfileForm.getInputProps("gender")}
          />
        </Flex>
        <MultiSelect
          label="Languages"
          placeholder="Select known languages"
          classNames={{
            label: "text-indigo-500 text-xs",
          }}
          data={languages}
          {...updateProfileForm.getInputProps("languages")}
          value={language}
          onChange={(event) => addLang(event)}
        />
        {data.map((elem, key) => {
          return (
            <Flex key={key} className="w-full justify-evenly gap-5">
              <TextInput
                variant="filled"
                label="Language"
                classNames={{
                  label: "text-indigo-500 text-xs",
                }}
                readOnly
                value={elem.language}
              />
              <Select
                label="Experience"
                placeholder="Experience"
                data={expArray}
                value={expArray[elem.experience]}
                variant="filled"
                classNames={{
                  label: "text-indigo-500 text-xs",
                }}
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
                variant="filled"
                classNames={{
                  label: "text-indigo-500 text-xs",
                }}
                onChange={(event) => setPrice(event, key)}
                min={5000}
                max={20000}
              />
            </Flex>
          );
        })}
        <Group justify="center" mt="md" className="pb-5">
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
