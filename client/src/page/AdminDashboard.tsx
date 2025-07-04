import { useState } from "react";
import Header from "@/customcomponents/utils/header";
import { AuthSection } from "@/customcomponents/Auth";

const AdminDashboard = () => {
    const [showAuth, setShowAuth] = useState(false);

    return (
        <div>
            <Header onShowAuth={() => setShowAuth(true)} />
            {showAuth && <AuthSection onBack={() => setShowAuth(false)} />}
        </div>
    );
};

export default AdminDashboard;
