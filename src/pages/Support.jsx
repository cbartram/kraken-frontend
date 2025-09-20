import React, {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    SlidersHorizontal,
    Bug,
    CreditCard,
    Monitor,
    MessageSquare,
    Unplug,
    Clipboard,
    ChevronRight
} from 'lucide-react';
import { useAuth } from "@/components/AuthContext.jsx";
import Navbar from "@/components/Navbar.jsx";
import { KubeApiClient } from "@/lib/api";
import Footer from "@/components/Footer.jsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Screenshot from '@/assets/screenshot.png'
import ClientLauncher from '@/assets/client_launcher_logs.png'
import RuneLiteFolder from '@/assets/runelite_folder.png';
import { Separator } from "@/components/ui/separator.js";
import ReactGA from "react-ga4";
import DiscordLogo from "@/assets/discord-mark-white.svg";
import {DISCORD_LINK} from "@/constants.jsx";


const SupportEmailForm = () => {
    const { user, logout } = useAuth();
    const kubeApi = new KubeApiClient(user);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('general');
    const [currentStep, setCurrentStep] = useState(1);

    const templates = {
        plugin_request: {
            subject: "Plugin Request: [Plugin Name]",
            message: `## Plugin Request Details

### Plugin Name/Concept:
[Enter a name or concept for the plugin]

### What should this plugin do?
[Describe the main purpose and functionality]

### Expected Features:
- [Feature 1]
- [Feature 2]
- [Feature 3]

### Similar plugins (if any):
[List any similar plugins you're aware of]

### How would this plugin benefit the community?
[Explain the value this plugin would add]`
        },
        feature_request: {
            subject: "Feature Request: [Plugin Name]",
            message: `## Feature Request for Existing Plugin

### Plugin Name:
[Enter the plugin name]

### Requested Feature:
[Describe the feature you'd like to see added]

### How would this feature improve the plugin?
[Explain the benefits of this feature]

### Current Workarounds (if any):
[Describe any temporary solutions you're using]`
        },
        bug_report: {
            subject: "Bug Report: [Plugin Name]",
            message: `## Bug Report Details

### Plugin Name:
[Enter the plugin name]

### Bug Description:
[Describe what's happening]

### Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior:
[What should happen]

### Actual Behavior:
[What actually happens]

### Client Logs:
[Paste the contents of your client.log file here]`
        },
        payment_issue: {
            subject: "Payment Issue: [Brief Description]",
            message: `## Payment Issue Details

### Issue Type:
[Failed payment, double-charge, subscription problem, etc.]

### Transaction Date:
[Date of transaction]

### Payment Method:
[Credit card, PayPal, etc.]

### Order/Transaction ID (if available):
[ID number]

### Issue Description:
[Provide details about what happened]

### Steps Already Taken:
[Describe any troubleshooting steps you've already tried]`
        },
        client_issue: {
            subject: "Client Issue: [Brief Description]",
            message: `## Client Issue Details

### Issue Description:
[Describe what's happening with the client]

### System Information:
- Operating System: [Windows/Mac/Linux + version]
- Java Version: [If known]
- RuneLite Version: [Version number]

### Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Error Messages (if any):
[Copy and paste any error messages you're seeing]

### Screenshots (if applicable):
[Please attach screenshots showing the issue]

### Client Logs:
[Paste the contents of your client.log file here]`
        },
        general: {
            subject: "",
            message: ""
        }
    };

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: "/support",
            title: "Support Page",
        });
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setSubject(templates[tabId].subject);
        setMessage(templates[tabId].message);
        setCurrentStep(1);
    };

    const handleNextStep = () => {
        setCurrentStep(prevStep => Math.min(prevStep + 1, 5));
    };

    const handlePrevStep = () => {
        setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject.trim() || !message.trim()) {
            setError('Please fill out both subject and message fields');
            return;
        }

        setStatus('loading');
        setError('');

        try {
            const res = await kubeApi.sendEmail("Support Request:", subject, message);
            console.log(res);
            setStatus('success');

            setTimeout(() => {
                setSubject('');
                setMessage('');
                setStatus('idle');
                setActiveTab('general');
                setCurrentStep(1);
            }, 3000);

        } catch (err) {
            setStatus('error');
            setError('Failed to send your message. Please try again.');
        }
    };

    const renderLogInstructions = () => {
        if (!(activeTab === 'bug_report' || activeTab === 'client_issue')) {
            return null;
        }

        return (
            <div className="space-y-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-green-100">
                    <h3 className="text-lg font-medium text-green-800 mb-2">How to Find and Attach RuneLite Logs</h3>
                    <p className="text-green-700 mb-4">
                        To help us diagnose your issue, please follow these steps to include your RuneLite logs:
                    </p>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4 items-start">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${currentStep === 1 ? 'bg-green-500' : 'bg-green-200'} text-white`}>
                                <span>1</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-md font-medium text-green-800">Open RuneLite home folder</h3>
                                <p className="text-sm text-green-700">
                                    Right-click on the <strong>Screenshot</strong> icon in the RuneLite client and select <strong>Open Screenshot Folder</strong>
                                </p>
                                <div className="bg-white shadow rounded p-3 mt-2">
                                    <img src={Screenshot} alt="Right click screenshot button" className="rounded"/>
                                </div>
                                {currentStep === 1 && (
                                    <Button
                                        className="mt-3 bg-green-500 hover:bg-green-600 text-white"
                                        onClick={handleNextStep}
                                        size="sm"
                                    >
                                        Next Step <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className={`flex gap-4 items-start ${currentStep < 2 ? 'opacity-50' : ''}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${currentStep === 2 ? 'bg-green-500' : 'bg-green-200'} text-white`}>
                                <span>2</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-md font-medium text-green-800">Open .runelite folder</h3>
                                <p className="text-sm text-green-700">
                                    In the file explorer window that opens, go back to the parent directory and click on the <strong>.runelite</strong> folder
                                </p>
                                <div className="bg-white shadow rounded p-3 mt-2">
                                    <img src={RuneLiteFolder} alt="Navigate to .runelite folder" className="rounded"/>
                                </div>
                                {currentStep === 2 && (
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                                            onClick={handlePrevStep}
                                            size="sm"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white"
                                            onClick={handleNextStep}
                                            size="sm"
                                        >
                                            Next Step <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className={`flex gap-4 items-start ${currentStep < 3 ? 'opacity-50' : ''}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${currentStep === 3 ? 'bg-green-500' : 'bg-green-200'} text-white`}>
                                <span>3</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-md font-medium text-green-800">Navigate to logs folder</h3>
                                <p className="text-sm text-green-700">
                                    Open the <strong>logs</strong> folder inside the .runelite directory
                                </p>
                                <div className="bg-white shadow rounded p-3 mt-2">
                                    <img src={ClientLauncher} alt="Open logs folder" className="rounded"/>
                                </div>
                                {currentStep === 3 && (
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                                            onClick={handlePrevStep}
                                            size="sm"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white"
                                            onClick={handleNextStep}
                                            size="sm"
                                        >
                                            Next Step <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className={`flex gap-4 items-start ${currentStep < 4 ? 'opacity-50' : ''}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${currentStep === 4 ? 'bg-green-500' : 'bg-green-200'} text-white`}>
                                <span>4</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-md font-medium text-green-800">Copy client.log contents</h3>
                                <p className="text-sm text-green-700">
                                    Open the <strong>client.log</strong> file with a text editor (like Notepad) and copy all of its contents (Ctrl+A then Ctrl+C)
                                </p>

                                {currentStep === 4 && (
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                                            onClick={handlePrevStep}
                                            size="sm"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white"
                                            onClick={handleNextStep}
                                            size="sm"
                                        >
                                            Next Step <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className={`flex gap-4 items-start ${currentStep < 5 ? 'opacity-50' : ''}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${currentStep === 5 ? 'bg-green-500' : 'bg-green-200'} text-white`}>
                                <span>5</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-md font-medium text-green-800">Paste into the form</h3>
                                <p className="text-sm text-green-700">
                                    Paste the copied log content into the "Client Logs" section of the message below
                                </p>
                                <div className="flex items-center justify-center bg-green-100 border border-green-200 rounded-lg p-6 mt-2">
                                    <div className="flex flex-col items-center text-green-600">
                                        <Clipboard className="h-12 w-12 mb-2" />
                                        <p className="text-sm font-medium">Paste logs in the message box below</p>
                                    </div>
                                </div>
                                {currentStep === 5 && (
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                                            onClick={handlePrevStep}
                                            size="sm"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white"
                                            onClick={() => setCurrentStep(1)}
                                            size="sm"
                                        >
                                            Start Over
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Separator />
            </div>
        );
    };

    return (
        <>
            <Navbar
                onLogout={logout}
                onBillingSession={() => createBillingSession(user.customerId)}
                user={user}
            />
            <div className="flex justify-center p-4">
                <Card className="w-full max-w-3xl shadow-lg py-2">
                    <CardHeader className="bg-white border-b border-gray-100">
                        <CardTitle className="text-xl font-semibold text-gray-900">Contact Support</CardTitle>
                        <CardDescription className="text-gray-500">
                            Our support team typically responds within 24 hours. Alternatively, you can join our Discord server for faster assistance.
                        </CardDescription>
                        <Button
                            onClick={() =>
                                window
                                    .open(DISCORD_LINK, "_blank")
                                    .focus()
                            }
                            className="w-50 bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5fc] text-white text-sm font-medium flex items-center gap-2 px-4 py-2 rounded"
                        >
                            <img src={DiscordLogo} height={25} width={25} alt="Discord" />
                            Join our Discord
                        </Button>
                    </CardHeader>

                    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                        <div className="px-6 pt-4">
                            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1 bg-gray-100 h-20">
                                <TabsTrigger value="general" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <MessageSquare color="oklch(79.2% 0.209 151.711)" className="h-4 w-4 " />
                                        <span>General</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="plugin_request" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <Unplug color="oklch(79.2% 0.209 151.711)" className="h-4 w-4" />
                                        <span>Plugin Request</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="feature_request" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <SlidersHorizontal color="oklch(79.2% 0.209 151.711)" className="h-4 w-4" />
                                        <span>Feature Request</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="bug_report" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <Bug className="h-4 w-4" color="oklch(79.2% 0.209 151.711)" />
                                        <span>Bug Report</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="payment_issue" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <CreditCard className="h-4 w-4" color="oklch(79.2% 0.209 151.711)" />
                                        <span>Payment Issue</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger value="client_issue" className="text-xs px-1 py-1 md:text-sm">
                                    <div className="flex flex-col items-center gap-1">
                                        <Monitor className="h-4 w-4" color="oklch(79.2% 0.209 151.711)" />
                                        <span>Client Issue</span>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="form-container">
                            <CardContent className="pt-6 space-y-4">
                                {renderLogInstructions()}

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief description of your issue"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                        disabled={status === 'loading' || status === 'success'}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Please provide details about your issue..."
                                        rows={12}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="border-gray-300 focus:border-green-400 focus:ring-green-500 resize-none mb-6 font-mono text-sm"
                                        disabled={status === 'loading' || status === 'success'}
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {status === 'success' && (
                                    <div className="flex items-center gap-2 text-green-600 text-sm">
                                        <CheckCircle2 size={16} />
                                        <span>Message sent successfully. We'll get back to you soon.</span>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
                                <div className="text-xs text-gray-500">
                                    Select a template above to pre-populate the form with relevant fields
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    className={`h-10 px-4 rounded-md font-medium ${
                                        status === 'loading' || status === 'success'
                                            ? 'bg-green-200 text-white'
                                            : 'bg-green-400 hover:bg-green-500 text-white'
                                    }`}
                                    disabled={status === 'loading' || status === 'success'}
                                >
                                    {status === 'loading' ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Sending...</span>
                                        </div>
                                    ) : status === 'success' ? (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Sent</span>
                                        </div>
                                    ) : (
                                        'Send message'
                                    )}
                                </Button>
                            </CardFooter>
                        </div>
                    </Tabs>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default SupportEmailForm;