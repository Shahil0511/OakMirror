import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import Header from '@/customcomponents/utils/header';
import { AuthSection } from "@/customcomponents/Auth";
import LeftSidebarUser from '@/customcomponents/sidebars/LeftSidebarUser';
import MainContents from '@/customcomponents/sidebars/MainContents';
import { RightSidebar } from '@/customcomponents/sidebars/RightSidebarUser';
import { AnimatePresence, motion } from 'framer-motion';

const Dashboard = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            const desktop = window.innerWidth >= 1280;

            setIsMobile(mobile);
            setIsDesktop(desktop);

            if (!mobile) {
                setLeftSidebarOpen(true);
            } else {
                setLeftSidebarOpen(false);
            }

            if (desktop) {
                setRightSidebarOpen(true);
            } else if (mobile) {
                setRightSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleLeftSidebar = () => {
        setLeftSidebarOpen(!leftSidebarOpen);
        if (!leftSidebarOpen) {
            setRightSidebarOpen(false);
        }
    };

    const toggleRightSidebar = () => {
        setRightSidebarOpen(!rightSidebarOpen);
        if (!rightSidebarOpen) {
            setLeftSidebarOpen(false);
        }
    };

    const closeAllSidebars = () => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
                <Header onShowAuth={() => setShowAuth(true)} />
            </div>

            {/* Mobile sidebar toggle buttons */}
            {isMobile && (
                <div className="fixed bottom-4 right-4 z-90 flex space-x-2">
                    {/* Left sidebar toggle button - only shown when right sidebar is closed */}
                    {!rightSidebarOpen && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLeftSidebar}
                            className="p-3 bg-white rounded-full shadow-lg border border-gray-200"
                        >
                            {leftSidebarOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <ChevronLeft className="w-5 h-5" />
                            )}
                        </motion.button>
                    )}

                    {/* Right sidebar toggle button - only shown when left sidebar is closed */}
                    {!leftSidebarOpen && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleRightSidebar}
                            className="p-3 bg-white rounded-full shadow-lg border border-gray-200"
                        >
                            {rightSidebarOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <ChevronRight className="w-5 h-5" />
                            )}
                        </motion.button>
                    )}
                </div>
            )}

            {/* Main Layout */}
            <div className="flex flex-1 w-full relative">
                {/* Left Sidebar */}
                <AnimatePresence>
                    {leftSidebarOpen && (
                        <>
                            <motion.div
                                key="left-sidebar"
                                initial={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                                className={`${isMobile
                                    ? "fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-xl pt-16"
                                    : "relative w-64 bg-white shadow-none h-full"
                                    }`}
                            >
                                <LeftSidebarUser
                                    onCreatePostClick={() => setShowCreatePostForm(true)}
                                    onCloseSidebar={closeAllSidebars}
                                    isMobile={isMobile}
                                />
                            </motion.div>

                            {isMobile && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={closeAllSidebars}
                                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                                />
                            )}
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 sm:p-6">
                        <MainContents
                            showCreatePostForm={showCreatePostForm}
                            setShowCreatePostForm={setShowCreatePostForm}
                        />
                    </div>
                </div>

                {/* Right Sidebar */}
                <AnimatePresence>
                    {rightSidebarOpen && (
                        <>
                            <motion.div
                                key="right-sidebar"
                                initial={{ x: !isDesktop ? 300 : 0, opacity: !isDesktop ? 0 : 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: !isDesktop ? 300 : 0, opacity: !isDesktop ? 0 : 1 }}
                                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                                className={`${!isDesktop
                                    ? "fixed top-0 right-0 z-40 w-64 h-full bg-white shadow-xl pt-16"
                                    : "relative w-64 bg-white shadow-none h-full"
                                    }`}
                            >
                                <RightSidebar
                                    isMobile={!isDesktop}
                                    onClose={closeAllSidebars}
                                />
                            </motion.div>

                            {!isDesktop && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={closeAllSidebars}
                                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                                />
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Auth Modal */}
            <AnimatePresence>
                {showAuth && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-md"
                        >
                            <AuthSection onBack={() => setShowAuth(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;