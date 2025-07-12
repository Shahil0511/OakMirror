import { useState, useEffect } from "react";
import { Building, Briefcase } from "lucide-react";
import CreatePost from "../utils/CreatePost";
import CreatePostForm from "../../customcomponents/post/Form";
import PostCard from "../utils/PostCards";
import { postService } from "@/services/post.service";

const MainContents: React.FC = () => {
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await postService.getPosts();
                setPosts(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch posts");
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handlePostSubmit = async (postData: any) => {
        try {
            const newPost = await postService.createPost(postData);
            setPosts(prev => [newPost, ...prev]);
            setShowCreatePostForm(false);
        } catch (err) {
            console.error("Error creating post:", err);
            alert(err instanceof Error ? err.message : "Failed to create post");
        }
    };

    if (loading) return <div className="p-4 text-center">Loading posts...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    return (
        <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
            <div className="space-y-6">
                {/* Top Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <CreatePost
                        width="medium"
                        onClick={() => setShowCreatePostForm(true)}
                    />
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
                        <Briefcase className="w-5 h-5" />
                        <span>Post Job</span>
                    </button>
                </div>

                {/* Create Post Form */}
                {showCreatePostForm && (
                    <CreatePostForm
                        onClose={() => setShowCreatePostForm(false)}
                        onSubmit={handlePostSubmit}
                    />
                )}

                {/* Identity Box */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <Building className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Post as "Software Engineer"</div>
                        </div>
                    </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post._id} // or post.id if transformed
                            id={post._id}
                            title={post.title}
                            content={post.content}
                            postType={post.postType}
                            industry={post.industry}
                            company={post.company}
                            jobTitle={post.jobTitle}
                            location={post.location}
                            tags={post.tags || []}
                            createdAt={post.createdAt}
                            author={{
                                firstName: post.createdBy?.firstName || "Anonymous",
                                lastName: post.createdBy?.lastName || "",
                            }}
                            totalComments={0}
                            totalReactions={0}
                        />
                    ))}

                </div>

                {/* Motivation Footer */}
                <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-6 sm:p-8 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8">
                        <div className="text-3xl font-bold text-blue-600 mb-2 sm:mb-0">SEEKER</div>
                        <div className="text-sm text-gray-600">SUPPORT</div>
                        <div className="text-3xl font-bold text-red-500 mt-2 sm:mt-0">YOU</div>
                        <div className="text-sm text-gray-600">GOT THIS!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContents;