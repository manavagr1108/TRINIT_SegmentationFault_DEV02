import {
  Button,
  Center,
  Flex,
  HoverCard,
  NumberFormatter,
  Select,
  Text,
} from "@mantine/core";
import { IconBookUpload } from "@tabler/icons-react";
import React from "react";
import { expArray, showNotification } from "../../utils/helpers";
import { paymentCallback, prepareOrder } from "../../utils/apiCalls";
import { RAZORPAY_KEY_ID } from "../../../config";
function removeDuplicateStrings(arr: string[]) {
  var uniqueSet = new Set(arr);
  var uniqueArray = Array.from(uniqueSet);
  return uniqueArray;
}
function TutorListItem(data: any) {
  const languages = removeDuplicateStrings(
    data.languages.map((language: any) => language.language)
  );
  const [languageIndex, setLanguageInde] = React.useState<number>(0);
  const bookTutor = async () => {
    const response = await prepareOrder({
      tutorId: data._id,
      language: data.languages[languageIndex].language,
      price: data.languages[languageIndex].price,
    });
    if (response.status === 200) {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: response.data.data.amount,
        currency: "INR",
        name: "LinguaConnect",
        order_id: response.data.data.id,
        theme: {
          color: "#121212",
        },
        prefill: { contact: "9999999999" },
        handler: async (response: any) => {
          const res = await paymentCallback({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          if (res.status == 200) {
            showNotification("Success", res.data.message, "success");
            return;
          } else {
            showNotification("Error", res.data.message, "error");
            return;
          }
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      return;
    } else {
      showNotification("Error", response.data.message, "error");
      return;
    }
  };
  return (
    <Flex className="py-3 justify-around flex-col border-2 border-indigo-400 w-[40%] rounded-lg px-4">
      <Flex direction="column">
        <Flex justify="space-between" gap={2}>
          <Flex className="w-[60%] justify-between">
            <Flex className="flex-col justify-center">
              <Text p={0} m={0} fw={700} size="lg">
                {data.name}
              </Text>
              <Text className="text-indigo-600" fw={200} size="xs" p={0} m={0}>
                Expertise - {expArray[languageIndex]}
              </Text>
            </Flex>
            <NumberFormatter
              prefix=" ₹"
              className=" text-lg"
              value={data.languages[languageIndex].price}
              thousandSeparator
            />
          </Flex>
          <Flex className="w-[30%] justify-end">
            <HoverCard width={100} shadow="md">
              <HoverCard.Target>
                <Button
                  variant="filled"
                  color="indigo"
                  className="hover:border-2 border-indigo-500"
                  onClick={bookTutor}
                >
                  <IconBookUpload />
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown p={0} m={0} className=" text-center">
                <Text size="sm">Book Tutor</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Flex>
        </Flex>
        <Flex gap={12} className=" justify-center items-center">
          <Select
            label="Available Languages"
            placeholder="Pick value"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            className="w-[70%]"
            size="xs"
            data={languages}
            value={languages[languageIndex]}
            onChange={(v) =>
              v !== null
                ? setLanguageInde(languages.indexOf(v))
                : setLanguageInde(0)
            }
          />
          {/* <Select
            label="Available Time"
            placeholder="Pick value"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            data={data.availableTimeZone}
            value={time}
            onChange={(v) =>
              v !== null ? setTime(v) : setTime(data.availableTimeZone[0])
            }
          /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TutorListItem;
