import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Check } from 'lucide-react';
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
import Olm from "@/assets/olm.png"
import Cerberus from "@/assets/cerberus.png"
import Gauntlet from "@/assets/gauntlet.png"
import Hydra from "@/assets/hydra.png"
import Nightmare from "@/assets/nightmare.png"
import Timers from "@/assets/timers.png"
import Tob from "@/assets/tob.png"
import Zulrah from "@/assets/zulrah.png"

const Plugins = () => {
    // Sample plugin data
    const initialPlugins = [
        {
            id: 1,
            title: "Chambers Helper",
            description: "Tracks olm's cycle for easy skipping and simple solo's.",
            price: {
                month: 500,
                threeMonths: 1350,
                year: 4800
            },
            backgroundImage: Olm,
            isTopPick: true
        },
        {
            id: 2,
            title: "Theatre of Blood",
            description: "Utilities for tick eating, hiding entities and tracking ticks for all bosses in the Theatre of Blood.",
            price: {
                month: 650,
                threeMonths: 1750,
                year: 6240
            },
            backgroundImage: Tob,
            isTopPick: true
        },
        {
            id: 3,
            title: "Vorkath",
            description: "Highlights woox walk paths, optimal acid walk, and counts attacks.",
            price: {
                month: 450,
                threeMonths: 1215,
                year: 4320
            },
            backgroundImage: "/api/placeholder/800/200",
            isTopPick: false
        },
        {
            id: 4,
            title: "Zulrah",
            description: "Tracks Zulrah's rotation, where to stand, where to move, and what to pray.",
            price: {
                month: 550,
                threeMonths: 1485,
                year: 5280
            },
            backgroundImage: Zulrah,
            isTopPick: false
        },
        {
            id: 5,
            title: "Nightmare",
            description: "Tracks nightmare special attacks and includes a prayer helper and overlay.",
            price: {
                month: 400,
                threeMonths: 1080,
                year: 3840
            },
            backgroundImage: Nightmare,
            isTopPick: false
        },
        {
            id: 6,
            title: "Cerberus",
            description: "Tracks ghosts, cerberus attack cycle, highlights lava pools and includes prayer overlays.",
            price: {
                month: 400,
                threeMonths: 1080,
                year: 3840
            },
            backgroundImage: Cerberus,
            isTopPick: false
        },
        {
            id: 7,
            title: "Gauntlet Extended",
            description: "Tracks prayer switches, player attacks, 5:1 method, audio cue's, resource highlights and more.",
            price: {
                month: 400,
                threeMonths: 1080,
                year: 3840
            },
            backgroundImage: Gauntlet,
            isTopPick: true
        },
        {
            id: 8,
            title: "Effect Timers",
            description: "Tracks effect timers like: teleblocks, freezes, venges, imbued heart and more.",
            price: {
                month: 400,
                threeMonths: 1080,
                year: 3840
            },
            backgroundImage: Timers,
            isTopPick: false
        },
        {
            id: 9,
            title: "Alchemical Hydra",
            description: "Tracks hydra's attack cycle, prayer overlays, enrage phase prayer flicks, special attacks and more.",
            price: {
                month: 400,
                threeMonths: 1080,
                year: 3840
            },
            backgroundImage: Hydra,
            isTopPick: true
        },
    ];

    const [plugins, setPlugins] = useState(initialPlugins);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("topPicks");

    // Filter and sort plugins based on search and sort criteria
    useEffect(() => {
        let filteredPlugins = [...initialPlugins];

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filteredPlugins = filteredPlugins.filter(plugin =>
                plugin.title.toLowerCase().includes(searchLower) ||
                plugin.description.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "priceAsc":
                filteredPlugins.sort((a, b) => a.price.month - b.price.month);
                break;
            case "priceDesc":
                filteredPlugins.sort((a, b) => b.price.month - a.price.month);
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

    return (
        <div className="bg-gray-900 text-gray-100">
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-6 text-center">KrakenPlugins</h1>
                <p className="text-secondary text-center mb-4">View the collection of Kraken Plugins</p>

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
                            <Button variant="outline" className="w-full md:w-auto bg-gray-600">
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
                        <div key={plugin.id} className="relative">
                            <div
                                className="absolute inset-0 rounded-lg bg-no-repeat bg-cover z-0 opacity-100"
                                style={{ backgroundImage: `url(${plugin.backgroundImage})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100 rounded-lg z-10" />

                            <Card className="relative z-20 border-0 bg-transparent overflow-hidden">
                                {plugin.isTopPick && (
                                    <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-xs font-bold">
                                        TOP PICK
                                    </div>
                                )}

                                <CardHeader className="mb-24">
                                    <CardTitle className="text-2xl text-white">{plugin.title}</CardTitle>
                                    <CardDescription className="text-gray-200">{plugin.description}</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-col mt-12">
                                        <div className="bg-black/50 p-4 rounded-lg">
                                            <h3 className="font-medium text-white mb-2">Subscription Options</h3>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300">1 Month</span>
                                                <span className="text-white font-bold">{plugin.price.month} Kraken-Tokens</span>
                                            </div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-300">3 Months</span>
                                                <span className="text-white font-bold">{plugin.price.threeMonths} Kraken-Tokens</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300">1 Year</span>
                                                <span className="text-white font-bold">{plugin.price.year} Kraken-Tokens</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button className="w-full">Purchase Plugin</Button>
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