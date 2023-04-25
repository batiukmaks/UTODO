import TaskInterface from "../Task/TaskInterface";

export default interface GroupInterface {
    id: number;
    owner_fullname: string;
    title: string;
    tasks: TaskInterface[];
}
