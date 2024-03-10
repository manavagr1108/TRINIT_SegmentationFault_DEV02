import {
    Button,
    Center,
    Flex,
    Group,
    Loader,
    Modal,
    ScrollArea,
    SegmentedControl,
    Skeleton,
    Text,
    Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    tutorRecommendation,
} from "../../../utils/apiCalls";
import { showNotification } from "../../../utils/helpers";

interface Props {
    delay: number;
}
const HelpDesk: FC<Props> = ({ delay }) => {
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState<string>("1");
    const [chat, setChat] = useState<string>("");
    const [isFetchingChat, setIsFetchingChat] = useState<boolean>(false);
    const [generatedChat, setGeneratedChat] = useState<
        { query: string; output: string }[]
    >([]);

    const generateChatSubmit = async (content: string) => {
        setIsFetchingChat(true);
        try {
            const arr = generatedChat;
            arr.push({ query: content, output: "" });
            setGeneratedChat(arr);
            setTimeout(() => {
                const newArr = generatedChat;
                newArr.pop();
                newArr.push({ query: content, output: "Your dedication and effort in learning Spanish are commendable, with strong participation and completion of tasks; however, there's room for improvement in concept understanding and fluency, keep up the good work!" });
                setGeneratedChat(newArr);
                setChat("");
                setIsFetchingChat(false);
            }, 3000)
            return;
            const response = await tutorRecommendation(content);
            if (response.status === 200) {
                const newArr = generatedChat;
                newArr.pop();
                newArr.push({ query: content, output: response.data });
                setGeneratedChat(newArr);
            } else {
                const newArr = generatedChat;
                newArr.pop();
                setGeneratedChat(newArr);
                showNotification("Error", response.data.message, "error");
            }
        } catch {
            showNotification("Error", "Internal server error", "error");
            navigate("/login");
        }
        setChat("");
        setIsFetchingChat(false);
    };




    return (
        <motion.div
            style={{
                position: "fixed",
                bottom: "5vh",
                right: "5vw",
                zIndex: 2069,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0 } }}
        >
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={true}
                withinPortal={true}
                styles={{
                    inner: {
                        visibility: "hidden",
                    },
                }}
            ></Modal>
            <AnimatePresence>
                {!opened && (
                    <motion.div
                        initial={{ x: "-50%", y: "-100%", opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: "-50%", y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            style={{
                                width: "200px !important",
                                zIndex: 1000,
                            }}
                            onClick={open}
                        >
                            Open Chatbox
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {opened && (
                    <motion.div
                        initial={{ x: "100%", y: "100%", opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: "100%", y: "100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "fixed",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5%",
                            boxSizing: "border-box",
                            borderWidth: "4px",
                            borderStyle: "solid",
                            borderColor: "purple",
                            background: "white",
                            borderRadius: "20px",
                            padding: "2%",
                            bottom: "25vh",
                            right: "25vw",
                            width: "45vw",
                            height: "55vh",
                            zIndex: 1000,
                        }}
                    >
                        <ScrollArea h={450}>
                            <Center>
                                <Text size="lg">Chat with AI</Text>
                            </Center>
                            <Group
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    flexFlow: "row wrap",
                                    overflowY: "auto",
                                    marginTop: "1rem",
                                }}
                            >
                                <div style={{ width: "75%" }}>
                                    <Flex className="flex-col">
                                        <SegmentedControl
                                            value={value}
                                            onChange={(value) => { setValue(value); setGeneratedChat([]); setIsFetchingChat(false); setChat("") }}
                                            className={`${value == "4" ? "mb-[5px]" : ""}`}
                                            data={[
                                                { label: "Generate feedback", value: "1" },
                                            ]}
                                        />
                                    </Flex>

                                    <>
                                        <Flex className="h-[20vh] max-h-[20vh] border-[3px] border-solid rounded-md overflow-y-auto w-full flex-col">
                                            {generatedChat.map((elem, key) => {
                                                return (
                                                    <>
                                                        <Flex
                                                            className="max-w-[70%] rounded-lg bg-blue-500 text-white self-end mt-[10px] mr-[4px] p-[4px]"
                                                            key={key}
                                                        >
                                                            <Text>{elem.query}</Text>
                                                        </Flex>
                                                        <Flex
                                                            className="max-w-[70%] rounded-lg bg-green-500 text-white self-start mt-[10px] ml-[4px] p-[4px]"
                                                            key={generatedChat.length + key}
                                                        >
                                                            <Text>
                                                                {elem.output.length > 0
                                                                    ? elem.output
                                                                    : "Generating ..."}
                                                            </Text>
                                                        </Flex>
                                                    </>
                                                );
                                            })}
                                        </Flex>
                                        <Skeleton visible={isFetchingChat}>
                                            <Textarea
                                                classNames={{
                                                    input:
                                                        "h-[8vh] border-[3px] border-solid rounded-md",
                                                }}
                                                label="Query"
                                                placeholder="Type/Paste your query"
                                                withAsterisk
                                                value={chat}
                                                disabled={isFetchingChat}
                                                onChange={(event) =>
                                                    setChat(event.currentTarget.value)
                                                }
                                            />
                                        </Skeleton>
                                    </>

                                </div>
                                <Group
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        width: "20%",
                                        alignItems: "center",
                                    }}
                                >
                                    {
                                        (isFetchingChat ? (
                                            <Button rightSection={<Loader color="white" size={14} />}>
                                                Generating
                                            </Button>
                                        ) : (
                                            <Button
                                                w={"100%"}
                                                disabled={isFetchingChat}
                                                onClick={() => { if (value == "1") { generateChatSubmit(chat) } }}
                                            >
                                                {" "}
                                                Generate
                                            </Button>
                                        ))}
                                </Group>
                            </Group>
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HelpDesk;