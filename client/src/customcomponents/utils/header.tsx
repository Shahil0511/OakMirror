import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { selectUser, selectRole, selectIsAuthenticated, logout } from "@/features/auth/authSlice";
import { Menu, X, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useAppDispatch } from "@/app/hooks";


interface HeaderProps {
    onShowAuth: () => void;   // parent passes a “show login/signup” callback
}

const Header: React.FC<HeaderProps> = ({ onShowAuth }) => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    // Get auth state using selectors
    const user = useAppSelector(selectUser);
    const role = useAppSelector(selectRole);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        window.location.reload();
    };

    const handleLogin = () => {
        if (isAuthenticated) {
            // If already authenticated, navigate to dashboard based on role
            if (role === "admin") navigate("/admin");
            else if (role === "editor") navigate("/editor");
            else navigate("/dashboard");
        } else {
            // If not authenticated, show auth modal
            onShowAuth();
        }
    };


    const navItems = [
        { name: 'Community', path: '/community', roles: ['admin', 'user'] },
        { name: 'Jobs', path: '/jobs', roles: ['admin', 'user'] },
        { name: 'Companies', path: '/company', roles: ['admin', 'user'] },
        { name: 'Salaries', path: '/salary', roles: ['admin', 'user'] },
    ];

    const filteredNavItems = navItems.filter(item =>
        item.roles.includes((role || 'guest').toLowerCase())
    );

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
            },
        },
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm"
        >
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo / Company Name */}
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg"
                    >
                        <Building2 className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                        Oak Mirror
                    </span>
                    {user && (
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2.5 py-1 rounded-full shadow-sm"
                        >
                            {role}
                        </motion.span>
                    )}
                </motion.div>

                {/* Desktop Navigation */}
                <motion.nav
                    variants={itemVariants}
                    className="hidden md:flex items-center gap-1"
                >
                    {filteredNavItems.map((item) => (
                        <motion.div
                            key={item.path}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => navigate(item.path)}
                                className="text-gray-700 hover:text-gray-900 hover:bg-white/50 px-4 py-2 rounded-lg font-medium"
                            >
                                {item.name}
                            </Button>
                        </motion.div>
                    ))}
                </motion.nav>

                {/* User Info and Auth Buttons */}
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full border border-white/20 hover:bg-white/30"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatar ?? undefined} alt={user?.firstName} />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                            {user?.firstName?.charAt(0)}
                                            {user?.lastName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                className="w-56 rounded-xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-lg"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user?.firstName} {user?.lastName}
                                    </div>
                                    <div className="text-xs text-gray-500">{user?.email}</div>
                                    <div className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mt-1">
                                        {role}
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => {
                                        if (role === "admin") navigate("/admin");
                                        else if (role === "editor") navigate("/editor");
                                        else navigate("/user");
                                    }}
                                    className="text-gray-700 hover:bg-white/80 focus:bg-white/80 cursor-pointer"
                                >
                                    Dashboard
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => navigate("/profile")}
                                    className="text-gray-700 hover:bg-white/80 focus:bg-white/80 cursor-pointer"
                                >
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:bg-white/80 focus:bg-white/80 cursor-pointer"
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            onClick={handleLogin}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                            Login
                        </Button>
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden rounded-full hover:bg-white/30"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X size={20} className="text-gray-700" />
                        ) : (
                            <Menu size={20} className="text-gray-700" />
                        )}
                    </Button>
                </motion.div>

            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="overflow-hidden md:hidden bg-white/95 backdrop-blur-xl border-t border-white/20"
                >
                    <div className="flex flex-col gap-1 px-4 py-3">
                        {filteredNavItems.map((item) => (
                            <motion.div
                                key={item.path}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full justify-start text-gray-700 hover:bg-white/80 px-4 py-3 rounded-lg"
                                >
                                    {item.name}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Header;