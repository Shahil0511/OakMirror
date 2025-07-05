import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface CreatePostProps {
    width?: "small" | "medium" | "large";
}

const sizeMap: Record<NonNullable<CreatePostProps["width"]>, string> = {
    small: "w-1/4",
    medium: "w-1/2",
    large: "w-full",
};



const CreatePost: React.FC<CreatePostProps> = ({ width = "large" }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/post")
    }
    return (
        <button
            className={`${sizeMap[width]} bg-black text-white py-2 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors`}
            onClick={handleClick}
        >
            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs sm:text-sm">Create post</span>
        </button>
    );
};

export default CreatePost;
