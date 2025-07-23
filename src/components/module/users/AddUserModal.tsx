import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUser } from "@/redux/features/users/userSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import type { IUser } from "@/types";
import {  useForm, type FieldValues, type SubmitHandler } from "react-hook-form";


const AddUserModal = () => {
      const form = useForm();
        const dispatch= useAppDispatch();
        const onSubmit: SubmitHandler<FieldValues> = (data) => {
            console.log(data);
            dispatch(addUser(data as IUser))
        }
    return (
         <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant='default' className="bg-green-500">Add User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add User Detail</DialogTitle>
                    
                    </DialogHeader>
                    {/* forms */}


                    <Form{...form} >

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                    

                            <DialogFooter className="mt-5">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Create User</Button>
                            </DialogFooter>
                        </form>




                    </Form>





                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddUserModal;