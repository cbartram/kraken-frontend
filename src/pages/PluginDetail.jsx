import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Info, Sparkles} from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useParams} from "react-router-dom";

const PluginDetailPage = () => {
    const [selectedPricing, setSelectedPricing] = useState('monthly');
    const [plugin, setPlugin] = useState({
        title: "Loading",
        thumbnail: "/api/placeholder/400/225",
        videoUrl: "https://example.com/plugin-demo",
        description: "Plugin is loading...",
        priceDetails: {
            month: 0,
            threeMonth: 0,
            year: 0
        },
        configurationOptions: [
            {
                name: "Growth Notifications",
                description: "Configure when and how you receive notifications about your crop growth stages. Options include desktop notifications, in-game chat messages, or both.",
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
            }).catch(error => {
                console.log(error)
                console.error(`failed to load plugins from API: ${error.message}`);
            })
        }
    }, [api]);

    const calculateSavings = (option) => {
        if (option === 'threeMonth') {
            const regularPrice = plugin.priceDetails.month * 3;
            return ((regularPrice - plugin.priceDetails.threeMonth) / regularPrice * 100).toFixed(0);
        } else if (option === 'year') {
            const regularPrice = plugin.priceDetails.month * 12;
            return ((regularPrice - plugin.priceDetails.year) / regularPrice * 100).toFixed(0);
        }
        return 0;
    };

    return (
        <>
            <Navbar user={user} onLogout={logout} />
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Image and Video */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="aspect-video bg-zinc-100 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-zinc-500 mb-2">Plugin Video Demo</p>
                                        <Button variant="outline" className="bg-indigo-600 text-white hover:bg-indigo-700">
                                            Watch Demo
                                        </Button>
                                    </div>
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
                                                <Badge className="rounded-full px-3 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-600 mt-1 w-fit flex items-center gap-1">
                                                    <Sparkles />
                                                    Top Plugin
                                                </Badge>
                                            </div>
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Choose your subscription</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            variant={selectedPricing === 'month' ? "default" : "outline"}
                                            className={selectedPricing === 'month' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('month')}
                                        >
                                            1 Month
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'threeMonth' ? "default" : "outline"}
                                            className={selectedPricing === 'threeMonth' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('threeMonth')}
                                        >
                                            3 Months
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'year' ? "default" : "outline"}
                                            className={selectedPricing === 'year' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('year')}
                                        >
                                            1 Year
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

                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium">
                                    Purchase Plugin
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Description and Configuration Tabs */}
                <div className="my-4">
                    <Tabs defaultValue="description">
                        <TabsList className="grid grid-cols-2 bg-green-100">
                            <TabsTrigger
                                value="description"
                                className="data-[state=active]:bg-green-400 data-[state=active]:text-white"
                            >
                                Description
                            </TabsTrigger>
                            <TabsTrigger
                                value="configuration"
                                className="data-[state=active]:bg-green-400 data-[state=active]:text-white"
                            >
                                Configuration Options
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="p-6 bg-white border border-gray-200 rounded-b-lg">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed">
                                    {plugin.description}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="configuration" className="bg-white border border-gray-200 rounded-b-lg">
                            <div className="divide-y">
                                {plugin.configurationOptions.map((config, index) => (
                                    <div key={index} className="p-6">
                                        <div className="flex items-start">
                                            <div className="mr-4 mt-1">
                                                <Info size={20} className="text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg text-green-700">{config.name}</h3>
                                                <p className="mt-2 text-gray-600">{config.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-500">Type:</span>
                                                    <span className="ml-2 text-sm text-indigo-600">{config.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default PluginDetailPage;