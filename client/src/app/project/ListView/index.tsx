'use client';

import React, { useEffect, useState } from 'react';
import { useGetTasksQuery } from '@/app/state/api';
import Header from '@/app/(components)/Header';
import { Task } from '@/app/state/types';
import TaskCard from '@/app/(components)/TaskCard';
import { ListProps } from '../types';

const List: React.FC<ListProps> = ({ id, setIsModalNewTaskOpen }) => {
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);

  // Safely parse projectId once at the top
  const projectId = typeof id === 'string' || typeof id === 'number' ? Number(id) : 0;
  const isInvalidProjectId = !id || isNaN(projectId);

  // Always call hooks unconditionally
  const {
    data: tasks,
    isLoading,
    error,
    // refetch,
    // isFetching,
    // isSuccess,
  } = useGetTasksQuery(
    { projectId },
    {
      refetchOnMountOrArgChange: true,
      skip: isInvalidProjectId
    }
  );

  useEffect(() => {
    setIsLocalLoading(false);
  }, []);

  // Conditional rendering happens here, NOT before hooks
  if (isInvalidProjectId) {
    return <div>Error: Invalid project ID</div>;
  }

  if (isLoading || isLocalLoading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  if (error) {
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
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default List;