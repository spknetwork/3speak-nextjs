import { useRouter } from "next/router";
import React from "react";

const Search = () => {
  const { query } = useRouter();
  const searchQuery = ((query?.q || '') as string).split("+").join(" ");

  return <div>{searchQuery}</div>;
};

export default Search;
