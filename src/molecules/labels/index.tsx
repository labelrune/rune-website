import React from "react";
import LabelsData from "./LabelsData";
import { CatalogueEnum } from "src/types/Catalogue";

const Labels = () => {
  const catalogueEnumsArray = Object.values(CatalogueEnum);
  return (
    <div className="md:p-8 p-3">
      {catalogueEnumsArray.map((catalogue) => (
        <LabelsData catalogue={catalogue} key={catalogue} />
      ))}
    </div>
  );
};

export default Labels;
