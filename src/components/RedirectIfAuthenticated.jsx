import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import Navbar from "@/components/Navbar.jsx";

export const RedirectIfAuthenticated = ({ children, resource }) => {
    const { user, getUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!user) {
                try {
                    await getUser(resource);
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
    }, [getUser]);

    if (isLoading) {
        return (
            <div className="flex h-screen">
                {/* TODO Skeleton */}
            </div>
        );
    }

    // if (user && user.subscriptionStatus === "active") {
    //     return <Navigate to="/dashboard" replace />;
    // }
    //
    // if (user && user.subscriptionStatus !== "active") {
    //     return <Navigate to="/pricing" replace />;
    // }

    return children;
};