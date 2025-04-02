import { Priority } from "@/app/state/types";
import ReusablePriorityPage from "../ResusablePriorityPage";
import React from "react";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Urgent;