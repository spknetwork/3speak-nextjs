import { useColorMode, useColorModeValue } from "@chakra-ui/react";

function getMentionInputStyle(theme: "light" | "dark") {
  const bgColor = theme == "dark" ? "#1a202c" : "#ffffff";
  const borderColor = "#ededee"

  return {
    control: {
      backgroundColor: bgColor,
      fontSize: 14,
      fontWeight: "normal",
    },

    "&multiLine": {
      control: {
        fontFamily: "monospace",
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        border: "1px solid transparent",
      },
      input: {
        padding: 9,
        border: "1px solid silver",
      },
    },

    "&singleLine": {
      display: "inline-block",
      width: 180,

      highlighter: {
        padding: 1,
        border: "2px inset transparent",
      },
      input: {
        padding: 1,
        border: "2px inset",
      },
    },

    suggestions: {
      list: {
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.15)",
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
