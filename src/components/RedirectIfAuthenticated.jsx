import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import SkeletonLoading from "@/components/SkeletonLoading.jsx";

export const RedirectIfAuthenticated = ({ children }) => {
    const { user, getUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!user) {
                try {
                    await getUser();
                } catch (error) {
                    console.error("Authentication check failed:", error);
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

    if (isLoading) {
        return (
            <div className="flex h-screen">
                <SkeletonLoading />
            </div>
        );
    }

    if (user) {
        return <Navigate to="/plugins" replace />;
    }

    return children;
};