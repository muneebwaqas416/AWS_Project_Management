'use client'

import { useAppSelector } from "@/app/redux";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { TableProps } from "../types";
import { columns } from "../constants";
import Header from "@/app/(components)/Header";
import { useGetTasksQuery } from "@/app/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const TableView = ({ id, setIsModalNewTaskOpen }: TableProps) => {
  const [isLocalLoading, setisLocalLoading] = useState<boolean>(true);

    const isDarkMode = useAppSelector((state) => state.global.isDarkModeOn);
  
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });
  console.log("I am in the table tasks",tasks)

  useEffect(() => {
        setisLocalLoading(false)
  }, [])

  if(isLocalLoading){
    return <div className="">Loading</div>
  }
  if (isLoading) return <div>Loading...</div>;
  if (error || !tasks) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={{
            height : 350,
            ...dataGridSxStyles(isDarkMode)
        }}
      />
    </div>
  );
};

export default TableView;