import React from "react";
import LabelsData from "./LabelsData";
import { Catalogue } from "src/types/Catalogue";

const Labels = () => {
  const catalougeEnumsArray = Object.values(Catalogue).filter(
    (value) => typeof value === "number"
  );
  return (
    <div className="md:p-8 p-3">
      {catalougeEnumsArray.map((catalouge) => (
        <LabelsData catalouge={catalouge} key={catalouge} />
      ))}
    </div>
  );
};

export default Labels;
