'use client'

import React, { useState } from 'react'
import { ModalNewProjectProps } from '../types';
import { useCreateProjectMutation } from '@/app/state/api';
import { formatISO } from 'date-fns';
import Modal from '@/app/(components)/Modal';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer , toast} from 'react-toastify'

const ModalNewProject : React.FC<ModalNewProjectProps> = ({isOpen , onClose}) => {
  const [createProject , {isLoading}] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    try {
        if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    const res = await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    toast.success("Project Created Successfully",{
        autoClose : 1000
    })
    } catch (error) {
       console.log("Error" , error) 
        toast.error("Failed to create Project",{
            autoClose : 1000
        })
    }finally{
        setTimeout(() => {
            setProjectName('')
            setDescription('')
            setStartDate('')
            setEndDate('')
            onClose();
        }, 2000);
    }
  };
  const isFormValid = () => {
    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none py-3";


    return (
    <>
        <Modal isOpen={isOpen} onClose={onClose} name="Create New Project" >
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
          style={{marginTop : '5px' , marginBottom : '5px'}}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          style={{marginTop : '5px' , marginBottom : '5px'}}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>

        </Modal>
    </>
  )
}

export default ModalNewProject;