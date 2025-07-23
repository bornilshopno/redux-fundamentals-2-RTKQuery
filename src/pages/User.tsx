import AddUserModal from "@/components/module/users/AddUserModal"
import UserCard from "@/components/module/users/userCard"
import { selectUsers } from "@/redux/features/users/userSlice"
import {  useAppSelector } from "@/redux/hooks/hooks"


export const User = () => {
    const users = useAppSelector(selectUsers)
    // const dispatch=useAppDispatch()      

  return (
     <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-between">
                <h1>  Users  </h1>
                <div className="flex gap-3">
                    {/* <Tabs defaultValue="All">
                        <TabsList>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('All'))} value="All">All</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('Low'))} value="Low">Low</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('Medium'))} value="Medium">Medium</TabsTrigger>
                            <TabsTrigger onClick={()=>dispatch(updateFilter('High'))} value="High">High</TabsTrigger>
                        </TabsList>
                    </Tabs> */}
                    <AddUserModal />
                </div>
            </div>

            <div className="space-y-5 mt-5 grid grid-cols-3 gap-5">
                {users?.map(user => <UserCard user={user} key={user.id} />)}
            </div>
        </div>
  )
}
