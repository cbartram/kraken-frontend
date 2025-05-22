import React, { useState, useEffect } from 'react';
import {
    Search,
    ArrowUpDown,
    Check,
    KeyRound,
    Coins,
    ReceiptText,
    Sparkles,
    Package,
    Cog,
    Plug,
    Box, CircleDashed, FlaskConical, DollarSign
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {discordRedirect, formatDate, isPluginExpired, reconcileSubPeriod} from "@/lib/utils.js";
import PurchasePluginDialog from "@/components/PurchasePluginDialogue.jsx";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialogue.jsx";
import ErrorDialog from "@/components/ErrorDialogue.jsx";
import PurchasePluginSuccessDialog from "@/components/PurchasePluginSuccessDialogue.jsx";
import {useNavigate} from "react-router-dom";
import FreeTrialDialogue from "@/components/FreeTrialDialogue.jsx";
import { toast } from "sonner"
import Footer from "@/components/Footer.jsx";
import BetaPluginDialog from "@/components/BetaPluginDialogue.jsx";
import SaleBanner from "@/components/SaleBanner.jsx";

const Plugins = () => {
    const { logout, user, getUser, setUser, api, loading } = useAuth()
    const navigate = useNavigate();
    const [sales, setSales] = useState({});
    const [plugins, setPlugins] = useState([]);
    const [pluginPacks, setPluginPacks] = useState([]);
    const [fullPluginList, setFullPluginList] = useState([]);
    const [fullPluginPackList, setFullPluginPackList] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("topPicks");
    const [activeTab, setActiveTab] = useState("plugins");
    const [open, setOpen] = useState(false);
    const [betaAlertOpen, setBetaAlertOpen] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorDialogueOpen, setErrorDialogueOpen] = useState(false);
    const [pluginSuccessDialogueOpen, setPluginSuccessDialogueOpen] = useState(false);
    const [freeTrialDialogueOpen, setFreeTrialDialogueOpen] = useState(false);
    const [pluginResponse, setPluginResponse] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedItem, setSelectedItem] = useState({
        name: 'temp',
        priceDetails: {
            month: 100,
            threeMonth: 100,
            year: 100,
        },
        type: 'plugin'
    });

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('payment');

        if(value === "success") {
            setSuccessAlertOpen(true);
        }

        getUser()
    }, [])

    useEffect(() => {
        if (api) {
            // Load plugins
            api.getPlugins().then(response => {
                setPlugins(response.sort((a, b) => a.title.localeCompare(b.title)));
                setFullPluginList(response.sort((a, b) => a.title.localeCompare(b.title)));
            }).catch(error => {
                console.log(error)
                console.error(`failed to load plugins from API: ${error.message}`);
            })

            // Load Sales
            api.getSales().then(response => {
                if(response.length > 0) {
                    // Note: This will only advertise the first sale if for some reason there are multiple sales at the
                    // same time.
                    setSales(response[0]);
                }
            }).catch(error => {
                console.log(error)
                console.error(`failed to load sales from API: ${error.message}`);
            })


            // Load plugin packs
            api.getPluginPacks().then(response => {
                setPluginPacks(response.sort((a, b) => a.title.localeCompare(b.title)));
                setFullPluginPackList(response.sort((a, b) => a.title.localeCompare(b.title)));
            }).catch(error => {
                console.log(error)
                console.error(`failed to load plugin packs from API: ${error.message}`);
            })
        }
    }, [api]);

    useEffect(() => {
        if (activeTab === "plugins") {
            let filteredPlugins = [...fullPluginList];

            if (search) {
                const searchLower = search.toLowerCase();
                filteredPlugins = filteredPlugins.filter(plugin =>
                    plugin.title.toLowerCase().includes(searchLower) ||
                    plugin.description.toLowerCase().includes(searchLower)
                );
            }

            switch (sortBy) {
                case "priceAsc":
                    filteredPlugins.sort((a, b) => a.priceDetails.month - b.priceDetails.month);
                    break;
                case "priceDesc":
                    filteredPlugins.sort((a, b) => b.priceDetails.month - a.priceDetails.month);
                    break;
                case "nameAsc":
                    filteredPlugins.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "nameDesc":
                    filteredPlugins.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case "topPicks":
                default:
                    filteredPlugins.sort((a, b) => {
                        if (a.isTopPick === b.isTopPick) return 0;
                        return a.isTopPick ? -1 : 1;
                    });
                    break;
            }

            setPlugins(filteredPlugins);
        } else if (activeTab === "packs") {
            let filteredPacks = [...fullPluginPackList];

            if (search) {
                const searchLower = search.toLowerCase();
                filteredPacks = filteredPacks.filter(pack =>
                    pack.title.toLowerCase().includes(searchLower) ||
                    pack.description.toLowerCase().includes(searchLower)
                );
            }

            switch (sortBy) {
                case "priceAsc":
                    filteredPacks.sort((a, b) => a.priceDetails.month - b.priceDetails.month);
                    break;
                case "priceDesc":
                    filteredPacks.sort((a, b) => b.priceDetails.month - a.priceDetails.month);
                    break;
                case "nameAsc":
                    filteredPacks.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "nameDesc":
                    filteredPacks.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case "discount":
                    filteredPacks.sort((a, b) => (b.discount || 0) - (a.discount || 0));
                    break;
                default:
                    break;
            }

            setPluginPacks(filteredPacks);
        }
    }, [search, sortBy, activeTab, fullPluginList, fullPluginPackList]);

    const showPurchaseDialogue = (item, type) => {
        if(user == null) {
            discordRedirect()
            return
        }

        setSelectedItem({...item, type})
        setOpen(true)
    }

    const showBetaDialogue = (item, type) => {
        if(user == null) {
            discordRedirect()
            return
        }

        setSelectedItem({...item, type})
        setBetaAlertOpen(true)
    }

    const handleItemPurchase = async (item, subscriptionPeriod) => {
        try {
            let res;
            if (item.type === 'plugin') {
                res = await api.purchasePlugin(item.name, subscriptionPeriod)
                user.tokens -= item.priceDetails[reconcileSubPeriod(subscriptionPeriod)];
            } else {
                res = await api.purchasePluginPack(item.name, subscriptionPeriod)
                user.tokens -= item.priceDetails[reconcileSubPeriod(subscriptionPeriod)];
            }

            setPluginResponse(res)
            setPluginSuccessDialogueOpen(true)
        } catch (error) {
            console.error(`failed to purchase ${item.type}: ${error.message}`);
            setErrorMessage(error.message)
            setErrorDialogueOpen(true);
        }
    }

    const renderPurchaseButton = (item, type) => {
        if (user == null) {
            return <Button
                onClick={() => navigate('/login')}
                className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-indigo-600 hover:bg-indigo-700 border-0 outline-none text-white"
            >
                <KeyRound className="mr-2" />
                Login to Purchase
            </Button>
        }

        let hasPurchased;
        let isExpired = false;

        if (type === 'plugin') {
            hasPurchased = user.plugins.map(p => p.name).includes(item.name);
            const ts = user.plugins.find(p => p.name === item.name);
            if(typeof ts !== "undefined") {
                isExpired = isPluginExpired(ts.expirationTimestamp);
            }
        } else {
            // For plugin packs, check if user has purchased the pack
            hasPurchased = user.pluginPacks?.map(p => p.name).includes(item.name) || false;
            const ts = user.pluginPacks?.find(p => p.name === item.name);
            if(typeof ts !== "undefined") {
                isExpired = isPluginExpired(ts.expirationTimestamp);
            }
        }

        if (hasPurchased && !isExpired) {
            return <Button
                disabled
                className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
                <Coins className="mr-2" />
                Already Owned
            </Button>
        }

        return <Button
            onClick={() => item.isInBeta ? showBetaDialogue(item,type) : showPurchaseDialogue(item, type)}
            className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
            <Coins className="mr-2" />
            Purchase
        </Button>
    }

    const renderFreeTrialButton = () => {
        if (user == null) {
            return <Button
                onClick={() => navigate("/login")}
                className="w-75 cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
                <Sparkles className="mr-2" />
                Start your 3 day Free Trial
            </Button>
        }

        if(!user.usedFreeTrial) {
            return <Button
                onClick={() => setFreeTrialDialogueOpen(true)}
                className="w-75 cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
                <Sparkles className="mr-2" />
                Start your 3 day Free Trial
            </Button>
        }

        // Weather the user is or isn't in their free trial period we know that they have already "used" their trial so
        // show them the disabled button
        return <Button
            disabled
            className="w-75 cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
            <Sparkles className="mr-2" />
            Free Trial Used
        </Button>
    }

    const renderPrice = (plugin, duration, saleDuration) => {
        if(plugin.priceDetails.month === 0 && plugin.priceDetails.threeMonth === 0 && plugin.priceDetails.year === 0) {
            return <span className="text-green-400">FREE</span>
        }

        if(plugin.saleDiscount > 0) {
            return <span className="text-orange-500 font-bold"><span className="text-white line-through">{plugin.priceDetails[duration]}</span> {plugin.priceDetails[saleDuration]} Tokens</span>
        }
        return <span className="text-white font-bold">{plugin.priceDetails[duration]} Tokens</span>
    }

    const handleFreeTrial = () => {
        api.startTrial().then((res) => {
            toast.success(`Free trial started successfully and will end on: ${formatDate(res.expires)}`)
            setUser({ ...user, usedFreeTrial: true })
        }).catch(err => {
            toast.error(`There was an issue starting your free trial. Here's what we know: ${err}`)
        })
    }

    return (
        <div className="bg-gray-900 text-gray-100">
            <Navbar onLogout={logout} user={user} onBillingSession={() => {}} loading={loading} />
            <PurchasePluginSuccessDialog isOpen={pluginSuccessDialogueOpen} onClose={() => setPluginSuccessDialogueOpen(false)} successResponse={pluginResponse} />
            <ErrorDialog isOpen={errorDialogueOpen} onClose={() => setErrorDialogueOpen(false)} message={errorMessage} />
            <PurchasePluginDialog isOpen={open} onClose={() => setOpen(false)} onPurchase={(item, subscriptionPeriod) => handleItemPurchase(item, subscriptionPeriod)} plugin={selectedItem} />
            <BetaPluginDialog isOpen={betaAlertOpen} onClose={() => setBetaAlertOpen(false)} onPurchase={(item, subscriptionPeriod) => handleItemPurchase(item, subscriptionPeriod)} plugin={selectedItem} />
            <FreeTrialDialogue isOpen={freeTrialDialogueOpen} onClose={() => setFreeTrialDialogueOpen(false)} onFreeTrialStart={() => handleFreeTrial()} />

            { /* For purchasing kraken tokens */}
            <PurchaseSuccessDialog isOpen={successAlertOpen} onClose={() => setSuccessAlertOpen(false)} />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-green-400">Kraken Plugins</h1>
                <p className="text-secondary text-center mb-4">View the full collection of available Kraken Plugins and Plugin Packs!</p>

                <SaleBanner saleData={sales} />
                <div className="flex align-middle justify-center mb-6">
                    {renderFreeTrialButton()}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 bg-gray-50">
                        <TabsTrigger
                            value="plugins"
                            className="data-[state=active]:bg-green-400 data-[state=active]:text-white cursor-pointer"
                        >
                            <Plug />
                            Individual Plugins
                        </TabsTrigger>
                        <TabsTrigger
                            value="packs"
                            className="data-[state=active]:bg-green-400 data-[state=active]:text-white cursor-pointer"
                        >
                            <Box />
                            Plugin Packs
                        </TabsTrigger>
                    </TabsList>

                    {/* Search and Filter Controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 mt-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder={activeTab === "plugins" ? "Search plugins..." : "Search plugin packs..."}
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full md:w-auto px-4 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white">
                                    <ArrowUpDown className="mr-2 h-4 w-4" />
                                    Sort by: {getSortLabel(sortBy)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {activeTab === "plugins" && (
                                    <DropdownMenuItem onClick={() => setSortBy("topPicks")}>
                                        Top Picks {sortBy === "topPicks" && <Check className="ml-2 h-4 w-4" />}
                                    </DropdownMenuItem>
                                )}
                                {activeTab === "packs" && (
                                    <DropdownMenuItem onClick={() => setSortBy("discount")}>
                                        Best Discount {sortBy === "discount" && <Check className="ml-2 h-4 w-4" />}
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => setSortBy("priceAsc")}>
                                    Price: Low to High {sortBy === "priceAsc" && <Check className="ml-2 h-4 w-4" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("priceDesc")}>
                                    Price: High to Low {sortBy === "priceDesc" && <Check className="ml-2 h-4 w-4" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("nameAsc")}>
                                    Name: A-Z {sortBy === "nameAsc" && <Check className="ml-2 h-4 w-4" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("nameDesc")}>
                                    Name: Z-A {sortBy === "nameDesc" && <Check className="ml-2 h-4 w-4" />}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <TabsContent value="plugins">
                        {/* Plugins Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {plugins.map(plugin => (
                                <div key={plugin.name} className="relative">
                                    <div
                                        className="absolute inset-0 rounded-lg bg-no-repeat bg-cover bg-center z-0 opacity-100"
                                        style={{
                                            backgroundImage: `url(${plugin.imageUrl})`,
                                            backgroundPosition: plugin.backgroundPosition || 'center',
                                    }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100 rounded-lg z-10" />

                                    <Card className="relative z-20 border-0 bg-transparent overflow-hidden">
                                        {plugin.topPick && (
                                            <div className="absolute top-0 right-0 bg-green-600/75 text-white px-3 py-1 text-xs font-bold">
                                                TOP PICK
                                            </div>
                                        )}

                                        <CardHeader className="mb-24">
                                            <CardTitle className="text-2xl text-white">
                                                    {plugin.title}

                                                {plugin.isInBeta &&
                                                    <span className="inline-flex items-center justify-items-center rounded-full mx-3 px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 mb-4">
                                                        <FlaskConical className="mr-1 h-4 w-4" />
                                                        Beta Plugin
                                                    </span>
                                                }
                                            </CardTitle>
                                            <CardDescription className="text-gray-200 min-h-24">{plugin.description}</CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex flex-col mt-12">
                                                <div className="bg-black/50 p-4 rounded-lg">
                                                    <div className="flex">
                                                        <h3 className="font-medium text-white mb-2">Subscription Options</h3>
                                                        {
                                                            plugin.saleDiscount > 0 &&
                                                            <span className="inline-flex items-center justify-items-center rounded-full mx-3 px-3 py-1 text-sm font-medium bg- bg-amber-500/20 text-amber-400 mb-4">
                                                        {plugin.saleDiscount}% OFF
                                                    </span>
                                                        }
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">1 Month</span>
                                                        {renderPrice(plugin, 'month', 'saleMonth')}
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">3 Months</span>
                                                        {renderPrice(plugin, 'threeMonth', 'saleThreeMonth')}

                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300">1 Year</span>
                                                        {renderPrice(plugin, 'year', 'saleYear')}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex flex-col">
                                            {renderPurchaseButton(plugin, 'plugin')}
                                            <Button onClick={() => navigate("/plugins/" + plugin.name)} className="bg-slate-500 hover:bg-slate-600 mt-4 w-full">
                                                <ReceiptText className="mr-2" />
                                                More Details
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {plugins.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-medium mb-2">No plugins found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="packs">
                        {/* Plugin Packs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pluginPacks.map(pack => (
                                <div key={pack.name} className="relative">
                                    <div
                                        className="absolute inset-0 rounded-lg bg-no-repeat bg-cover bg-center z-0 opacity-100"
                                        style={{
                                            backgroundImage: `url(${pack.imageUrl})`,
                                            backgroundPosition: pack.backgroundPosition || 'center',
                                    }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100 rounded-lg z-10" />

                                    <Card className="relative z-20 border-0 bg-transparent overflow-hidden">
                                        {pack.discount > 0 && (
                                            <div className="absolute top-0 right-0 bg-purple-600/75 text-white px-3 py-1 text-xs font-bold">
                                                SAVE {pack.discount}%
                                            </div>
                                        )}

                                        <CardHeader className="mb-16">
                                            <div className="flex items-center gap-2">
                                                <Package className="h-6 w-6 text-purple-400" />
                                                <CardTitle className="text-2xl text-white">{pack.title}</CardTitle>
                                            </div>
                                            <CardDescription className="text-gray-200 min-h-24">{pack.description}</CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="bg-black/50 p-4 rounded-lg mb-4">
                                                <h3 className="font-medium text-white mb-2">Included Plugins</h3>
                                                <ul className="list-disc list-inside text-gray-300">
                                                    {pack.items.map(item => (
                                                        <li key={item.id}>{item.pluginMetadata.title}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="bg-black/50 p-4 rounded-lg">
                                                    <h3 className="font-medium text-white mb-2">Subscription Options</h3>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">1 Month</span>
                                                        <span className="text-white font-bold">{pack.priceDetails.month} Tokens</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">3 Months</span>
                                                        <span className="text-white font-bold">{pack.priceDetails.threeMonth} Tokens</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300">1 Year</span>
                                                        <span className="text-white font-bold">{pack.priceDetails.year} Tokens</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex flex-col">
                                            {renderPurchaseButton(pack, 'pack')}
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {pluginPacks.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-medium mb-2">No plugin packs found</h3>
                                <p className="text-gray-500">Try adjusting your search criteria</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
};

// Helper function to get readable sort label
function getSortLabel(sortBy) {
    switch (sortBy) {
        case "priceAsc": return "Price (Low to High)";
        case "priceDesc": return "Price (High to Low)";
        case "nameAsc": return "Name (A-Z)";
        case "nameDesc": return "Name (Z-A)";
        case "topPick": return "Top Picks";
        case "discount": return "Best Discount";
        default: return "Top Picks";
    }
}

export default Plugins;