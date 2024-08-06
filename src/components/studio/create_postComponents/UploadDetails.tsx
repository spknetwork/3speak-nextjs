import React from "react";
import {
  Flex,
  Box,
  CardBody,
  Text,
  Input,
  Textarea,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import Chips from "@/components/Create_POST/Chips";
import { FilePreview } from "@/pages/studio/create_post";
import Image from "next/image";
import { SlPicture, SlCheck } from "react-icons/sl";
import { SelectorImage } from "@/components/studio/SelectorImage";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

type Props = {
  selectedFile: FilePreview | null;
  savingDetails: Boolean | null;
  videoTitle: string;
  setVideoTitle: React.Dispatch<React.SetStateAction<string>>;
  videoDescription: string;
  setVideoDescription: React.Dispatch<React.SetStateAction<string>>;
  chipData: { label: string }[];
  setChipData: React.Dispatch<React.SetStateAction<{ label: string }[]>>;
  chipInput: string;
  setChipInput: React.Dispatch<React.SetStateAction<string>>;
  chipDataDelete: (label: string) => void;
  handleAddChipData: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  getInputPropsThumbnail: <T extends DropzoneInputProps = DropzoneInputProps>(
    props?: T | undefined
  ) => T;
  getRootPropsThumbnail: <T extends DropzoneRootProps = DropzoneRootProps>(
    props?: T | undefined
  ) => T;
  previewManualThumbnails: { file: File; previewUrl: string }[];
  previewThumbnails: string[];
  selectedThumbnail: {
    type: "generated" | "uploaded";
    index: number;
  };
  setSelectedThumbnail: React.Dispatch<
    React.SetStateAction<{
      type: "generated" | "uploaded";
      index: number;
    }>
  >;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  handleStep1Complete: () => Promise<void>;
};

const UploadDetails = ({ selectedFile, savingDetails, videoTitle, setVideoTitle, videoDescription, setVideoDescription, chipData, setChipData, chipInput, setChipInput, chipDataDelete, handleAddChipData, getInputPropsThumbnail, getRootPropsThumbnail, previewManualThumbnails, previewThumbnails, selectedThumbnail, setSelectedThumbnail, setSteps, handleStep1Complete }: Props) => {
  //useState hooks
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <CardBody backgroundColor={bgColor} maxH={"75vh"} minH={"70vh"}>
      <Box width={"100%"}>
        <Flex
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
              paddingTop={"50px"}
              width={{ base: "100%", md: "100%", lg: "30%" }}
              paddingX="20px"
              paddingBottom={"10px"}
            >
              <Flex
                width={"100%"}
                height="250px"
                border={"1px solid"}
                justifyContent="center"
                background={"black"}
                alignItems={"center"}
                borderRadius="10px 10px 0px 0px"
                position={"relative"}
              >
                {selectedFile ? (
                  <>
                    {selectedFile.file.type.startsWith("image/") ? (
                      <Image src={selectedFile.previewUrl} alt="Preview" />
                    ) : (
                      <Box position={"absolute"}>
                        <video
                          height={100}
                          width={112}
                          src={selectedFile.previewUrl}
                          className="preview"
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
                bg={colorMode === "dark" ? "gray.700" : "gray.100"}
                width={"100%"}
                height="100px"
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
                    padding={{
                      base: "0px 10px",
                      md: "0px 10px",
                      lg: "10px",
                    }}
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
                    mt={2}
                    fontSize={{
                      base: "12px",
                      md: "12px",
                      lg: "15px",
                    }}
                    fontWeight="bold"
                    color={"whiteAlpha.900"}
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
                <Text as={"fieldset"} className="w-100 mb-3">
                  <Text as={"legend"} fontSize="15px" className="fw-bold">
                    Video Title
                  </Text>
                  <Input
                    disabled={savingDetails == true ? true : false}
                    placeholder="Video Title"
                    width={{ base: "89%", md: "89%", lg: "97%" }}
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    border={"none"}
                    boxShadow={colorMode === "dark" ? "dark-lg" : "xs"}
                  />
                </Text>
                <fieldset className="w-100 mb-4 ">
                  <Text as={"legend"} fontSize="15px" className="fw-bold">
                    Video Description
                  </Text>

                  <Textarea
                    disabled={savingDetails == true ? true : false}
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Here is a sample placeholder"
                    border={"none"}
                    boxShadow={colorMode === "dark" ? "dark-lg" : "xs"}
                  />
                </fieldset>
                <fieldset className="w-100 mb-4">
                  <Text as={"legend"} fontSize="15px" className="fw-bold">
                    Tags
                  </Text>
                  <Flex alignItems={"center"}>
                    {chipData.map((chip, index) => (
                      <Chips
                        key={index}
                        label={chip.label}
                        onDelete={() => chipDataDelete(chip.label)}
                        colorMode={colorMode}
                      />
                    ))}
                    <Flex
                      fontSize={"xl"}
                      cursor={"pointer"}
                      alignItems={"center"}
                      position={"relative"}
                    >
                      <Input
                        border={"none"}
                        boxShadow={colorMode === "dark" ? "dark-lg" : "xs"}
                        placeholder={"Add tags"}
                        value={chipInput}
                        onChange={(e) => setChipInput(e.target.value)}
                        onKeyDown={handleAddChipData}
                      />
                      {/* <Text position={"absolute"} top={3} right={2} onClick={handleAddChipData}>
                    <TiPlus />
                  </Text> */}
                    </Flex>
                  </Flex>
                </fieldset>
                <fieldset className="w-100 mb-3">
                  <Text
                    as={"legend"}
                    fontSize="15px"
                    className="fw-bold"
                    marginBottom={"0px"}
                  >
                    Thumbnail
                  </Text>
                  <Text fontSize={"15px"}>
                    Select or upload a picture that shows what`s in your video.
                    A good thumbnail stands out and draws viewer`s attention
                  </Text>
                </fieldset>
                <Flex
                  overflowX="hidden"
                  flexDirection={{
                    base: "column",
                    md: "column",
                    lg: "row",
                  }}
                  width={"100%"}
                  height={{ base: "100%", md: "100%", lg: "150px" }}
                >
                  <input {...getInputPropsThumbnail()} />

                  <Flex
                    {...getRootPropsThumbnail()}
                    minWidth={"200px"}
                    height="100%"
                    border={"2px dotted"}
                    justifyContent="center"
                    alignItems={"center"}
                    flexDirection="column"
                    borderRadius={"10px"}
                  >
                    <SlPicture width={"100px"} color="black" fontSize="70px" />
                    <Text>Upload Thumbnail</Text>
                  </Flex>

                  {previewManualThumbnails.map((e, index) => (
                    <SelectorImage
                      key={e.previewUrl}
                      src={e.previewUrl}
                      selected={
                        selectedThumbnail?.type === "uploaded" &&
                        selectedThumbnail.index === index
                      }
                      select={() =>
                        setSelectedThumbnail({
                          type: "uploaded",
                          index,
                        })
                      }
                    />
                  ))}

                  {previewThumbnails.map((e, index) => (
                    <SelectorImage
                      key={e}
                      src={e}
                      selected={
                        selectedThumbnail?.type === "generated" &&
                        selectedThumbnail.index === index
                      }
                      select={() =>
                        setSelectedThumbnail({
                          type: "generated",
                          index,
                        })
                      }
                    />
                  ))}
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" mx={12}>
            <Button
              disabled={savingDetails == true ? true : false}
              onClick={() => setSteps(0)}
              size={"lg"}
              colorScheme="twitter"
            >
              <IoCaretBackSharp />
              Go Back
            </Button>
            <Button
              id="btn_details"
              disabled={savingDetails == true ? true : false}
              onClick={handleStep1Complete}
              size={"lg"}
              colorScheme="twitter"
            >
              {savingDetails == true ? "Saving Details" : "Next"}
              <IoCaretForwardSharp />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </CardBody>
  );
};

export default UploadDetails;
