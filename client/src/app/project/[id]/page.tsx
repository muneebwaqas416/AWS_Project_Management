'use client'

import React, { useState } from 'react'
import { ProjectProps } from '../types'
import ProjectHeader from '../ProjectHeader';
import dynamic from 'next/dynamic'
import List from '../ListView';
import TimeLine from '../../timeline/page';
import TableView from '../Table';
import ModalNewTask from '@/app/(components)/ModalNewTask';

const Board = dynamic(() => import('../BoardView/index'), { 
  ssr: false,
  loading: () => <div>Loading board...</div>
})


const Project = ({params} : ProjectProps) => {
  const id = params.id
  const [activeTab, setActiveTab] = useState<string>('Board')
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false);
    return (
        <>
        {
          id && 
          <ModalNewTask
          isOpen={isModalNewTaskOpen}
          onClose={()=>setIsModalNewTaskOpen(false)}
          id={id}
        >

        </ModalNewTask>
        }
            <ProjectHeader activeTab={activeTab}  setActiveTab={setActiveTab}/>
            {
                activeTab === 'Board' && (
                    <Board
                        id={id}
                        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                    ></Board>
                )
            }
            {
              activeTab === 'List' && (
                <List
                  id={id}
                  setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                />
              )
            }
            {
              activeTab === 'Timeline' && (
                id && (
                  <TimeLine
                  id={id}
                  setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                >
                </TimeLine>
                )
              )
            }
            {
              activeTab === 'Table' && (
                <TableView
                    id={id}
                    setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                >
                </TableView>
              )
            }
            
        </>
  )
}

export default Project;