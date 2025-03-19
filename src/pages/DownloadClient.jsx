import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Terminal, RotateCcw, Check, ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";

const DownloadPage = () => {
    const {user, logout} = useAuth()
    const [activeStep, setActiveStep] = useState(1);
    const [expandedSteps, setExpandedSteps] = useState({ jagex: false });

    const toggleSection = (section) => {
        setExpandedSteps(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderStepNumber = (number, isActive) => (
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {activeStep > number ? <Check className="w-5 h-5" /> : number}
        </div>
    );

    return (
        <div>
            <Navbar user={user} onlogout={logout} />
            <div className="min-h-screen">
                <div className="max-w-6xl mx-auto p-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-2 text-white">Kraken Plugins</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Enhance your gameplay with powerful plugins</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 ">
                        <div className="md:col-span-2">
                            <Card className="shadow-lg bg-gray-100">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center">
                                        <Download className="mr-2" />
                                        Download & Install Kraken Client
                                    </CardTitle>
                                    <CardDescription>
                                        Follow these simple steps to get started with Kraken Plugins
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {/* Step 1 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(1, activeStep >= 1)}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Download the latest launcher</h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Get the latest version of the Kraken launcher
                                                </p>
                                                <Button
                                                    className="mt-2 bg-green-400 hover:bg-green-500"
                                                    onClick={() => setActiveStep(2)}
                                                    size="lg"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download kraken-launcher-1.0.5.jar
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Step 2 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(2, activeStep >= 2)}
                                            <div className="space-y-2 w-full">
                                                <h3 className="text-lg font-medium">Installation instructions</h3>

                                                <Tabs defaultValue="windows" className="w-full">
                                                    <TabsList className="grid w-full grid-cols-2">
                                                        <TabsTrigger value="windows">Windows</TabsTrigger>
                                                        <TabsTrigger value="mac">Mac</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="windows" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-2">
                                                        <ol className="list-decimal pl-5 space-y-2">
                                                            <li>Navigate to <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">C:\Users\&lt;YOUR_NAME&gt;\AppData\Local\RuneLite</code></li>
                                                            <li>Rename <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code> to <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite-backup.jar</code></li>
                                                            <li>Move the downloaded <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">kraken-launcher-&lt;version&gt;.jar</code> to the same folder</li>
                                                            <li>Rename it to <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code></li>
                                                            <li>Run with <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.exe</code> or via Jagex launcher</li>
                                                        </ol>
                                                    </TabsContent>
                                                    <TabsContent value="mac" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-2">
                                                        <ol className="list-decimal pl-5 space-y-2">
                                                            <li>Navigate to your RuneLite installation folder</li>
                                                            <li>Make a backup of your current RuneLite.jar file</li>
                                                            <li>Move the downloaded kraken-launcher file to the installation folder</li>
                                                            <li>Rename it to match your original RuneLite jar file</li>
                                                            <li>Launch RuneLite as normal</li>
                                                        </ol>
                                                    </TabsContent>
                                                </Tabs>

                                                <div
                                                    className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md"
                                                >
                                                    <div
                                                        className="flex items-center justify-between cursor-pointer"
                                                        onClick={() => toggleSection('jagex')}
                                                    >
                                                        <h4 className="font-medium flex items-center">
                                                            <Terminal className="mr-2 h-4 w-4" />
                                                            Jagex Launcher & Jagex Accounts Setup
                                                        </h4>
                                                        {expandedSteps.jagex ?
                                                            <ChevronDown className="h-5 w-5" /> :
                                                            <ChevronRight className="h-5 w-5" />
                                                        }
                                                    </div>

                                                    {expandedSteps.jagex && (
                                                        <div className="mt-2 pl-2">
                                                            <ol className="list-decimal pl-5 space-y-2">
                                                                <li>For Windows, run <code className="bg-blue-100 dark:bg-blue-800 p-1 rounded">RuneLite (configure)</code> from the start menu. On Mac, pass <code className="bg-blue-100 dark:bg-blue-800 p-1 rounded">--configure</code> to the launcher.</li>
                                                                <li>In the Client arguments input box add <code className="bg-blue-100 dark:bg-blue-800 p-1 rounded">--insecure-write-credentials</code></li>
                                                                <li>Click Save</li>
                                                                <li>Launch RuneLite normally via the Jagex launcher. RuneLite will write your launcher credentials to .runelite/credentials.properties.</li>
                                                                <li>On your next launch it will use the saved credentials allowing you to use your Jagex account with Kraken plugins.</li>
                                                            </ol>
                                                            <div className="mt-4 text-sm">
                                                                <p>If you want to use a non-jagex account with Kraken you can delete the credentials.properties file to return your Kraken Client back to normal.</p>
                                                                <p className="mt-1">If for any reason you need to invalidate the credentials, you can use the "End sessions" button under account settings on runescape.com.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    onClick={() => setActiveStep(3)}
                                                    className="mt-4"
                                                >
                                                    I've completed this step
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Step 3 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(3, activeStep >= 3)}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Launch and enjoy!</h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Launch the client and start using Kraken Plugins
                                                </p>
                                                {activeStep >= 3 && (
                                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md mt-2">
                                                        <p className="flex items-center">
                                                            <Check className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                                                            You're all set! Launch RuneLite to enjoy Kraken Plugins.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Need help? Join our <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Discord community</a> or check the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">FAQs</a>.
                                    </p>
                                </CardFooter>
                            </Card>
                        </div>

                        <div>
                            <Card className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>System Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium">Minimum Requirements:</h3>
                                            <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-400">
                                                <li>Windows 10 or macOS 10.15+</li>
                                                <li>2GB RAM</li>
                                                <li>Java 11 or higher</li>
                                                <li>500MB free disk space</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Recommended:</h3>
                                            <ul className="list-disc pl-5 mt-2 text-gray-600 dark:text-gray-400">
                                                <li>Windows 11 or macOS 12+</li>
                                                <li>4GB RAM</li>
                                                <li>Java 17 or higher</li>
                                                <li>1GB free disk space</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-lg mt-6">
                                <CardHeader>
                                    <CardTitle>Restore Original Client</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        Want to switch back to the official RuneLite client? Follow these steps:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                                        <li>Navigate to the RuneLite installation folder</li>
                                        <li>Rename <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code> to something else</li>
                                        <li>Rename <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite-backup.jar</code> to <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code></li>
                                    </ol>
                                    <Button variant="outline" className="w-full mt-4" size="sm">
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Restore Original Client
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadPage;