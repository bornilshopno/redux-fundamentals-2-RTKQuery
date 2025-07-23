import { AddTaskModal } from "@/components/module/tasks/addTaskModal"
import TaskCard from "@/components/module/tasks/TaskCard"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { selectFilter, selectTask, updateFilter } from "@/redux/features/tasks/taskSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks"


export const Tasks = () => {
    const tasks = useAppSelector(selectTask)
    const filter = useAppSelector(selectFilter)
    const dispatch=useAppDispatch()
    console.log(tasks, filter)
    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-between">
                <h1>  tasks  </h1>
                <div className="flex gap-3">
                    <Tabs defaultValue="All">
                        <TabsList>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('All'))} value="All">All</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('Low'))} value="Low">Low</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('Medium'))} value="Medium">Medium</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('High'))} value="High">High</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <AddTaskModal />
                </div>
            </div>

            <div className="space-y-5 mt-5">
                {tasks?.map(task => <TaskCard task={task} key={task.id} />)}
            </div>
        </div>
    )
}
