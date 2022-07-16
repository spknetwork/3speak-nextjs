import axios from "axios";
import React, { useEffect, useState } from "react";
import { Video } from "./Cards/Video";

interface IProps {
  type: string;
}

export const GridFeedView: React.FC<IProps> = ({ type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://3speak.tv/apiv2/feeds/${type}`).then(({ data }) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <div>
      {data.map((video: any) => (
        <Video key={video.permlink} {...video} />
      ))}
    </div>
  );
};
