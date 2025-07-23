import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { deleteTask, toggleCompleted } from "@/redux/features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import type { Itask } from "@/types";

import { Trash2 } from "lucide-react";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { selectUsers } from "@/redux/features/users/userSlice";


interface IProps{
    task:Itask
}

const TaskCard = ({task}:IProps) => {
    const dispatch=useAppDispatch();
    const users=useAppSelector(selectUsers)
    const assignedTaskUser= users?.find((user)=>user.id===task.assignedUser)
    console.log(assignedTaskUser)
    return (
        <div className="border px-5 py-3 rounded-md">
            <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                    <div className={cn("size-3 rounded-full",{
                        "bg-green-500" : task.priority==="Low",
                        "bg-amber-500" : task.priority==="Medium",
                        "bg-red-500" : task.priority==="High",
                    })}>
                    </div>
                 <div>
                       <h1 className={cn({"line-through": task.isCompleted})}>{task.title}</h1>
                    <h2 className="text-blue-500">Assigned to: {assignedTaskUser ? assignedTaskUser?.name : "None" } </h2>
                 </div>
                </div>
                <div className="flex gap-3 items-center">
                    <UpdateTaskModal selectedTask={task} />
                    <Button variant="link" className="p-0 text-red-500" onClick={()=>dispatch(deleteTask(task.id))}>
                        <Trash2 />
                    </Button>
                    <Checkbox onClick={()=>dispatch(toggleCompleted(task.id))} />
                </div>
            </div>
            <p className="mt-5">{task.description}</p>
        </div>
    );
};

export default TaskCard;