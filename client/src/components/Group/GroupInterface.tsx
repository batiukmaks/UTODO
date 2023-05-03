import TaskInterface from "../Task/TaskInterface";
import GroupMemberInterface from "./GroupMemberInterface";

export default interface GroupInterface {
    id: number;
    owner_fullname: string;
    owner_id: number;
    title: string;
    description: string;
    tasks: TaskInterface[];
    members: GroupMemberInterface[];
}
