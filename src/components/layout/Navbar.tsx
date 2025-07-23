import { GrTasks } from "react-icons/gr";
import { Link } from "react-router";
import { ModeToggle } from "../modeToggler/modeToggle";


const Navbar = () => {
    return (
        <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3 px-5 ">
            <div className="flex items-center">
                <GrTasks /> <span className="font-bold ml-2">Task</span>Master
            </div>

            <div className="flex gap-10">
                <Link to={'/users'}>Users</Link>
                <Link to={'/tasks'}>Tasks</Link>
            </div>

            <div>
                <ModeToggle />
            </div>

        </nav>
    );
};

export default Navbar;