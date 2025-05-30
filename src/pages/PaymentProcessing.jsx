import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import {Loader2, TriangleAlert} from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import Footer from "@/components/Footer.jsx";

const PaymentProcessing = () => {
    const { user, logout } = useAuth();
    const [progress, setProgress] = useState(0);
    const [canceled, setCanceled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const totalDuration = 10000;
        const interval = 100;
        const increment = (interval / totalDuration) * 100;

        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('canceled');

        const timer = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress + increment;

                if (newProgress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => navigate('/plugins?payment=success'), 1000);
                    return 100;
                }

                return newProgress;
            });
        }, interval);

        if(value === "true") {
            setCanceled(true);
            setTimeout(() => navigate('/plugins'), 8000);
            clearInterval(timer)
        }

        return () => clearInterval(timer);
    }, [navigate, canceled]);

    if(canceled) {
        return (
            <div>
                <Navbar user={user} onLogout={logout} />
                <div className="flex min-h-screen items-center justify-center bg-gray-900">
                    <Card className="w-full max-w-md border-green-200 shadow-lg">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center space-y-6 text-center">
                                <div>
                                    <TriangleAlert size={100} className="text-rose-600 mx-auto" />
                                    <h3 className="text-xl font-bold text-rose-600">Payment Canceled</h3>
                                    <p className="mt-2 text-gray-600">
                                        Your payment was canceled. You were <span className="text-rose-600 font-bold">NOT</span> charged. You will be redirected to the plugins page in a few seconds.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <Navbar user={user} onLogout={logout} />
            <div className="flex min-h-screen items-center justify-center bg-gray-900">
                <Card className="w-full max-w-md border-green-200 shadow-lg">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-6 text-center">
                            <div className="rounded-full bg-green-100 p-4">
                                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Processing your payment</h3>
                                <p className="mt-2 text-gray-600">
                                    Please wait while we complete your transaction
                                </p>
                            </div>

                            <div className="w-full space-y-2">
                                <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-6">
                                    <div
                                        className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-green-700">
                                    {progress < 100 ? 'Processing payment...' : 'Payment complete!'}
                                </p>
                            </div>

                            <div className="text-xs text-gray-500">
                                Please do not close this window
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentProcessing;