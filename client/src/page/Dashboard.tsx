import { useState } from 'react';

import Header from '@/customcomponents/utils/header';
import { AuthSection } from "@/customcomponents/Auth";



const Dashboard = () => {
    const [showAuth, setShowAuth] = useState(false);




    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Add Header at the top */}
            <div className="w-full sticky top-0 z-50">
                <Header onShowAuth={() => setShowAuth(true)} />
            </div>
            {showAuth && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <AuthSection onBack={() => setShowAuth(false)} />
                </div>
            )}


        </div>
    );
};

export default Dashboard;