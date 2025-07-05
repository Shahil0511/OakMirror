import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthSection } from "../customcomponents/Auth";
import { HeroSection } from "../customcomponents/HeroComponents";


export default function HomePage() {
    const [showAuth, setShowAuth] = useState(false);
    const [showLanding, setShowLanding] = useState(true);

    return (
        <>
            {/* Landing Page (HeroSection) */}
            <AnimatePresence>
                {showLanding && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HeroSection
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth View */}
            <AnimatePresence>
                {showAuth && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-screen h-screen overflow-hidden flex flex-col md:flex-row"
                    >
                        {/* Background image - full screen */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
                            style={{ backgroundImage: "url('/bg.jpg')" }}
                        />

                        {/* Auth Section */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 100,
                                duration: 0.5
                            }}
                            className={`
                                absolute md:relative z-20 
                                w-full md:w-[30%] 
                                top-[35%] md:top-0 
                                h-[65%] md:h-full
                                bg-white dark:bg-gray-800 
                                rounded-t-3xl md:rounded-none
                                shadow-xl md:shadow-none
                                flex items-center justify-center 
                                p-4 md:p-8
                            `}
                        >
                            <AuthSection onBack={() => {
                                setShowAuth(false);
                                setShowLanding(true);
                            }} />
                        </motion.div>

                        {/* Mobile overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="absolute inset-0 bg-black/40 md:hidden z-10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}