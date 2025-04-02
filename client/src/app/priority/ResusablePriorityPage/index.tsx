"use client";

import Header from "@/app/(components)/Header";
import ModalNewTask from "@/app/(components)/ModalNewTask";
import TaskCard from "@/app/(components)/TaskCard";
import { useAppSelector } from "@/app/redux";
import { useGetTasksByUserIdQuery } from "@/app/state/api";
import { Task } from "@/app/state/types";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { columns } from "../contants";
import { PriorityProps } from "../types";

const ReusablePriorityPage = ({ priority }: PriorityProps) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  //const { data: currentUser } = useGetAuthUserQuery({});
  //const userId = currentUser?.userDetails?.userId ?? null;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserIdQuery(1, {
    //skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkModeOn);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;