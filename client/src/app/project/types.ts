import { Task as TaskTypes } from "../state/types";

export type ProjectProps = {
    params : {id : string};
}

export type ProjectHeaderProps = {
    activeTab : string;
    setActiveTab : React.Dispatch<React.SetStateAction<string>>;
}

export type TabButtonProps = {
    name: string;
    icon: React.ReactNode;
    setActiveTab: (tabName: string) => void;
    activeTab: string;
};

export type BoardProps = {
    id : string;
    setIsModalNewTaskOpen : (isOpen : boolean) => void; 
}
export type TaskProps = {
    task : TaskTypes
}

export type TaskColumnProps = {
    status: string;
    tasks: TaskTypes[];
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
  };
  export type ListProps = {
    id : string;
    setIsModalNewTaskOpen : (isOpen : boolean) => void; 
  }
export type TimeLineProps = {
    id : string;
    setIsModalNewTaskOpen : (isOpen : boolean) => void;
}

export type TableProps = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
  };
export type ModalNewProjectProps = {
    isOpen : boolean;
    onClose : () => void;
}