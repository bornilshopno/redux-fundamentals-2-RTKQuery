import { Button } from "@/components/ui/button";
import { removeUser } from "@/redux/features/users/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import type { IUser } from "@/types";
import { Trash2 } from "lucide-react";

interface UserProps{
        user:IUser
      }
const UserCard = ({user}:UserProps) => {
    const dispatch=useAppDispatch()
    return (
        <div className="border-green-500 border rounded-3xl flex justify-between items-center">
            <h1 className="py-5 px-10">UserName:{user.name}</h1>

            <div>
                <Button variant="link" className="p-0 text-red-500" onClick={()=>dispatch(removeUser(user.id))}>
                        <Trash2 />
                    </Button>
                    </div>         
        </div>
    );
};

export default UserCard;