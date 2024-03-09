import {
  Badge,
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
  const [time, setTime] = React.useState<string>(data.availableTimeZone[0]);
  const bookTutor = async () => {
    const response = await prepareOrder({ tutorId: data._id, language: data.languages[languageIndex].language, price: data.languages[languageIndex].price });
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
        handler: async (response: any) => {
          const res = await paymentCallback({ razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature })
          if (res.status == 200) {
            showNotification("Success", res.data.message, "success");
            return;
          } else {
            showNotification("Error", res.data.message, "error");
            return;
          }
        }
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
    <Flex
      justify="space-between"
      className=" w-max border-2 border-blue-400 rounded-lg p-6 px-4 py-1"
    >
      <Flex direction="column">
        <Flex justify="space-between" gap={2}>
          <Flex>
            {data.name}
            {" - "}
            {
              <NumberFormatter
                prefix=" $"
                value={data.languages[languageIndex].price}
                thousandSeparator
              />
            }
            {" - "}
            {expArray[languageIndex]}
          </Flex>
          <Flex>
            <HoverCard width={100} shadow="md">
              <HoverCard.Target>
                <Button onClick={bookTutor}>
                  <IconBookUpload />
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown p={0} m={0} className=" text-center">
                <Text size="sm">Book Tutor</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Flex>
        </Flex>
        <Flex gap={3} justify={Center} align={Center}>
          <Select
            label="Available Languages"
            placeholder="Pick value"
            data={languages}
            value={languages[languageIndex]}
            onChange={(v) =>
              v !== null
                ? setLanguageInde(languages.indexOf(v))
                : setLanguageInde(0)
            }
          />
          <Select
            label="Available Time"
            placeholder="Pick value"
            data={data.availableTimeZone}
            value={time}
            onChange={(v) =>
              v !== null ? setTime(v) : setTime(data.availableTimeZone[0])
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TutorListItem;
