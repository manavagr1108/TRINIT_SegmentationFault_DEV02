import {
  Badge,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { languages, showNotification } from "../../../utils/helpers";
import { getFlashCards } from "../../../utils/apiCalls";
import { Carousel } from "@mantine/carousel";

const FlashCard = ({
  visibleFlashCard,
  typingFlashCard,
}: {
  visibleFlashCard: FlashcardInterface;
  typingFlashCard: FlashcardInterface;
}) => {
  const [input, setInput] = useState<string>("");
  return (
    <Flex className="w-full px-[10%] py-[20%] border-2 rounded-lg shadow-lg  h-[100%] items-center justify-around flex-col">
      <Flex
        mt="md"
        mb="xs"
        className="w-full h-full items-center justify-center flex-wrap"
      >
        <Text fw={500} className="text-3xl">
          {visibleFlashCard.value}
        </Text>
        <Badge color="pink" className="ml-[20%]">
          {visibleFlashCard.language}
        </Badge>
      </Flex>

      <TextInput
        p="xl"
        label="Type your answer"
        description={"Enter the translation in " + typingFlashCard.language}
        placeholder={"Enter your answer"}
        variant="filled"
        classNames={{
          label: "text-indigo-500 text-xs",
          description: "text-indigo-500 text-xs",
        }}
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
      />
      <Button
        variant="subtle"
        color="indigo"
        className="hover:border-2 border-indigo-500"
        onClick={() => {
          if (
            typingFlashCard.value.toLowerCase().trim() ===
            input.toLowerCase().trim()
          ) {
            showNotification("Success", "Your answer was correct", "success");
            return;
          } else {
            showNotification("Oops", "The answer was incorrect", "warning");
            return;
          }
        }}
      >
        Submit
      </Button>
    </Flex>
  );
};

const Flashcards = () => {
  const [typingLanguage, setTypingLanguage] = useState<string | null>(
    "English"
  );
  const [visibleLanguage, setVisibleLanguage] = useState<string | null>(
    "Hindi"
  );
  const [typingFlashCards, setTypingFlashCard] = useState<FlashcardInterface[]>(
    []
  );
  const [visibleFlashCards, setVisibleFlashCard] = useState<
    FlashcardInterface[]
  >([]);

  const fetchFlashcards = async () => {
    if (!typingLanguage || !visibleLanguage) {
      showNotification("Warning", "Select both the languages", "warning");
      return;
    }
    if (typingLanguage == visibleLanguage) {
      showNotification(
        "Warning",
        "Both the languages should be different",
        "warning"
      );
      return;
    }

    const response = await getFlashCards({ typingLanguage, visibleLanguage });
    if (response.status === 200) {
      console.log(response);
      setVisibleFlashCard(response.data.langVisible);
      setTypingFlashCard(response.data.langTyping);
      return;
    } else {
      showNotification("Error", response.data.message, "error");
    }
  };

  return (
    <>
      <Flex className="w-full flex-col items-center h-full mt-4">
        <Text fw={700} size="xl">
          Flash Cards!
        </Text>
        <Flex className="w-full justify-evenly self-center items-center">
          <Select
            label="Typing Language"
            withAsterisk
            placeholder="Choose the language"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            data={languages}
            value={typingLanguage}
            onChange={(event) => setTypingLanguage(event)}
          />
          <Select
            label="Visible Language"
            withAsterisk
            placeholder="Choose the language"
            variant="filled"
            classNames={{
              label: "text-indigo-500 text-xs",
            }}
            data={languages}
            value={visibleLanguage}
            onChange={(event) => setVisibleLanguage(event)}
          />
          <Button
            variant="subtle"
            color="indigo"
            className="hover:border-2 self-end border-indigo-500"
            onClick={fetchFlashcards}
          >
            Fetch flashcards
          </Button>
        </Flex>
        <Flex className="w-full h-full justify-center items-center">
          {visibleFlashCards.length > 0 && (
            <>
              <Carousel
                classNames={{ control: "bg-black text-white text-xl" }}
                className="h-[60%] w-[50%]"
                loop
                align="end"
              >
                {visibleFlashCards.map((elem, i) => {
                  return (
                    <Carousel.Slide key={i} className="h-full w-full">
                      <FlashCard
                        visibleFlashCard={visibleFlashCards[i]}
                        typingFlashCard={typingFlashCards[i]}
                      />
                    </Carousel.Slide>
                  );
                })}
              </Carousel>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default Flashcards;
