import { Eye, Users, X } from "lucide-react";
import { motion } from "framer-motion";

interface RightSidebarProps {
    isMobile?: boolean;
    onClose?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
    isMobile = false,
    onClose
}) => {
    const bowls = [
        {
            id: 1,
            title: "Referral and Opportunities",
            description: "A group providing referral and job opportunities for professionals.",
            members: "7L",
            color: "bg-blue-100"
        },
        {
            id: 2,
            title: "Consulting India",
            description: "A bowl for Consulting professionals working in India.",
            members: "12L",
            color: "bg-orange-100"
        },
        {
            id: 3,
            title: "Job Referrals and Openings",
            description: "Hi Fishes... This Bowl is for Job Openings and Referrals.. Post only About Openings and Job.",
            members: "5L",
            color: "bg-green-100"
        },
        {
            id: 4,
            title: "Offer Negotiations",
            description: "Help each other's to get best opportunity. Help to negotiate with wait best each one of us can get.",
            members: "4L",
            color: "bg-purple-100"
        },
        {
            id: 5,
            title: "Big 4 Discussions!",
            description: "This Bowl is for Big 4 (EY, PWC, KPMG & Deloitte) discussions! Please feel free to post your.",
            members: "2L",
            color: "bg-yellow-100"
        }
    ];

    return (
        <div className="h-full bg-white border-l border-gray-200 p-4 sm:p-6 overflow-y-auto relative">
            {/* Close Button for Mobile */}
            {isMobile && onClose && (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 z-10"
                >
                    <X className="w-5 h-5" />
                </motion.button>
            )}

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <h3 className="text-base sm:text-lg font-semibold">Oaks for you</h3>
                    <motion.button
                        whileHover={{ x: 2 }}
                        className="text-green-600 text-xs sm:text-sm hover:text-green-700 transition-colors"
                    >
                        Explore all Oaks →
                    </motion.button>
                </motion.div>

                <div className="space-y-4">
                    {bowls.map((bowl, index) => (
                        <motion.div
                            key={bowl.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.01 }}
                            className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow"
                        >
                            <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${bowl.color} rounded-full flex items-center justify-center shrink-0`}>
                                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-xs sm:text-sm mb-1 truncate">{bowl.title}</h4>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{bowl.description}</p>
                                    <div className="text-xs text-gray-500 mb-3">{bowl.members} members</div>
                                    <div className="flex space-x-2">
                                        <motion.button
                                            whileHover={{ backgroundColor: "#f3f4f6" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center space-x-1 text-xs border border-gray-300 px-2 sm:px-3 py-1 rounded transition-colors"
                                        >
                                            <Eye className="w-3 h-3" />
                                            <span>View</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ backgroundColor: "#059669" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-xs bg-green-600 text-white px-2 sm:px-3 py-1 rounded transition-colors"
                                        >
                                            Join
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};