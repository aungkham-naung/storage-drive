import React from "react";
import { Models } from "node-appwrite";

const Card = ({ file }: Models.Document) => {
  return <div>{file.name}</div>;
};

export default Card;
