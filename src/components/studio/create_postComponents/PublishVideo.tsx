import React from "react";
import {
  CardBody,
  Box,
  Flex,
  Text,
  Stack,
  Radio,
  Input,
  RadioGroup,
  useColorMode,
  useColorModeValue,
  Button,
  Image
} from "@chakra-ui/react";
import { SlCheck, SlPicture } from "react-icons/sl";
import { FilePreview } from "@/pages/studio/create_post";

type Props = {
  publishValue: string;
  setPublishValue: React.Dispatch<React.SetStateAction<string>>;
  selectedFile: FilePreview | null;
  savingDetails: Boolean | null;
  handleStep3Complete: () => void;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};

const PublishVideo = ({publishValue, setPublishValue, selectedFile, savingDetails, handleStep3Complete, setSteps
}: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <CardBody backgroundColor={bgColor} minH={"75vh"}>
      <Box height={{ base: "auto", md: "auto", lg: "65vh" }} width={"100%"}>
        <Flex
          margin={"auto"}
          height={"100%"}
          width={"100%"}
          flexDirection="column"
          justifyContent={"center"}
        >
          <Flex
            flexDirection={{
              base: "column",
              md: "column",
              lg: "row",
            }}
            height={"100%"}
          >
            <Box
              width={{ base: "100%", md: "100%", lg: "70%" }}
              padding="20px"
              paddingY={"10px"}
            >
              <Flex
                width={"100%"}
                height="100%"
                justifyContent="start"
                alignItems={"start"}
                flexDirection="column"
              >
                <Text textAlign={"start"} as="h3">
                  Visibility
                </Text>
                <Text marginBottom={"10px"} as="label">
                  Choose when to publish and who can see your video
                </Text>
                <Box
                  borderRadius={"10px"}
                  height={"300px"}
                  border="1px solid"
                  width={{ base: "100%", md: "100%", lg: "100%" }}
                >
                  <RadioGroup onChange={setPublishValue} value={publishValue}>
                    <Box marginTop={"40px"} width="80%" marginX={"auto"}>
                      <Box marginBottom={"15px"}>
                        <Text as="h3">Publish</Text>
                        <Text as="label">
                          Make your video public now or schedule a date
                        </Text>
                      </Box>
                      <Box marginBottom={"15px"} marginLeft={"20px"}>
                        <Stack spacing={5} direction="row">
                          <Radio value="1">Publish Now</Radio>
                        </Stack>

                        <Text as="label">
                          Publish after encoding and everyone can watch the
                          video
                        </Text>
                      </Box>
                      <Box marginBottom={"15px"} marginLeft={"20px"}>
                        <Stack spacing={5} direction="row">
                          <Radio value="2">Schedule</Radio>
                        </Stack>
                        <Box>
                          <Text as="label">Set a date and time</Text>
                        </Box>

                        {publishValue == "2" && (
                          <Input
                            alignItems={"center"}
                            width={"50%"}
                            type="datetime-local"
                            placeholder="select date"
                          />
                        )}
                      </Box>
                    </Box>
                  </RadioGroup>
                </Box>
              </Flex>
            </Box>
            <Box
              paddingTop={"74px"}
              width={{ base: "100%", md: "100%", lg: "80%" }}
              paddingX="20px"
              paddingBottom={"10px"}
            >
              <Flex
                width={"65%"}
                height="240px"
                border={"1px solid"}
                justifyContent="center"
                background={"black"}
                alignItems={"center"}
                borderRadius="10px 10px 0px 0px"
              >
                {selectedFile ? (
                  <>
                    {selectedFile.file.type.startsWith("image/") ? (
                      <Image
                        src={selectedFile.previewUrl}
                        alt="Preview"
                        className="preview"
                        position={"relative"}
                      />
                    ) : (
                      <Box
                        position={"absolute"}
                        height={"250px"}
                        width={"250px"}
                      >
                        <video
                          src={selectedFile.previewUrl}
                          className="preview_visibility"
                          controls
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <SlPicture width={"100px"} color="white" fontSize="70px" />
                )}
              </Flex>
              <Flex
                bg={colorMode === "dark" ? "gray.7000" : "gray.100"}
                width={"65%"}
                height="60px"
                justifyContent="start"
                alignItems={"start"}
                flexDirection="column"
                borderRadius="0px 0px 10px 10px"
              >
                <Text
                  marginTop={{ base: "5px", md: "5px", lg: "5px" }}
                  fontSize={"12px"}
                  fontWeight="bold"
                  marginLeft="10px"
                  color={colorMode === "dark" ? "white" : "black"}
                >
                  File Name
                </Text>
                {selectedFile?.file?.name && (
                  <Text
                    fontSize={{
                      base: "10px",
                      md: "10px",
                      lg: "12px",
                    }}
                    fontWeight="bold"
                    color={colorMode === "dark" ? "white" : "black"}
                    marginLeft={{
                      base: "0px",
                      md: "0px",
                      lg: "10px",
                    }}
                    // padding={{
                    //   base: "0px 10px",
                    //   md: "0px 10px",
                    //   lg:"10px",
                    // }}
                    width={{ base: "100%", md: "100%", lg: "100%" }}
                  >
                    {selectedFile?.file?.name ? selectedFile.file.name : ""}
                  </Text>
                )}
                <Flex
                  marginTop={{ base: "5px", md: "5px", lg: "20px" }}
                  justifyContent="center"
                  alignItems={"center"}
                  marginLeft={{
                    base: "2px",
                    md: "2px",
                    lg: "10px",
                  }}
                >
                  <SlCheck fontSize={"20px"} color="white" />
                  <Text
                    fontSize={{
                      base: "12px",
                      md: "12px",
                      lg: "15px",
                    }}
                    fontWeight="bold"
                    color={"whiteAlpha.900"}
                    mt={2}
                    marginLeft={{
                      base: "5px",
                      md: "5px",
                      lg: "10px",
                    }}
                  >
                    Video upload complete. No issues found.
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Button
              disabled={!!savingDetails}
              onClick={() => setSteps((step) => step - 1)}
              size={"lg"}
              colorScheme="blue"
            >
              Go Back
            </Button>
            <Button
              disabled={!!savingDetails}
              onClick={handleStep3Complete}
              size={"lg"}
              colorScheme="blue"
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>
    </CardBody>
  );
};

export default PublishVideo;
