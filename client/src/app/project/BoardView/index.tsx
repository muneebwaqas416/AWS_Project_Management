'use client'

import React, { useEffect, useState } from 'react'
import { BoardProps, TaskColumnProps, TaskProps } from '../types'
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/app/state/api'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Task as TaskTypes } from '@/app/state/types'
import { statusColor, taskStatus } from '../constants'
import { EllipsisVertical, MessageSquareMore, Plus } from 'lucide-react'
import { format } from 'date-fns'
import Image from "next/image"

// Component declarations inside module scope
const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Calculate tasks count correctly
  const tasksCount = tasks.filter((item) => {
    return item.status === status
  }).length

  return (
    <div
      ref={(instance)=>{
        drop(instance)
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-2 rounded-s-lg"
          style={{ backgroundColor: statusColor[status] ?? "gray" }}
        ></div>

        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      {
        Array.isArray(tasks) && tasks.length > 0 &&
        tasks
          .filter((task) => task.status === status)
          .map((task) => <Task key={task.id} task={task} />)
      }
    </div>
  )
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  console.log(task.attachments)
 // Using state to ensure consistent rendering between server and client
 const [formattedStartDate, setFormattedStartDate] = useState("");
 const [formattedDueDate, setFormattedDueDate] = useState("");
 const [taskTagsSplit, setTaskTagsSplit] = useState<string[]>([]);

 // Format dates and split tags only on client-side to prevent hydration mismatch
 useEffect(() => {
   if(typeof window !== 'undefined'){
    if (task.startDate) {
      setFormattedStartDate(format(new Date(task.startDate), "P"));
    }
    
    if (task.dueDate) {
      setFormattedDueDate(format(new Date(task.dueDate), "P"));
    }
    
    if (task.tags) {
      setTaskTagsSplit(task.tags.split(','));
    }
   }
 }, [task.startDate, task.dueDate, task.tags]);
  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskTypes['priority'] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance)=>{
        drag(instance)
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=2657&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
          unoptimized={true}
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`https://img.icons8.com/?size=100&id=BFNnYNwK4Goo&format=png&color=000000`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                unoptimized={true}
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`https://img.icons8.com/?size=100&id=21441&format=png&color=000000`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
                unoptimized={true}
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Board = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  
  if (typeof window !== 'undefined' && !id) {
    return <div>Loading project ID...</div>;
  }

  const projectId = Number(id);
  if (typeof window !== 'undefined' && isNaN(projectId)) {
    return <div>Error: Invalid project ID</div>;
  }

  const { 
    data: tasks, 
    isLoading, 
    error, 
    refetch,
    isFetching,
    isSuccess
  } = useGetTasksQuery(
    { projectId: Number(id) || 0 },
    {
      refetchOnMountOrArgChange: true,
      skip: !id || isNaN(Number(id))
    }
  );

  // Update loading state based on query status
  useEffect(() => {
    if (isSuccess) {
      setIsLocalLoading(false);
    } else if (error) {
      setIsLocalLoading(false);
    }
  }, [isSuccess, error]);

  const moveTask = async (taskId: number, toStatus: string) => {
    try {
      setIsLocalLoading(true);
      await updateTaskStatus({ taskId, status: toStatus });
      await refetch();
    } catch (err) {
      console.error('Mutation error:', err);
    } finally {
      setIsLocalLoading(false);
    }
  };

  useEffect(() => {
    setIsLocalLoading(false)
    //setMounted(true);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log('Current tasks data:', tasks);
      console.log('Loading states:', {
        rtkLoading: isLoading,
        localLoading: isLocalLoading,
        isFetching
      });
    }
  }, [tasks, isLoading, isLocalLoading, isFetching]);

  // Use client-side only rendering for loading states
  if (typeof window !== 'undefined' && isLocalLoading) {
    return <div>Loading tasks...</div>;
  }
  
  if (typeof window !== 'undefined' && error) {
    return <div>Error loading tasks</div>;
  }

  if (isLocalLoading) {
    return <div className="p-4">Loading tasks...</div>;
  }
  
  if (error) {
    return <div className="p-4">Error loading tasks</div>;
  }

  const displayTasks = tasks || [];
  
  return (
    <div className="" suppressHydrationWarning={true}>
        <DndProvider backend={HTML5Backend} >
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={displayTasks}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
    </div>
    
  );
};

export default Board;