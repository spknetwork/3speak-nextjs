import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React from "react";

const Slider = () => {
  return (
    <Card
      backgroundColor={"#1fbf8f!important"}
      borderRadius="0.25rem"
      border={"0 solid transparent"}
      backgroundClip="border-box"
      display={"flex"}
      flexDirection="column"
      boxShadow={"0 1px 4px rgba(0,0,0,0.4)"}
      position="relative"
    >
      <CardBody textAlign={"left"} backgroundColor="#fff !important">
        <Text
          as={"h6"}
          color="#666 !important"
          marginBottom={"0.5rem !important"}
          fontSize="0.8125rem"
        >
          Publish first video(s)
        </Text>
        <FormControl>
          <FormLabel>Progress 1/1</FormLabel>
          {/* <Slider aria-label="slider-ex-1" defaultValue={30}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider> */}
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default Slider;
