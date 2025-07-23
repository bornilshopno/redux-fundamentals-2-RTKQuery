import { AddTaskModal } from "@/components/module/tasks/addTaskModal"
import TaskCard from "@/components/module/tasks/TaskCard"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetTasksQuery } from "@/redux/api/baseApi"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"
import type { Itask } from "@/types"


export const Tasks = () => {
    const { isLoading, data}=useGetTasksQuery(undefined)
    console.log(isLoading, data)
    if(isLoading){
        return <h1>Data is Loadin...</h1>
    }

    // const tasks = useAppSelector(selectTask)
    // const filter = useAppSelector(selectFilter)
    const dispatch=useAppDispatch()

    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-between">
                <h1>  tasks  </h1>
                <div className="flex gap-3">
                    <Tabs defaultValue="All">
                        <TabsList>
                            <TabsTrigger  value="All">All</TabsTrigger>
                            <TabsTrigger  value="Low">Low</TabsTrigger>
                            <TabsTrigger  value="Medium">Medium</TabsTrigger>
                            <TabsTrigger  value="High">High</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <AddTaskModal />
                </div>
            </div>

            <div className="space-y-5 mt-5">
                {data.tasks?.map((task:Itask )=> <TaskCard task={task} key={task._id} />)}
            </div>
        </div>
    )
}
