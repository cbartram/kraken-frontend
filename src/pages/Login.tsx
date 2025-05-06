// @ts-ignore
import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/assets/logo.png'
import {AlertCircle, Home} from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {discordRedirect} from "@/lib/utils";


const Login = () => {

    const [authFailedAlert, setAuthFailedAlert] = useState("")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('error');

        if(value === "auth_failed") {
            setAuthFailedAlert("Something went wrong authenticating with Discord. Please try again.")
        } else if(value == "no_user") {
            setAuthFailedAlert("Something went wrong logging you in. Please try again.")
        } else if(value == "require_auth") {
            setAuthFailedAlert("You must be logged in to access that page.")
        }
    }, []);

    // @ts-ignore
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-800">
            <div className="mb-8">
                <div className="w-48 h-48 rounded-2xl flex items-center justify-center">
                   <img src={Logo}  alt="Kraken Logo" />
                </div>
            </div>
            {
                authFailedAlert.length > 0 ?
                    <div className="mb-3">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {authFailedAlert}
                            </AlertDescription>
                        </Alert>
                    </div> : null
            }
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Login to Kraken</CardTitle>
                    <CardDescription>Manage your plugins, subscriptions, and more</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc]" onClick={discordRedirect}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                        Sign In with Discord
                    </Button>

                    <Button className="w-full bg-gray-400 mt-3" onClick={() => window.location.href = "/"}>
                        <Home />
                        Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;