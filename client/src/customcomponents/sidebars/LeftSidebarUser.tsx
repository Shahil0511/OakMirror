import { Building, Users } from "lucide-react";
import CreatePost from "../utils/CreatePost";

const LeftSidebarUser: React.FC = () => {
    return (
        <div className="w-full h-full bg-white border-r border-gray-200 p-4 md:p-6 overflow-y-auto">
            <div className="space-y-6">
                {/* Post Creation Section */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Building className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm text-gray-600">Post anonymously as</div>
                            <div className="text-xs sm:text-sm font-medium">Software Engineer</div>
                        </div>
                    </div>
                    <CreatePost width="large" />
                </div>

                {/* My Oaks Section */}
                <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-4">My Oaks</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 md:p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                                <Building className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium">Tech India</span>
                        </div>
                    </div>
                </div>

                {/* Explore Oaks Button */}
                <button className="w-full border border-gray-300 py-2 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                    <span className="text-xs sm:text-sm font-medium">Explore Oaks</span>
                </button>

                {/* Illustration - Hidden on mobile */}
                <div className="hidden md:flex justify-center py-8">
                    <div className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-6xl">🎯</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebarUser;
