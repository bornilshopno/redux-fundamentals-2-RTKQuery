export interface Itask {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    priority: "High" | "Medium" | "Low";
    assignedUser:string | null;
}

export interface IUser{
    id:string;
    name:string;
}