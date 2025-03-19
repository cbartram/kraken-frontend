import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { user, getUser } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!user) {
                try {
                    await getUser();
                } catch (error) {
                    console.error("Authentication check failed:", error);
                    setAuthError(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.log('user already fetched')
                setIsLoading(false)
            }
        };

        checkAuth();
    }, []);

    if(authError) {
        return <Navigate to="/login?error=require_auth" state={{ from: location }} replace />
    }

    if (user == null && !isLoading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};