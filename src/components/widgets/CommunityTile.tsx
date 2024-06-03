import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import { background } from "styled-system";

type Props = {
  reflink: string;
  name: string;
  info: any;
  sum_pending: number;
  bgColor: string;
  colorMode: string;
};

export function CommunityTile(props: Props) {
  const [communityPicture, setCommunityPicture] = useState("");
  useEffect(() => {
    const load = async () => {};
    void load();
  }, []);

  return (
    <Box w={300} p={2} m={2} boxShadow={props.colorMode == "dark" ? "0 0 1px black" : "0 0 1px grey"}>
      <a href={`/community/${props.reflink}`} className="font-weight-bold">
        <div
          className={`community-card channels-card shadow-sm ${
            props.colorMode === "dark"
              ? "bg-dark text-white"
              : "bg-light text-dark"
          }`}
        >
          <div
            className={`text-left text-dark d-flex justify-content-center align-items-center ${
              props.colorMode === "dark"
                ? "bg-dark text-white"
                : "bg-light text-dark"
            }`}
            style={{ display: "inline-block", float: "left" }}
          >
            <Image
              alt="hive blog"
              width="40px"
              height="40px"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
              loader={() =>
                "https://images.hive.blog/u/" + props.name + "/avatar?size=icon"
              }
              src={
                "https://images.hive.blog/u/" + props.name + "/avatar?size=icon"
              }
            />
            <span className="ps-1 fw-bold">
              {props.info.title.length > 10
                ? props.info.title.substr(0, 10) + "..."
                : props.info.title}
            </span>
          </div>
          <div
            className="text-end"
            style={{
              display: "inline-block",
              paddingTop: "2px",
              float: "right",
            }}
          >
            <div
              className={`text-dark fw-bold font-smaller ${
                props.colorMode === "dark" ? "text-white" : "text-dark"
              }`}
            >
              Pending payouts
            </div>
            <div className="text-end d-flex justify-content-center align-items-center">
              <div
                className="mx-2 "
                style={{
                  border: "1px solid",
                  borderRadius: "10px",
                  width: "20px",
                }}
              >
                <span
                  className={`text-dark fw-bold d-flex justify-content-center align-items-center ${
                    props.colorMode === "dark"
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                    style={{ width: "10px" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </div>

              <span className="text-success fw-bold">${props.sum_pending}</span>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </a>
    </Box>
  );
}
