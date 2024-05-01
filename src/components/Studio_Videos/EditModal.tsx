import React, { useState } from "react";
import style from "@/styles/studio/studio_videos/style.module.css";
import { Image } from "@chakra-ui/react";
import { VideoData } from "@/pages/studio/studio_videos";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";

type Props = {
  // TODO make EditModal work with only these props
  //   uploadedVideoData: VideoData[];
  //   setUploadedVideoData: React.Dispatch<React.SetStateAction<VideoData[]>>;
  //   index: number;
  // onClose: (videoData: VideoData) => void;

  onClose: (videoData: VideoData) => void;
  videoData: VideoData;
};

/**
 * 1) mount EditModal
 * 2) run the function as normal
 * 3) set the default inputs & default useState values
 * 4) render new state updates
 *    a) run the function as normal
 *    b) all default values are ignored (no useState nor defaultValue input prop)
 */
const EditModal = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(props.videoData?.title || "");
  const [thumbnail, setThumbnail] = useState<
    [previewUrl: string, file: File | null]
  >([props.videoData?.thumbnail, null]);
  const [description, setDescription] = useState<string>(
    props.videoData?.description || ""
  );

  const handleUpdateData = () => {
    const newData: VideoData = {
      // ...props.uploadedVideoData[props.index],
      ...props.videoData,
      title,
      thumbnail: thumbnail[0],
      description,
    };
    //   const updatedData = [...props.uploadedVideoData];
    // let updatedData = props.videoData;
    // updatedData = newData;
    props.onClose(newData);
    setIsOpen(false);
  };

  return (
    <Flex className={style.modal}>
      <Modal isOpen={isOpen} onClose={() => props.onClose(props.videoData)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit content of your uploaded video!</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            {/* title */}
            <FormControl w={"90%"}>
              <FormLabel>Edit Title</FormLabel>
              <Input
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            {/* thumbnail */}
            <FormControl w={"90%"} mt={4}>
              <Image src={thumbnail[0]} alt="test" width={"100px"} />
              <FormLabel>Edit Thumbnail</FormLabel>
              <Input
                pt={2}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setThumbnail([
                      URL.createObjectURL(e.target.files[0]),
                      e.target.files[0],
                    ]);
                  }
                }}
              />
            </FormControl>
            {/* description */}
            <FormControl mt={4} w={"90%"}>
              <FormLabel>Edit Description</FormLabel>
              <Textarea
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateData}>
              Save
            </Button>
            <Button onClick={() => props.onClose(props.videoData)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EditModal;
