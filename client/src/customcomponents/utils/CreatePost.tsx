import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface CreatePostProps {
    width?: "small" | "medium" | "large";
    onClick: () => void;
}

const sizeMap: Record<NonNullable<CreatePostProps["width"]>, string> = {
    small: "md:w-1/4",
    medium: "md:w-1/2",
    large: "md:w-full",
};

const CreatePost: React.FC<CreatePostProps> = ({ width = "large", onClick }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const role = user?.role?.toLowerCase?.() ?? "guest";

    if (!user || !["admin", "editor"].includes(role)) {
        return null;
    }

    return (
        <button
            className={`w-full ${sizeMap[width]} bg-black text-white py-3 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors`}


            onClick={onClick}
        >
            <Plus className="w-4 sm:w-5 h-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Create post</span>
        </button>
    );
};

export default CreatePost;