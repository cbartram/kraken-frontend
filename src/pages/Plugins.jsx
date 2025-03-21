import React, { useState, useEffect } from 'react';
import {Search, ArrowUpDown, Check, KeyRound, Coins, ReceiptText, Sparkles} from 'lucide-react';
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
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {discordRedirect, isPluginExpired, reconcileSubPeriod} from "@/lib/utils.js";
import PurchasePluginDialog from "@/components/PurchasePluginDialogue.jsx";
import PurchaseSuccessDialog from "@/components/PurchaseSuccessDialogue.jsx";
import ErrorDialog from "@/components/ErrorDialogue.jsx";
import PurchasePluginSuccessDialog from "@/components/PurchasePluginSuccessDialogue.jsx";
import {useNavigate} from "react-router-dom";

const Plugins = () => {
    const { logout, user, getUser, api, loading } = useAuth()
    const navigate = useNavigate();
    const [plugins, setPlugins] = useState([]);
    const [fullPluginList, setFullPluginList] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("topPicks");
    const [open, setOpen] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorDialogueOpen, setErrorDialogueOpen] = useState(false);
    const [pluginSuccessDialogueOpen, setPluginSuccessDialogueOpen] = useState(false);
    const [pluginResponse, setPluginResponse] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [plugin, setPlugin] = useState({
        name: 'temp',
        priceDetails: {
            month: 100,
            threeMonth: 100,
            year: 100,
        }
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
            api.getPlugins().then(response => {
                setPlugins(response.sort((a, b) => a.title.localeCompare(b.title)));
                setFullPluginList(response.sort((a, b) => a.title.localeCompare(b.title)));
            }).catch(error => {
                console.log(error)
                console.error(`failed to load plugins from API: ${error.message}`);
            })
        }
    }, [api]);

    useEffect(() => {
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
    }, [search, sortBy]);

    const showPurchaseDialogue = (plugin) => {
        if(user == null) {
            discordRedirect()
            return
        }

        setPlugin(plugin)
        setOpen(true)
    }

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

    const renderPurchaseButton = plugin => {
        if (user == null) {
            return <Button
                onClick={() => navigate('/login')}
                className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-indigo-600 hover:bg-indigo-700 border-0 outline-none text-white"
            >
                <KeyRound />
                Login to Purchase
            </Button>
        }

        const hasPurchased =  user.plugins.map(p => p.name).includes(plugin.name)
        const ts = user.plugins.find(p => p.name === plugin.name)
        let isExpired = false;
        if(typeof ts !== "undefined") {
            isExpired = isPluginExpired(ts.expirationTimestamp)
        }


        if (hasPurchased && !isExpired) {
            return <Button
                disabled
                className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
                <Coins />
                Already Owned
            </Button>
        }

        return <Button
            onClick={() => showPurchaseDialogue(plugin)}
            className="w-full cursor-pointer h-10 px-4 rounded-md font-medium mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
            <Coins />
            Purchase
        </Button>
    }

    return (
        <div className="bg-gray-900 text-gray-100">
            <Navbar onLogout={logout} user={user} onBillingSession={() => {}} loading={loading} />
            <PurchasePluginSuccessDialog isOpen={pluginSuccessDialogueOpen} onClose={() => setPluginSuccessDialogueOpen(false)} successResponse={pluginResponse} />
            <ErrorDialog isOpen={errorDialogueOpen} onClose={() => setErrorDialogueOpen(false)} message={errorMessage} />
            <PurchasePluginDialog isOpen={open} onClose={() => setOpen(false)} onPurchase={(plugin, subscriptionPeriod) => handlePluginPurchase(plugin, subscriptionPeriod)} plugin={plugin} />

            { /* For purchasing kraken tokens */}
            <PurchaseSuccessDialog isOpen={successAlertOpen} onClose={() => setSuccessAlertOpen(false)} />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-6 text-center">Kraken Plugins</h1>
                <p className="text-secondary text-center mb-4">View the full collection of available Kraken Plugins</p>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search plugins..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto  px-4 rounded-md font-medium bg-indigo-600 hover:bg-indigo-700 text-white">
                                <ArrowUpDown className="mr-2 h-4 w-4" />
                                Sort by: {getSortLabel(sortBy)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSortBy("topPicks")}>
                                Top Picks {sortBy === "topPicks" && <Check className="ml-2 h-4 w-4" />}
                            </DropdownMenuItem>
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

                {/* Plugins Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plugins.map(plugin => (
                        <div key={plugin.name} className="relative">
                            <div
                                className="absolute inset-0 rounded-lg bg-no-repeat bg-cover z-0 opacity-100"
                                style={{ backgroundImage: `url(${plugin.imageUrl})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100 rounded-lg z-10" />

                            <Card className="relative z-20 border-0 bg-transparent overflow-hidden">
                                {plugin.topPick && (
                                    <div className="absolute top-0 right-0 bg-green-600/75 text-white px-3 py-1 text-xs font-bold">
                                        TOP PICK
                                    </div>
                                )}

                                <CardHeader className="mb-24">
                                    <CardTitle className="text-2xl text-white">{plugin.title}</CardTitle>
                                    <CardDescription className="text-gray-200 min-h-24">{plugin.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-col mt-12">
                                        <div className="bg-black/50 p-4 rounded-lg">
                                            <h3 className="font-medium text-white mb-2">Subscription Options</h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300">1 Month</span>
                                                <span className="text-white font-bold">{plugin.priceDetails.month} Tokens</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300">3 Months</span>
                                                <span className="text-white font-bold">{plugin.priceDetails.threeMonth} Tokens</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300">1 Year</span>
                                                <span className="text-white font-bold">{plugin.priceDetails.year} Tokens</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col">
                                    { renderPurchaseButton(plugin) }
                                    <Button onClick={() => navigate("/plugins/" + plugin.name)} className="bg-slate-500 hover:bg-slate-600 mt-4 w-full">
                                        <ReceiptText />
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
            </div>
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
        case "topPicks": default: return "Top Picks";
    }
}

export default Plugins;