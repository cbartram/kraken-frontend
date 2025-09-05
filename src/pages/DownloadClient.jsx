import React, {useEffect, useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Download, Terminal, Check, ChevronDown, ChevronRight, Grid2X2, Command} from 'lucide-react';
import PluginEnable from '@/assets/plugin-enable.png'
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import Footer from "@/components/Footer.jsx";
import ReactGA from "react-ga4";

const DownloadPage = () => {
    const {user, logout} = useAuth()
    const [activeStep, setActiveStep] = useState(1);
    const [expandedSteps, setExpandedSteps] = useState({ jagex: false });
    const [selectedOS, setSelectedOS] = useState('windows');

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: "/download",
            title: "Download Client Page",
        });
    }, []);

    const toggleSection = (section) => {
        setExpandedSteps(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const downloadClient = (os = selectedOS) => {
        setSelectedOS(os);
        setActiveStep(3);

        if (os === 'windows') {
            window.location.href = "https://minio.kraken-plugins.com/kraken-bootstrap-static/KrakenSetup.exe"
        } else if (os === 'mac') {
            window.location.href = "https://minio.kraken-plugins.com/kraken-bootstrap-static/kraken-launcher-2.7.6.jar";
        }
    };

    const renderStepNumber = (number, isActive) => (
        <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${isActive ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-700'}`}>
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
                                                <h3 className="text-lg font-medium">Download & Install RuneLite</h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    You likely already have RuneLite installed, however, in the chance
                                                    that you don't go ahead and install RuneLite before Kraken.
                                                </p>
                                                <Button
                                                    className="mt-2 bg-zinc-200 hover:bg-zinc-300 text-orange-500"
                                                    onClick={() => open("https://runelite.net/") && setActiveStep(2)}
                                                    size="lg"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download RuneLite
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Step 2 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(2, activeStep >= 2)}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Download & Install Kraken</h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Download the Kraken Installer to install the Kraken Client.
                                                </p>
                                                <div className="flex mt-2">
                                                    <Button
                                                        className="rounded-r-none bg-green-400 hover:bg-green-500"
                                                        onClick={() => downloadClient()}
                                                        size="lg"
                                                    >
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download for {selectedOS === 'windows' ? 'Windows' : 'Mac'}
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button className="rounded-l-none border-l border-green-500 bg-green-400 hover:bg-green-500" size="lg">
                                                                <ChevronDown className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => setSelectedOS('windows')}>
                                                                Windows
                                                                <Grid2X2 />
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => setSelectedOS('mac')}>
                                                                Mac
                                                                <Command />
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Step 3 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(3, activeStep >= 3)}
                                            <div className="space-y-2 w-full">
                                                <h3 className="text-lg font-medium">Installation instructions</h3>

                                                <Tabs defaultValue="windows" className="w-full">
                                                    <TabsList className="grid w-full grid-cols-2">
                                                        <TabsTrigger value="windows"><Grid2X2 /> Windows</TabsTrigger>
                                                        <TabsTrigger value="mac"><Command /> Mac</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="windows" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-2">
                                                        <ol className="list-decimal pl-5 space-y-2">
                                                            <li>Run <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">KrakenSetup.exe</code> and follow the prompts</li>
                                                            <li>Run the client with <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.exe</code> or via the Jagex launcher</li>
                                                            <li>
                                                                Search for <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">"Kraken"</code> in your plugins and enable the "Kraken Plugins" plugin.
                                                            </li>
                                                        </ol>
                                                        <img
                                                            alt="enable-plugin"
                                                            className="mt-3 rounded-lg shadow-md bg-white dark:bg-gray-700 p-2 border border-gray-200 dark:border-gray-600"
                                                            src={PluginEnable}
                                                        />

                                                    </TabsContent>
                                                    <TabsContent value="mac" className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md mt-2">
                                                        <ol className="list-decimal pl-5 space-y-2">
                                                            <li>Navigate to your RuneLite installation folder (Right click and Show Package Contents) <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">/Applications/RuneLite/Contents.app/resources</code></li>
                                                            <li>Move the downloaded <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">Kraken-Launcher-2.7.6.jar</code> file to the installation folder</li>
                                                            <li>Delete <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code></li>
                                                            <li>Rename <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">Kraken-Launcher-2.7.6.jar</code> to <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite.jar</code></li>
                                                            <li>Launch RuneLite as normal through your Applications or the Jagex Launcher</li>
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
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    onClick={() => setActiveStep(4)}
                                                    className="mt-4"
                                                >
                                                    I've completed this step
                                                </Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Step 4 */}
                                        <div className="flex gap-4">
                                            {renderStepNumber(4, activeStep >= 4)}
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Launch and enjoy!</h3>
                                                {activeStep >= 4 && (
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
                                        Need help? Join our <a href="https://discord.gg/bbPS2AP7Cq" className="text-blue-600 dark:text-blue-400 hover:underline">Discord community</a> or check the <a href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">FAQs</a>.
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
                                                <li>75MB free disk space</li>
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
                                        <li>Press the Windows Start Key</li>
                                        <li>Type <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">RuneLite (Configure)</code> and hit enter</li>
                                        <li>Select the "RuneLite Mode" checkbox</li>
                                        <li>Click Save</li>
                                        <li>RuneLite will now run as normal without Kraken Plugins</li>
                                    </ol>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DownloadPage;