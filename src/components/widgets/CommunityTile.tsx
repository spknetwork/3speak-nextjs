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
        <div className="community-card channels-card shadow-sm">
          <div
            className="text-left text-dark"
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
            <span className="ps-1 fw-bold">{props.info.title}</span>
          </div>
          <div
            className="text-end"
            style={{
              display: "inline-block",
              paddingTop: "2px",
              float: "right",
            }}
          >
            <div className="text-dark fw-bold">Pending payouts </div>
            <div className="text-end">
              <span className="text-success fw-bold">${props.sum_pending}</span>
              <span className="text-dark mx-2 fw-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </a>
    </Col>
  );
}
