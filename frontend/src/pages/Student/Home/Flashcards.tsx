import { Badge, Button, Card, Center, Flex, Group, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { languages, showNotification } from "../../../utils/helpers";
import { getFlashCards } from "../../../utils/apiCalls";
import { Carousel } from '@mantine/carousel';

const FlashCard = ({ visibleFlashCard, typingFlashCard }: { visibleFlashCard: FlashcardInterface, typingFlashCard: FlashcardInterface }) => {
    const [input, setInput] = useState<string>("")
    return (<Card shadow="sm" padding="xl" radius="md" withBorder className="w-[80%] h-[40vh]"><Card.Section>
        <Group p="xl" mt="md" mb="xs" className="w-full flex justify-end">
            <Text fw={500} className="text-5xl">{visibleFlashCard.value}</Text>
            <Badge color="pink" className="ml-[20%]">{visibleFlashCard.language}</Badge>
        </Group>

        <TextInput
            p="xl"
            label="Type your answer"
            placeholder={"Enter the translation in " + typingFlashCard.language}
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)} />
        <Center>
            <Button ml='xl' onClick={() => {
                if (typingFlashCard.value.toLowerCase().trim() === input.toLowerCase().trim()) {
                    showNotification("Success", "Your answer was correct", "success");
                    return;
                } else {
                    showNotification("Oops", "The answer was incorrect", "warning");
                    return;
                }
            }}>Submit</Button>
        </Center>
    </Card.Section>
    </Card>)
}

const Flashcards = () => {

    const [typingLanguage, setTypingLanguage] = useState<string | null>("English");
    const [visibleLanguage, setVisibleLanguage] = useState<string | null>("Hindi");
    const [typingFlashCards, setTypingFlashCard] = useState<FlashcardInterface[]>([]);
    const [visibleFlashCards, setVisibleFlashCard] = useState<FlashcardInterface[]>([]);

    const fetchFlashcards = async () => {
        if (!typingLanguage || !visibleLanguage) {
            showNotification("Warning", "Select both the languages", "warning");
            return;
        }
        if (typingLanguage == visibleLanguage) {
            showNotification("Warning", "Both the languages should be different", "warning");
            return;
        }

        const response = await getFlashCards({ typingLanguage, visibleLanguage });
        if (response.status === 200) {
            console.log(response)
            setVisibleFlashCard(response.data.langVisible);
            setTypingFlashCard(response.data.langTyping);
            return;
        } else {
            showNotification("Error", response.data.message, "error");
        }
    }

    return <>
        <Flex className="w-full flex-col h-[100vh]">
            <Flex className="w-full justify-evenly self-center items-center">
                <Select
                    label="Typing Language"
                    withAsterisk
                    placeholder="Choose the language"
                    data={languages}
                    value={typingLanguage}
                    onChange={(event) => setTypingLanguage(event)}
                />
                <Select
                    label="Visible Language"
                    withAsterisk
                    placeholder="Choose the language"
                    data={languages}
                    value={visibleLanguage}
                    onChange={(event) => setVisibleLanguage(event)}
                />
                <Button onClick={fetchFlashcards}>Fetch flashcards</Button>
            </Flex>
            <Flex className="w-full h-[80%] justify-center items-center">

                {visibleFlashCards.length > 0 &&
                    <>
                        <Carousel classNames={{ control: "bg-black text-white text-xl" }} className="h-[50%] w-[35%]" loop>
                            {visibleFlashCards.map((elem, i) => {
                                return <Carousel.Slide key={i} className="h-full w-full">
                                    <Center> <FlashCard visibleFlashCard={visibleFlashCards[i]} typingFlashCard={typingFlashCards[i]} /></Center>
                                </Carousel.Slide>
                            })}
                        </Carousel></>
                }

            </Flex>
        </Flex>
    </>
}
export default Flashcards;