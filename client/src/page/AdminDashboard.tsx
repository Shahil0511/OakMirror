import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Header from '@/customcomponents/utils/header';
import { AuthSection } from "@/customcomponents/Auth";
import LeftSidebarUser from '@/customcomponents/sidebars/LeftSidebarUser';
import MainContents from '@/customcomponents/sidebars/MainContents';
import { RightSidebar } from '@/customcomponents/sidebars/RightSidebarUser';

const Dashboard = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const [showCreatePostForm, setShowCreatePostForm] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header with mobile controls */}
            <div className="w-full sticky top-0 z-50 bg-white shadow-sm">
                <Header onShowAuth={() => setShowAuth(true)} />
            </div>

            {/* Mobile sidebar controls (floating buttons) */}
            <div className="fixed bottom-4 right-4 z-40 flex space-x-2 md:hidden">
                <button
                    onClick={() => setLeftSidebarOpen(true)}
                    className="p-3 bg-white rounded-full shadow-lg border border-gray-200"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setRightSidebarOpen(true)}
                    className="p-3 bg-white rounded-full shadow-lg border border-gray-200"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Main Layout */}
            <div className="flex flex-1 w-full">
                {/* Left Sidebar - Mobile */}
                <div className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform
                    ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:w-56 lg:w-64
                `}>
                    <div className="absolute top-2 right-2 md:hidden">
                        <button
                            onClick={() => setLeftSidebarOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <LeftSidebarUser onCreatePostClick={() => setShowCreatePostForm(true)} />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto p-4 sm:p-6">
                        <MainContents
                            showCreatePostForm={showCreatePostForm}
                            setShowCreatePostForm={setShowCreatePostForm}
                        />
                    </div>
                </div>

                {/* Right Sidebar - Mobile */}
                <div className={`
                    fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-xl transform
                    ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} 
                    transition-transform duration-300 ease-in-out
                    xl:relative xl:translate-x-0 xl:w-80
                `}>
                    <div className="absolute top-2 left-2 xl:hidden">
                        <button
                            onClick={() => setRightSidebarOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <RightSidebar />
                </div>
            </div>

            {/* Auth Modal */}
            {showAuth && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        <AuthSection onBack={() => setShowAuth(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;