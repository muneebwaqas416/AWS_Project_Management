import { useCreateTaskMutation } from "@/app/state/api";
import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";
import Modal from "../Modal";
import { ModalNewTaskProps } from "../types";
import { Priority, Project, Status, User } from "@/app/state/types";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


const ModalNewTask = ({ isOpen, onClose, id = null }: ModalNewTaskProps) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async ()=>{
    try {
        
    } catch (error) {
        console.log("Error while fetching Projects" , error);        
    }
  }

  const fetchUsers = async()=>{
    try {
        
    } catch (error) {
        console.log("Error while fetching Users" , error);
    }
  }

  useEffect(()=>{
        fetchProjects();
        fetchUsers();
  },[])

  const handleSubmit = async () => {
    try {
        if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
    toast.success("Task Created Successfully",{
        autoClose : 1000
    })
    } catch (error) {
      console.log("Error" , error)
      toast.error("Error occurred while creating Task",{
        autoClose : 1000
    })
    }finally{
        // setTimeout(() => {
        //     setTitle("");
        //     setDescription("");
        //     setStatus(Status.ToDo);
        //     setPriority(Priority.Backlog);
        //     setTags("");
        //     setStartDate("");
        //     setDueDate("");
        //     setAuthorUserId("");
        //     setAssignedUserId("");
        //     setProjectId("");
        //     onClose();
        // }, 2000);        
    }
  };

  const isFormValid = () => {
    return title && authorUserId;
    // && !(id !== null || projectId)
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  
    const inputMargin = {
    marginTop : '5px',
    marginBottom : '5px'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <ToastContainer></ToastContainer>
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          style={inputMargin}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          style={inputMargin}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          style={inputMargin}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <select
            className={selectStyles}
            value={authorUserId}
            onChange={(e) => setAuthorUserId(e.target.value)}
            >
            <option value="">Select Author</option>
            {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                {user.username}
                </option>
            ))}
        </select>
        <select
            className={selectStyles}
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
            >
            <option value="">Select Assignee</option>
            {users.map((user) => (
                <option key={user.userId} value={user.userId}>
                {user.username}
                </option>
            ))}
            </select>
            {id === null && (
  <select
    className={selectStyles}
    value={projectId}
    onChange={(e) => setProjectId(e.target.value)}
  >
    <option value="">Select Project</option>
    {projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ))}
  </select>
)}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;