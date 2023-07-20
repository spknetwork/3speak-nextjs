import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Achievements = () => {
  return (
    <Box width={"100%"} padding="20px" background="white">
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem padding={"20px"}>
          <Text as="h2" fontSize={"2rem"}>
            <AccordionButton padding={"0px"}>
              <Box as="span" flex="1" textAlign="left">
                POST
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
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
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first ten video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/10</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first fifty video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/50</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem padding={"20px"}>
          <Text as="h2" fontSize={"2rem"}>
            <AccordionButton padding={"0px"}>
              <Box as="span" flex="1" textAlign="left">
                SUBSCRIPTIONS
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
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
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first ten video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/10</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first fifty video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/50</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem padding={"20px"}>
          <Text as="h2" fontSize={"2rem"}>
            <AccordionButton padding={"0px"}>
              <Box as="span" flex="1" textAlign="left">
                VIEWS
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Text>
          <AccordionPanel pb={4}>
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
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first ten video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/10</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
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
                  Publish first fifty video(s)
                </Text>
                <FormControl>
                  <FormLabel>Progress 5/50</FormLabel>
                  <Slider
                    isDisabled={true}
                    aria-label="slider-ex-1"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
              </CardBody>
            </Card>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Achievements;
