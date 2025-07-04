import { motion } from 'framer-motion';
import { Building2, Search, ArrowRight, Star, ShieldCheck, Zap, Globe, Users, TrendingUp, Award, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Header from './utils/header';
import { AuthSection } from "@/customcomponents/Auth";

export const HeroSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showAuth, setShowAuth] = useState(false);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        const timer = setInterval(() => {
            setTime(prev => prev + 0.01);
        }, 16);

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(timer);
        };
    }, []);

    // Floating particles component
    const FloatingElements = () => {
        const elements = Array.from({ length: isMobile ? 12 : 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 4,
            duration: Math.random() * 8 + 12,
            delay: Math.random() * 4,
        }));

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {elements.map((element) => (
                    <motion.div
                        key={element.id}
                        className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm"
                        style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            width: `${element.size}px`,
                            height: `${element.size}px`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, Math.sin(time + element.id) * 30, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: element.duration,
                            delay: element.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white relative overflow-y-auto flex flex-col items-start py-12 px-4">
            {/* Add Header at the top */}
            <div className="w-full sticky top-0 z-50">
                <Header onShowAuth={() => setShowAuth(true)} />
            </div>
            {showAuth && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <AuthSection onBack={() => setShowAuth(false)} />
                </div>
            )}

            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50" />

                {!isMobile && (
                    <>
                        <motion.div
                            className="absolute inset-0 opacity-40"
                            style={{
                                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                                    rgba(59, 130, 246, 0.15) 0%, 
                                    rgba(99, 102, 241, 0.1) 25%, 
                                    transparent 50%)`
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{
                                background: [
                                    "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)"
                                ]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                )}

                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.8) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <FloatingElements />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Logo section - simplified and fixed */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="mb-6 sm:mb-8"
                    >
                        <motion.div
                            animate={
                                !isMobile ? {
                                    boxShadow: [
                                        "0 0 10px rgba(59, 130, 246, 0.1)",
                                        "0 0 15px rgba(99, 102, 241, 0.15)",
                                        "0 0 10px rgba(59, 130, 246, 0.1)"
                                    ]
                                } : {}
                            }
                            transition={{ duration: 4, repeat: Infinity }}
                            className="flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-xl px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/50 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 mx-auto"
                        >
                            <motion.div
                                animate={!isMobile ? { rotate: [0, 360] } : {}}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="p-1 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            >
                                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </motion.div>
                            <span className="font-bold text-lg sm:text-xl text-gray-800">OakMirror</span>
                            <motion.div
                                animate={!isMobile ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-blue-500"
                            >
                                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Enterprise headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight px-4"

                    >
                        <motion.span
                            className="block bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            Enterprise Intelligence
                        </motion.span>
                        <motion.span
                            className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            for Modern Workplaces
                        </motion.span>
                    </motion.h1>

                    {/* Premium subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-light leading-relaxed px-4"
                    >
                        Unlock comprehensive company insights, competitive intelligence, and strategic career opportunities through our
                        <span className="font-semibold text-blue-700"> enterprise-grade platform</span>.
                    </motion.p>

                    {/* Premium search interface */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="w-full max-w-4xl mb-8 px-4"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 10px 40px rgba(59, 130, 246, 0.1)",
                                        "0 20px 60px rgba(99, 102, 241, 0.15)",
                                        "0 10px 40px rgba(59, 130, 246, 0.1)"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative flex flex-col lg:flex-row gap-3 p-2 bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/50 shadow-2xl"
                            >
                                <div className="relative flex-1">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search companies, analyze markets, discover opportunities..."
                                        className="w-full pl-16 pr-6 py-4 lg:py-5 bg-transparent text-gray-900 placeholder-gray-500 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                                    />
                                </div>
                                <button
                                    onClick={onGetStarted}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4  rounded-xl font-bold text-lg flex items-center justify-center gap-3  "
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-6 h-6" />
                                </button>

                            </motion.div>
                        </div>

                        {/* Premium feature badges */}
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            {[
                                { icon: Star, text: "Industry Leading", color: "from-yellow-500 to-orange-500" },
                                { icon: ShieldCheck, text: "Enterprise Security", color: "from-green-500 to-emerald-500" },
                                { icon: Zap, text: "Real-time Analytics", color: "from-purple-500 to-pink-500" },
                                { icon: Lock, text: "Compliance Ready", color: "from-blue-500 to-cyan-500" }
                            ].map((feature, i) => (
                                <motion.div
                                    key={feature.text}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 + i * 0.1 }}
                                    className="group flex items-center gap-3 bg-white/70 backdrop-blur-lg px-5 py-2.5 rounded-full border border-white/50 hover:bg-white/90 transition-all duration-300"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`p-1.5 rounded-full bg-gradient-to-r ${feature.color} shadow-lg`}
                                    >
                                        <feature.icon className="w-4 h-4 text-white" />
                                    </motion.div>
                                    <span className="text-gray-700 font-medium text-sm">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Enterprise-grade stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-6xl mx-auto"
                    >
                        {[
                            { value: "Fortune 500", label: "Companies", icon: Building2, color: "from-blue-500 to-blue-600" },
                            { value: "10M+", label: "Data Points", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
                            { value: "2M+", label: "Professionals", icon: Users, color: "from-purple-500 to-purple-600" },
                            { value: "99.9%", label: "Uptime SLA", icon: Zap, color: "from-yellow-500 to-orange-500" },
                            { value: "150+", label: "Countries", icon: Globe, color: "from-cyan-500 to-blue-500" },
                            { value: "SOC 2", label: "Compliant", icon: ShieldCheck, color: "from-green-500 to-teal-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.4 + i * 0.1, duration: 0.8 }}
                                className="group relative"
                            >
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/50 text-center h-full shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                                    >
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <motion.div
                                        className="text-2xl lg:text-3xl font-black text-gray-900 mb-1"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.label}</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};