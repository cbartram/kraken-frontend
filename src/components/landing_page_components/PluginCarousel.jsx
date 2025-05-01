import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample plugin data - replace with your actual plugin data
const pluginData = [
    {
        id: 1,
        name: "Olm Cycle Tracking",
        description: "Real-time tracking for Olms cycle so you know when to skip, when to move, and what attacks are coming next.",
        imageUrl: "/api/placeholder/800/500"
    },
    {
        id: 2,
        name: "Gauntlet Counters",
        description: "Prayer and weapon attack counters for the Corrupted and regular gauntlet. This plugin also includes tick timers for each tornado!",
        imageUrl: "/api/placeholder/800/500"
    },
    {
        id: 3,
        name: "Inferno Counters",
        description: "Prayer counters, Mob tick timers, safespots, and guitar hero mode for every inferno monster.",
        imageUrl: "/api/placeholder/800/500"
    },
    {
        id: 4,
        name: "Nex Highlights",
        description: "Nex Tank Highlights, step under timers, altar highlighting, blood radius markers and more make Nex an absolute breeze in 3 mans.",
        imageUrl: "/api/placeholder/800/500"
    },
    {
        id: 5,
        name: "Socket Soteseg",
        description: "Do you have buddies who use Kraken? Well Socket based plugins let you share data between your clients. Specifically this will reveal the entire safe path for the maze when you or your friends are chosen to run.",
        imageUrl: "/api/placeholder/800/500"
    },
    {
        id: 6,
        name: "Socket Soteseg",
        description: "Do you have buddies who use Kraken? Well Socket based plugins let you share data between your clients. Specifically this will reveal the entire safe path for the maze when you or your friends are chosen to run.",
        imageUrl: "/api/placeholder/800/500"
    }
];

export default function PluginCarousel() {
    const [activePlugin, setActivePlugin] = useState(pluginData[0]);

    return (
        <section className="py-16 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">Fan Favorite <span className="text-green-500">Features</span></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        These plugin features are loved by our user. We know you'll love them too!
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <Carousel
                        className="w-full"
                        onSelect={(index) => setActivePlugin(pluginData[index])}
                    >
                        <CarouselContent>
                            {pluginData.map((plugin) => (
                                <CarouselItem key={plugin.id}>
                                    <Card className="border-0 shadow-lg overflow-hidden">
                                        <CardContent className="p-0">
                                            <img
                                                src={plugin.imageUrl}
                                                alt={`${plugin.name} screenshot`}
                                                className="w-full h-96 object-cover"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                            <CarouselPrevious className="h-10 w-10" />
                        </div>
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                            <CarouselNext className="h-10 w-10" />
                        </div>
                    </Carousel>

                    <div className="mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{activePlugin.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {activePlugin.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => window.location.href = "/plugins"}>Learn More</Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        {pluginData.map((plugin, index) => (
                            <div
                                key={plugin.id}
                                className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    activePlugin.id === plugin.id ? "bg-primary w-6" : "bg-gray-300"
                                }`}
                                onClick={() => setActivePlugin(plugin)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}