import { useState } from "react";
import { Building, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";

interface PostCardProps {
    id: string;
    title: string;
    content: string;
    postType: string;
    industry?: string;
    company?: string;
    jobTitle?: string;
    location?: string;
    tags?: string[];
    createdAt: string;
    author: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
    };
    totalComments: number;
    totalReactions: number;
}

const PostCard: React.FC<PostCardProps> = ({
    title,
    content,
    company,
    jobTitle,
    tags = [],
    totalComments,
    totalReactions,
    author,
}) => {
    const [liked, setLiked] = useState(false);
    const [currentReactions, setCurrentReactions] = useState(totalReactions);
    const [commentsCount] = useState(totalComments);

    const handleLike = () => {
        setLiked(!liked);
        setCurrentReactions((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-green-600">
                    {commentsCount} {commentsCount === 1 ? "comment" : "comments"} on this post
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>

            <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                    <Building className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                    <div className="text-sm font-medium">
                        {author ? `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim() : "Anonymous"}
                    </div>
                    <div className="text-xs text-gray-500">
                        {jobTitle && `${jobTitle}`}
                        {company && jobTitle && " at "}
                        {company && `${company}`}
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-medium mb-2">{title}</h3>

            <p className="text-sm text-gray-700 mb-4">{content}</p>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 ${liked ? "text-red-500" : "text-gray-500"} hover:text-red-500 transition-colors`}
                    >
                        <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                        <span className="text-sm">Like</span>
                    </button>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{commentsCount} Comments</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">Share</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500">{currentReactions} reactions</div>
            </div>
        </div>
    );
};

export default PostCard;
