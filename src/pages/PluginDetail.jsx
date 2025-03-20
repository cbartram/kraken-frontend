import React, {useState} from 'react';
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
    const { name } = useParams();
    const {user, logout } = useAuth()

    const plugin = {
        title: "Enhanced Farming Timer",
        thumbnail: "/api/placeholder/400/225",
        videoUrl: "https://example.com/plugin-demo",
        description: "The Enhanced Farming Timer plugin takes RuneScape's farming to the next level with real-time growth tracking, notifications, and detailed yield predictions. Never miss a farming cycle again with customizable alerts that notify you when crops are ready for harvest. The advanced disease protection feature helps you minimize crop loss by warning you when your plants are at risk and suggesting preventative measures. Boost your farming efficiency with route optimization that calculates the quickest path between patches based on your teleport methods and inventory setup.",
        pricing: {
            monthly: 250,
            quarterly: 675,
            yearly: 2400
        },
        configuration: [
            {
                name: "Growth Notifications",
                description: "Configure when and how you receive notifications about your crop growth stages. Options include desktop notifications, in-game chat messages, or both.",
                default: "In-game only"
            },
            {
                name: "Disease Warning Threshold",
                description: "Set the risk threshold at which you'll receive warnings about potential disease. Lower values will warn you earlier but may result in more frequent notifications.",
                default: "Medium (25%)"
            },
            {
                name: "Yield Prediction Method",
                description: "Choose between conservative, balanced, or optimistic yield predictions based on your farming level, compost type, and equipment bonuses.",
                default: "Balanced"
            },
            {
                name: "Route Optimization Priority",
                description: "Prioritize routes based on speed, profit, or experience gain. This affects the suggested order of farm runs.",
                default: "Balanced (Speed/Profit)"
            }
        ]
    };

    const calculateSavings = (option) => {
        if (option === 'quarterly') {
            const regularPrice = plugin.pricing.monthly * 3;
            return ((regularPrice - plugin.pricing.quarterly) / regularPrice * 100).toFixed(0);
        } else if (option === 'yearly') {
            const regularPrice = plugin.pricing.monthly * 12;
            return ((regularPrice - plugin.pricing.yearly) / regularPrice * 100).toFixed(0);
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
                            <img
                                src={plugin.thumbnail}
                                alt={plugin.title}
                                className="w-full h-64 object-cover"
                            />
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
                                        <CardTitle className="text-2xl font-bold text-green-400">{plugin.title}</CardTitle>
                                        <CardDescription className="mt-2">
                                            <Badge className="rounded-full px-3 py-1 text-sm font-medium bg-indigo-500/20 text-indigo-600 mb-4">
                                                <Sparkles />
                                                Kraken Plugin
                                            </Badge>
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4">Choose your subscription</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            variant={selectedPricing === 'monthly' ? "default" : "outline"}
                                            className={selectedPricing === 'monthly' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('monthly')}
                                        >
                                            1 Month
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'quarterly' ? "default" : "outline"}
                                            className={selectedPricing === 'quarterly' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('quarterly')}
                                        >
                                            3 Months
                                        </Button>
                                        <Button
                                            variant={selectedPricing === 'yearly' ? "default" : "outline"}
                                            className={selectedPricing === 'yearly' ? "bg-indigo-500/20 text-indigo-600 hover:bg-indigo-500/20" : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"}
                                            onClick={() => setSelectedPricing('yearly')}
                                        >
                                            1 Year
                                        </Button>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700">Price:</span>
                                            <span className="text-2xl font-bold text-green-700">
                      {plugin.pricing[selectedPricing]} <span className="text-sm font-normal">Kraken Tokens</span>
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
                                {plugin.configuration.map((config, index) => (
                                    <div key={index} className="p-6">
                                        <div className="flex items-start">
                                            <div className="mr-4 mt-1">
                                                <Info size={20} className="text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg text-green-700">{config.name}</h3>
                                                <p className="mt-2 text-gray-600">{config.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-500">Default setting:</span>
                                                    <span className="ml-2 text-sm text-indigo-600">{config.default}</span>
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