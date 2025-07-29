import React from "react";
import LabelsData from "./LabelsData";
import { Catalogue } from "src/types/Catalogue";

const Lables = () => {
  const catalougeEnumsArray = Object.values(Catalogue).filter(
    (value) => typeof value === "number"
  );
  return (
    <div className="p-8">
      {catalougeEnumsArray.map((catalouge) => (
        <LabelsData catalouge={catalouge} key={catalouge} />
      ))}
    </div>
  );
};

export default Lables;
