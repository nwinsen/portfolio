import React from "react";
import { Image } from "@chakra-ui/react";

interface WorkItemProps {
  title: string;
  description: string;
  date: string;
  img: string;
}

const WorkItem = ({ title, description, date }: WorkItemProps) => {
  return (
    <div className="work-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{date}</span>
    </div>
  );
};

export default WorkItem;
