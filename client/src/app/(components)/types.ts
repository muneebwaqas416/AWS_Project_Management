import { Task } from "../state/types"

export type HeaderProps = {
    name : string,
    buttonComponent? : any,
    isSmallText? : boolean
}

export type TaskCardProps = {
    task : Task
}

export type ModalProps = {
    children : React.ReactNode;
    isOpen : boolean;
    onClose : () => void;
    name : string;
}

export type ModalNewTaskProps = {
    isOpen: boolean;
    onClose: () => void;
    id?: string | null;
  };
  