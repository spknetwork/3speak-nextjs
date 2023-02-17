import React, { useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import { background } from "styled-system";

export function CommunityTile(props: any) {
  const [communityPicture, setCommunityPicture] = useState("");

  useEffect(() => {
    const load = async () => {};

    void load();
  }, []);

  return (
    <Col className="col-md-3 col-sm-3 mb-3" md={3} sm={3}>
      <a href={`#/community/${props.reflink}`} className="font-weight-bold">
        <div
          className="community-card channels-card"
          style={{
            background: "#fff none repeat scroll 0 0",
            borderRadius: "border-radius:2px",
            boxShadow: "0 0 11px #ececec;",
            padding: "5px 12px",
            position: "relative",
            textAlign: "center",
            transitionDuration: ".4s",
          }}
        >
          <div
            className="text-left"
            style={{ display: "inline-block", float: "left" }}
          >
            <img
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
              src={
                "https://images.hive.blog/u/" + props.name + "/avatar?size=icon"
              }
            />
            {props.info.title}
          </div>
          <div
            className="text-right"
            style={{
              display: "inline-block",
              paddingTop: "2px",
              float: "right",
            }}
          >
            <div></div>
            <span className="text-success"></span>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </a>
    </Col>
  );
}
