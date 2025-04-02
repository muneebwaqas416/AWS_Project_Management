import React from "react";
import ReusablePriorityPage from "../ResusablePriorityPage";
import { Priority } from "@/app/state/types";


const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;