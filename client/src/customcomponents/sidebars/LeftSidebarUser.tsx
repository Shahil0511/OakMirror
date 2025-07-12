import { Building, Users, X } from "lucide-react";
import CreatePost from "../utils/CreatePost";
import { motion } from "framer-motion";

interface LeftSidebarUserProps {
    onCreatePostClick: () => void;
    onCloseSidebar?: () => void;
    isMobile?: boolean;
}

const LeftSidebarUser: React.FC<LeftSidebarUserProps> = ({
    onCreatePostClick,
    onCloseSidebar,
    isMobile = false
}) => {
    return (
        <div className="h-full bg-white border-r border-gray-200 p-4 md:p-6 overflow-y-auto relative">
            {/* Close Button for Mobile */}
            {isMobile && onCloseSidebar && (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onCloseSidebar}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-50 p-2 rounded-full hover:bg-gray-100"
                >
                    <X className="w-5 h-5" />
                </motion.button>
            )}

            <div className={`space-y-6 ${isMobile ? 'mt-12' : 'mt-0'}`}>
                {/* Post Creation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Building className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm text-gray-600">Post anonymously as</div>
                            <div className="text-xs sm:text-sm font-medium">Software Engineer</div>
                        </div>
                    </div>

                    <CreatePost width="large" onClick={onCreatePostClick} />
                </motion.div>

                {/* My Oaks Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-base sm:text-lg font-semibold mb-4">My Oaks</h3>
                    <div className="space-y-3">
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center space-x-3 p-2 md:p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                                <Building className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium">Tech India</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Explore Oaks Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border border-gray-300 py-2 md:py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
                >
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                    <span className="text-xs sm:text-sm font-medium">Explore Oaks</span>
                </motion.button>

                {/* Illustration - Hidden on mobile */}
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center py-8"
                    >
                        <div className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                            <div className="text-6xl">🎯</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LeftSidebarUser;