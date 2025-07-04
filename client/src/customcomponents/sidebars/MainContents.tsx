import { Building, MoreHorizontal, Heart, MessageCircle, Share2, Plus, Briefcase } from "lucide-react";
import { useState } from "react";

const MainContents = () => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
            <div className="space-y-6">
                {/* Action Buttons at Top */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-black text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Create Post</span>
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
                        <Briefcase className="w-5 h-5" />
                        <span>Post Job</span>
                    </button>
                </div>

                {/* Post as Software Engineer */}
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

                {/* Startup Interest Post */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Header Image */}
                    <div className="h-40 sm:h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="text-center text-white">
                                <div className="text-4xl sm:text-6xl mb-2 sm:mb-4">🚀</div>
                                <div className="text-lg sm:text-xl font-bold">Interested in Startups?</div>
                                <div className="text-xs sm:text-sm mt-1 sm:mt-2 max-w-md">
                                    We have a new bowl for you! Click through here to check out the Indian Startups community and connect with like-minded people.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-xs sm:text-sm text-green-600">2 Software Engineers commented on this post</div>
                            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
                        </div>

                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                                <Building className="w-4 h-4 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-sm font-medium">Tech India</div>
                                <div className="text-xs text-gray-500">works at IBM</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm">
                                Let's start with the Organisation- days of strict working from office & Location{' '}
                                <span className="text-blue-600 font-medium">IBM Tata Consultancy Deloitte EY</span>{' '}
                                <span className="text-blue-600 font-medium">Accenture</span>
                            </p>
                        </div>

                        {/* Engagement Section */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <div className="flex items-center space-x-4 sm:space-x-6">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`flex items-center space-x-1 sm:space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                                >
                                    <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${liked ? 'fill-current' : ''}`} />
                                    <span className="text-xs sm:text-sm">Like</span>
                                </button>
                                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500">
                                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                                    <span className="text-xs sm:text-sm">160 Comments</span>
                                </div>
                                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500">
                                    <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
                                    <span className="text-xs sm:text-sm">Share</span>
                                </div>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">53 reactions</div>
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8">
                        <div className="text-center mb-4 sm:mb-0">
                            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">SEEKER</div>
                            <div className="text-xs sm:text-sm text-gray-600">SUPPORT</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">YOU</div>
                            <div className="text-xs sm:text-sm text-gray-600">GOT THIS!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContents;