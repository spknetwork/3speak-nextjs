import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { CommunityTile } from "../components/widgets/CommunityTile";
const { Client: HiveClient } = require("@hiveio/dhive");
const client = new HiveClient("https://api.openhive.network");

export default function CommunitiesView() {
  const [data, setData] = useState([]);

  const generate = async () => {
    const res = await client.call("bridge", "list_communities", {
      last: "",
      limit: 100,
    });
    setData(res);
  };
  useEffect(() => {
    document.title = "3Speak - Tokenised video communities";
    generate();
  }, []);
  return (
    <div>
      <div className="header_sec">
        <Container fluid className="header_sec">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-xs-12 header_dist1">
              <h1 className="white_col">COMMUNITIES</h1>
              <p className="text-dark">
                Keep scrolling to explore more exciting communities!
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container fluid className="p-5 bg-color-eff4f5">
        {/* <Row>
          <div className="col-md-12">

          </div>
        </Row> */}
        <Row>
          <div className="col-12 d-flex flex-row justify-content-end">
            <span className="float-right mb-3">
              <Button
                className="color-primary p-3"
                id="communityCreate"
                variant="primary"
              >
                CREATE +
              </Button>
            </span>
          </div>

          <div className="col-12">
            <div className="alert alert-primary text-white" role="alert">
              Make sure you have a minimum of 3.00 HIVE in your HIVE wallet to
              create a new community
            </div>
          </div>
        </Row>
        <Row>
          {data.map((value: any) => (
            <CommunityTile
              key={value.name}
              name={value.name}
              sum_pending={value.sum_pending}
              // reflink={`hive:${value.name}`}
              reflink={`${value.name}`}
              info={value}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
}
