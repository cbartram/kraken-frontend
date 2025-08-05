import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Clock, Cog, ReceiptText, Sparkles} from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useParams} from "react-router-dom";
import PurchasePluginSuccessDialog from "@/components/PurchasePluginSuccessDialogue.jsx";
import ErrorDialog from "@/components/ErrorDialogue.jsx";
import PurchasePluginDialog from "@/components/PurchasePluginDialogue.jsx";
import {reconcileSubPeriod, reverseReconcileSubPeriod} from "@/lib/utils.js";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.js";
import Footer from "@/components/Footer.jsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import ReactGA from "react-ga4";

const PluginDetailPage = () => {
    const [selectedPricing, setSelectedPricing] = useState('');
    const [errorDialogueOpen, setErrorDialogueOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [pluginSuccessDialogueOpen, setPluginSuccessDialogueOpen] = useState(false);
    const [pluginResponse, setPluginResponse] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [groupedConfig, setGroupedConfig] = useState({});
    const [plugin, setPlugin] = useState({
        title: "Loading",
        thumbnail: "/api/placeholder/400/225",
        videoUrl: "https://example.com/plugin-demo",
        description: "Plugin is loading...",
        priceDetails: {
            month: 0,
            threeMonth: 0,
            year: 0,
            lifetime: 0,
        },
        configurationOptions: [
            {
                name: "Loading",
                description: "Plugin details are loading...",
                default: "In-game only"
            },
        ]
    });
    const { name } = useParams();
    const {user, logout, api } = useAuth()

    useEffect(() => {
        if (api) {
            api.getPlugin(name).then(response => {
                setPlugin(response);
                ReactGA.send({
                    hitType: 'pageview',
                    page: `/plugins/${response.title}`,
                    title: `Plugins ${response.title} Page`,
                });
            }).catch(error => {
                console.log(error)
                console.error(`failed to load plugins from API: ${error.message}`);
            })
        }
    }, [api]);

    useEffect(() => {
        if (!plugin?.configurationOptions) return;

        const grouped = plugin.configurationOptions.reduce((acc, config) => {
            const section = config.section === "" ? "General" : config.section;

            if (!acc[section]) {
                acc[section] = [];
            }

            acc[section].push(config);
            return acc;
        }, {});

        setGroupedConfig(grouped);
    }, [plugin]);

    // Get sorted section names
    const sections = Object.keys(groupedConfig).sort((a, b) => {
        if (a === "General") return -1;
        if (b === "General") return 1;
        return a.localeCompare(b);
    });

    const handlePluginPurchase = async (plugin, subscriptionPeriod) => {
        try {
            const res = await api.purchasePlugin(plugin.name, subscriptionPeriod)
            setPluginSuccessDialogueOpen(true)
            setPluginResponse(res)
            user.tokens -= plugin.priceDetails[reconcileSubPeriod(subscriptionPeriod)];
        } catch (error) {
            console.error(`failed to purchase plugin: ${error.message}`);
            setErrorMessage(error.message)
            setErrorDialogueOpen(true);
        }
    }

    const calculateSavings = (option) => {
        if (option === 'threeMonth') {
            const regularPrice = plugin.priceDetails.month * 3;
            const price = ((regularPrice - plugin.priceDetails.threeMonth) / regularPrice * 100)
            if(isNaN(price)) {
                return 0
            }
            return price.toFixed(0);
        } else if (option === 'year') {
            const regularPrice = plugin.priceDetails.month * 12;
            const price = ((regularPrice - plugin.priceDetails.year) / regularPrice * 100)

            if(isNaN(price)) {
                return 0
            }
            return price.toFixed(0);
        }
        return 0;
    };

    const getYouTubeID = (url) => {
        const regex = /https:\/\/youtu\.be\/([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const sortVersions = (a, b) => {
        let a1;
        let b1;

        a1 = a.version.split('.');
        b1 = b.version.split('.');

        const len = Math.min(a1.length, b1.length);

        for (let i = 0; i < len; i++) {
            const a2 = +a1[ i ] || 0;
            const b2 = +b1[ i ] || 0;

            if (a2 !== b2) {
                return a2 > b2 ? -1 : 1;
            }
        }

        return b1.length - a1.length;
    }

    return (
        <>
            <Navbar user={user} onLogout={logout} />
            <PurchasePluginSuccessDialog isOpen={pluginSuccessDialogueOpen} onClose={() => setPluginSuccessDialogueOpen(false)} successResponse={pluginResponse} />
            <ErrorDialog isOpen={errorDialogueOpen} onClose={() => setErrorDialogueOpen(false)} message={errorMessage} />
            <PurchasePluginDialog
                isOpen={open}
                onClose={() => setOpen(false)}
                onPurchase={(plugin, subscriptionPeriod) => handlePluginPurchase(plugin, subscriptionPeriod)}
                plugin={plugin}
                defaultSubscriptionPeriod={reverseReconcileSubPeriod(selectedPricing)}
            />
            <div className="container mx-auto py-8 px-4">
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-gray-100 hover:text-gray-400">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/plugins" className="text-gray-100 hover:text-gray-400">Plugins</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-green-400">{plugin.name} plugin</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image and Video */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="aspect-video bg-zinc-100 rounded-lg flex items-center justify-center">
                                        <iframe
                                            style={{width: '100%', height: '100%'}}
                                                src={`https://www.youtube.com/embed/${getYouTubeID(plugin.videoUrl)}`}
                                                title="YouTube video player" frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Title, Pricing and Buy Button */}
                    <div>
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-green-400 flex items-center gap-3">
                                            <img
                                                src={plugin.imageUrl}
                                                alt={plugin.title}
                                                className="w-20 h-20 object-cover rounded-lg shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                {plugin.title}
                                                {
                                                    plugin.latestVersion &&
                                                    <Badge className="rounded-full px-3 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-600 mt-1 w-fit flex items-center gap-1">
                                                        <Sparkles />
                                                        v{plugin.latestVersion}
                                                    </Badge>
                                                }
                                            </div>
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Choose your subscription</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        <Button
                                            variant={selectedPricing === 'month' ? "default" : "outline"}
                                            className={selectedPricing === 'month' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('month')}
                                        >
                                            1 Month
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'threeMonth' ? "default" : "outline"}
                                            className={selectedPricing === 'threeMonth' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('threeMonth')}
                                        >
                                            3 Months
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'year' ? "default" : "outline"}
                                            className={selectedPricing === 'year' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('year')}
                                        >
                                            1 Year
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'lifetime' ? "default" : "outline"}
                                            className={selectedPricing === 'lifetime' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('lifetime')}
                                        >
                                            Lifetime
                                        </Button>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Price:</span>
                                            <span className="text-2xl font-bold text-green-700">
                      {plugin.priceDetails[selectedPricing]} <span className="text-sm font-normal">Kraken Tokens</span>
                    </span>
                                        </div>

                                        {selectedPricing !== 'monthly' && (
                                            <div className="mt-2 text-sm text-indigo-600 font-medium">
                                                Save {calculateSavings(selectedPricing)}% compared to monthly
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button disabled={selectedPricing === '' || !user} onClick={() => setOpen(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium">
                                    Purchase Plugin
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Description and Configuration Tabs */}
                <div className="my-4">
                    <Tabs defaultValue="configuration">
                        <TabsList className="grid grid-cols-3 bg-gray-50">
                            <TabsTrigger
                                value="description"
                                className="data-[state=active]:bg-green-400 data-[state=active]:text-white"
                            >
                                <ReceiptText />
                                Description
                            </TabsTrigger>
                            <TabsTrigger
                                value="configuration"
                                className="data-[state=active]:bg-green-400 data-[state=active]:text-white"
                            >
                                <Cog />
                                Configuration Options
                            </TabsTrigger>
                            <TabsTrigger
                                value="versions"
                                className="data-[state=active]:bg-green-400 data-[state=active]:text-white"
                            >
                                <Clock />
                                Version History
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="bg-white border border-gray-200 rounded-b-lg p-6">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    {plugin.description}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="configuration" className="bg-white border border-gray-200 rounded-b-lg p-4">
                            <Accordion type="multiple" className="w-full" defaultValue={["General"]}>
                                {sections.map((section) => (
                                    <AccordionItem key={section} value={section} className="border-b">
                                        <AccordionTrigger className="py-4 text-lg font-medium text-indigo-700">
                                            {section}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="divide-y">
                                                {groupedConfig[section].map((config, index) => (
                                                    <div key={index} className="py-4">
                                                        <div className="flex items-start">
                                                            <div className="mr-4 mt-1">
                                                                <Cog size={20} className="text-indigo-600" />
                                                            </div>
                                                            <div>
                                                                <div className="flex flex-row items-center">
                                                                    <h3 className="font-medium text-lg text-green-700">{config.name}</h3>
                                                                    <Badge className={`ml-2 text-sm ${config.type === "boolean" ? 'bg-green-500/20 text-green-600' : 'bg-indigo-500/20 text-indigo-600'}`}>
                                                                        {config.type}
                                                                    </Badge>
                                                                </div>
                                                                <p className="mt-2 text-gray-600">{config.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="versions" className="bg-white border border-gray-200 rounded-b-lg p-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Version History</h3>
                                {plugin.versions && plugin.versions.length > 0 ? (
                                    <div className="space-y-3">
                                        {plugin.versions.sort(sortVersions).map((version, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                                                <div className="flex items-center gap-3">
                                                    <Badge
                                                        variant={index === 0 ? "default" : "secondary"}
                                                        className={index === 0 ? "bg-green-500 text-white" : ""}
                                                    >
                                                        v{version.version}
                                                    </Badge>
                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {`Version ${version.version}`}
                                                        </p>
                                                        {version.releaseDate && (
                                                            <p className="text-sm text-gray-600">
                                                                Released: {new Date(version.releaseDate).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {index === 0 && (
                                                    <span className="text-sm text-green-600 font-medium">Current</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No version history available</p>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PluginDetailPage;