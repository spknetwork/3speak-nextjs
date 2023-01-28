import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { LeaderTile } from "@/components/LeaderTile";

export default function LeaderboardView() {
  const [first, setFirst] = useState<any>();
  const [second, setSecond] = useState<any>();
  const [third, setThird] = useState<any>();
  const [bronze, setBronze] = useState<any[]>([]);

  useEffect(() => {
    let data = [
      { rank: 1, score: 519, username: "rairfoundation" },
      { rank: 2, score: 505, username: "rair2" },
      { rank: 3, score: 400, username: "pouch22" },
      { rank: 4, score: 399, username: "igormuba" },
      { rank: 5, score: 398, username: "igormuba-dev" },
    ];
    console.log(data);
    let step = 1;
    let bronzeToSet = [];
    for (const ex of data) {
      if (step >= 30) {
        break;
      }
      if (step === 1) {
        console.log("FIRST");
        console.log(ex);

        setFirst(ex);
      } else if (step === 2) {
        console.log("SECOND");
        console.log(ex);
        setSecond(ex);
      } else if (step === 3) {
        console.log("THIRD");
        console.log(ex);
        setThird(ex);
      } else {
        bronzeToSet.push(ex);
      }
      step++;
    }
    setBronze(bronzeToSet);

    document.title = "3Speak - Tokenised video communities";
    void load();

    async function load() {
      let step = 1;
    }
  }, []);

  useEffect(() => {
    console.log(`first is now `, first);
  }, [first]);

  return (
    <div>
      <div className="header_sec">
        <Container fluid className="header_sec">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-xs-12 header_dist1">
              <h1 className="white_col">Content Creator Leaderboard</h1>
            </div>
          </div>
        </Container>
      </div>
      <section className="content_home">
        <Container fluid>
          <Row className="justify-content-md-center">
            <div className="col-xl-8 col-sm-8 col-12 mb-3">
              {first && (
                <LeaderTile info={first} reflink={`hive:${first.username}`} />
              )}
            </div>
          </Row>
          <Row className="justify-content-md-center">
            <div className="col-xl-5 col-sm-8 col-12 mb-3">
              {second ? (
                <LeaderTile info={second} reflink={`hive:${second.username}`} />
              ) : null}
            </div>
            <div className="col-xl-5 col-sm-8 col-12 mb-3">
              {third ? (
                <LeaderTile info={third} reflink={`hive:${third.username}`} />
              ) : null}
            </div>
            <Row>
              {bronze.map((value) => (
                <div key={value.username} className="col-xl-2 col-sm-4 mb-3">
                  <LeaderTile info={value} reflink={`hive:${value.username}`} />
                </div>
              ))}
            </Row>
          </Row>
        </Container>
      </section>
    </div>
  );
}
