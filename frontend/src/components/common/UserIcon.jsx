import { FiUser } from "react-icons/fi";

const UserIcon = () => {
    return (
        <div className="flex h-7 w-7 p-1.5 ml-2 cursor-pointer items-center justify-center rounded-full bg-blue-700">
            <FiUser className="text-xl text-white" />
        </div>
    );
};

export default UserIcon;