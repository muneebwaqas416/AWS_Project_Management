import React from "react";
import { Priority } from "@/app/state/types";
import ReusablePriorityPage from "../ResusablePriorityPage";


const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;