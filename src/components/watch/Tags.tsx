import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { VideoDetails } from "types";

type Props = {
  bgColor: string;
  colorMode: string;
  videoDetails: VideoDetails;
};

const Tags = ({ videoDetails, ...props }: Props) => {
  const dateFormatting = (data: string) => {
    const date = new Date(data);
    const year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let formattedMonth: string;

    switch (month) {
      case "01":
        formattedMonth = "Jan";
        break;
      case "02":
        formattedMonth = "Feb";
        break;
      case "03":
        formattedMonth = "Mar";
        break;
      case "04":
        formattedMonth = "Apr";
        break;
      case "05":
        formattedMonth = "May";
        break;
      case "06":
        formattedMonth = "Jun";
        break;
      case "07":
        formattedMonth = "Jul";
        break;
      case "08":
        formattedMonth = "Aug";
        break;
      case "09":
        formattedMonth = "Sep";
        break;
      case "10":
        formattedMonth = "Oct";
        break;
      case "11":
        formattedMonth = "Nov";
        break;
      case "12":
        formattedMonth = "Dec";
        break;
      default:
        formattedMonth = "";
    }
    const day = String(date.getDate()).padStart(2, "0");

    return `${formattedMonth} ${day}, ${year}`; 
  };

  // console.log("getVideo TAGS", getVideo)
  const firstFive = videoDetails?.tags?.slice(0, 5);
  return (
    <Flex>
      <Box
        display={"flex"}
        flexWrap="wrap"
        flexDirection={"row"}
        marginBottom={"0.5rem"}
      >
        {firstFive?.map((tag: any, index: number) => {
          return (
            <Box key={index}>
              <Link
                href={"/tags/" + `${tag}`}
                display={"inline-block"}
                color={props.colorMode === "dark" ? "blue.300" : "blue"}
              >
                #{tag}&nbsp;
              </Link>
            </Box>
          );
        })}
      </Box>
      <Flex px={2}>
        <Text>{dateFormatting(videoDetails?.created_at)}</Text>
      </Flex>
    </Flex>
  );
};

export default Tags;
