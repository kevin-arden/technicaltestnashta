import React, { useState } from "react";

const Search = (value) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
  };
  return (
    <div></div>
  );
};

export default Search;
