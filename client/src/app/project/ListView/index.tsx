'use client'

import React, { useEffect, useState } from 'react'
import { useGetTasksQuery } from '@/app/state/api';
import Header from '@/app/(components)/Header';
import { Task, Task as TaskTypes } from '@/app/state/types';
import TaskCard from '@/app/(components)/TaskCard';
import { ListProps } from '../types';

const List : React.FC<ListProps> = ({id , setIsModalNewTaskOpen}) => {
    const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);
  
    if (typeof window !== 'undefined' && !id) {
        return <div>Loading project ID...</div>;
      }
    
      const projectId = Number(id);
      if (typeof window !== 'undefined' && isNaN(projectId)) {
        return <div>Error: Invalid project ID</div>;
      }

      
    useEffect(()=>{
        setIsLocalLoading(false);
    },[])
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

      if (isLoading) {
        return <div className="p-4">Error loading tasks</div>;
      }

    return (
        <div className="px-4 pb-8 xl:px-6">
        <div className="pt-5">
          <Header
            name="List"
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
  )
}

export default List;