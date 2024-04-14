import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { MentionsInput } from "react-mentions";

function getMentionInputStyle(
  theme: "light" | "dark",
  isError?: boolean
): ComponentProps<typeof MentionsInput>["style"] {
  const bgColor = theme == "dark" ? "#1a202c" : "#ffffff";
  // const borderColor = "red"

  return {
    control: {
      backgroundColor: bgColor,
      fontSize: 14,
      fontWeight: "normal",
      border: "0px",

      // borderColor: isError ? 'red' : undefined,
    },

    // borderColor: isError ? 'red' : undefined,

    "&multiLine": {
      control: {
        fontFamily: "monospace",
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        // border: "1px solid transparent",
        border: "0px",
      },
      input: {
        padding: 9,
        // border: !isError ? "2px solid silver" : "2px solid red",
        // border: isError ? "2px solid red" : "2px solid white"
        border: "0px",
      },
    },

    "&singleLine": {
      display: "inline-block",
      width: 180,

      highlighter: {
        padding: 4,
        // border: "2px inset transparent",
        // border: "2px solid red",
        border: "0px",
      },
      input: {
        padding: 1,
        // border: "2px inset",
        // border: "2px solid red",
        border: "0px",
      },
    },

    suggestions: {
      list: {
        backgroundColor: "white",
        // border: "1px solid rgba(0,0,0,0.15)",
        fontSize: 14,
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        "&focused": {
          backgroundColor: "#cee4e5",
        },
      },
    },
  };
}

function getMentionStyle(theme: "light" | "dark") {
  const bgColor = theme == "dark" ? "#75c0e6" : "#75c0e6";
  return {
    backgroundColor: bgColor,
  };
}

export { getMentionInputStyle, getMentionStyle };
