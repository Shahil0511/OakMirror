// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    selectIsAuthenticated,
    selectRole,
} from '@/features/auth/authSlice';

interface Props {
    /** list of roles that may enter */
    allowedRoles?: string[];
    /** where to send unauthenticated users */
    redirectTo?: string;
}

export default function ProtectedRoute({
    allowedRoles,
    redirectTo = '/login',
}: Props) {
    const isAuth = useSelector(selectIsAuthenticated);
    const role = useSelector(selectRole);

    if (!isAuth) return <Navigate to={redirectTo} replace />;

    if (allowedRoles && !allowedRoles.includes(role ?? ''))
        return <Navigate to="/unauthorized" replace />;

    return <Outlet />;
}
