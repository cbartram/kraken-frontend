import {useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Zulrah from '@/assets/carousel/zulrah_carousel.png'
import AkkhaOrbs from '@/assets/carousel/akkha_orbs_carousel.png'
import Gauntlet from '@/assets/carousel/gauntlet_carousel.png'
import Inferno from '@/assets/carousel/inferno_carousel.png'
import Nylo from '@/assets/carousel/nylo_carousel.png'
import Socket from '@/assets/carousel/socket_sote_carousel.png'
import Sote from '@/assets/carousel/sote_prayer_carousel.png'
import Verzik from '@/assets/carousel/verzik_yellows_carousel.png'
import Olm from '@/assets/carousel/olm_plugin.png'
import Nex from '@/assets/carousel/nex_carousel.png'
import ToaSkulls from '@/assets/carousel/toa_skulls_carousel.png'
import ToaInsanity from '@/assets/carousel/toa_insanity_carousel.png'

const pluginData = [
    {
        id: 1,
        name: "Olm Cycle Tracking",
        description: "Real-time tracking for Olms cycle so you know when to skip, when to move, and what attacks are coming next. Never miss a special skip or wonder if you are in cycle again!",
        imageUrl: Olm,
        learnMore: "/plugins/Cox-Helper"
    },
    {
        id: 2,
        name: "Gauntlet Counters",
        description: "Prayer and weapon attack counters for the corrupted and regular gauntlet. This plugin also includes tick timers for each tornado making it easy to see when they will despawn!",
        imageUrl: Gauntlet,
        learnMore: "/plugins/Gauntlet-Extended"
    },
    {
        id: 3,
        name: "Inferno Counters",
        description: "Prayer counters, Mob tick timers, safespots, and guitar hero mode for every inferno monster so you know what is hitting you when and can easily tell if mobs are off ticked. ",
        imageUrl: Inferno,
        learnMore: "/plugins/Inferno"
    },
    {
        id: 4,
        name: "Nex Highlights",
        description: "Nex Tank Highlights, step under timers, altar highlighting, blood radius markers and more make Nex an absolute breeze in 3 mans.",
        imageUrl: Nex,
        learnMore: "/plugins/Nex"
    },
    {
        id: 5,
        name: "Socket Soteseg",
        description: "Do you have buddies who use Kraken? Well Socket based plugins let you share data between your clients. Specifically this will reveal the entire safe path for the maze when you or your friends are chosen to run.",
        imageUrl: Socket,
        learnMore: "/plugins/Socket-Sotetseg"
    },
    {
        id: 6,
        name: "Theatre of Blood Nylo Indicators",
        description: "Includes utilities for highlighting Aggressive nylos so you never have to memorize the whole Nylo room!",
        imageUrl: Nylo,
        learnMore: "/plugins/Theatre-of-Blood"
    },
    {
        id: 7,
        name: "Theatre of Blood Sotetseg Prayer Indicators",
        description: "Tells you what to pray, when, and even tells you how to tick eat the green ball in Sotetseg so you don't look dumb saying \"I got this\" then tanking a 99.",
        imageUrl: Sote,
        learnMore: "/plugins/Theatre-of-Blood"
    },
    {
        id: 8,
        name: "Verzik Yellows",
        description: "Tells you how many ticks until the yellow ball hits you. The plugin has a ton of other great Verzik utilities like attack timers for when to step under, Named Nylocas for easy pops, your specific tornado highlight, and more!",
        imageUrl: Verzik,
        learnMore: "/plugins/Theatre-of-Blood"
    },
    {
        id: 9,
        name: "Tombs of Amascut Akkha Orbs",
        description: "Shows a tick counter and which orbs will safely miss your player in Akkha's final stand. Forget about wondering if that diagonal orb is going to collide with you or narrowly miss you!",
        imageUrl: AkkhaOrbs,
        learnMore: "/plugins/ToA-Extended"
    },
    {
        id: 10,
        name: "Tombs of Amascut P2 Wardens Skulls",
        description: "Shows exactly where skulls will land for P2 wardens so you can easily dodge them. You can actually look forward to the skull special now!",
        imageUrl: ToaSkulls,
        learnMore: "/plugins/ToA-Extended"
    },
    {
        id: 11,
        name: "Tombs of Amascut Insanity",
        description: "This feature automatically remembers the safe side for Insanity wardens runs. Gone are the days of having to recall if its left, right, or middle!",
        imageUrl: ToaInsanity,
        learnMore: "/plugins/ToA-Extended"
    },
    {
        id: 12,
        name: "Zulrah Rotations",
        description: "Tells you where to stand and what to pray to avoid Zulrah's attacks no matter the rotation!",
        imageUrl: Zulrah,
        learnMore: "/plugins/Zulrah"
    }
];

export default function PluginCarousel() {
    const [activePlugin, setActivePlugin] = useState(pluginData[0]);
    const [api, setApi] = useState()

    useEffect(() => {
        if(!api) {
            return
        }

        api.on("select", () => {
            setActivePlugin(pluginData[api.selectedScrollSnap()])
        })
    }, [api]);

    return (
        <section className="py-16 bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">Fan Favorite <span className="text-green-500">Features</span></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        These plugin features are loved by our users and we know you'll love them too!
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <Carousel
                        className="w-full"
                        onSelect={(index) => setActivePlugin(pluginData[index])}
                        setApi={setApi}
                    >
                        <CarouselContent>
                            {pluginData.map((plugin) => (
                                <CarouselItem key={plugin.id}>
                                    <Card className="border-0 shadow-lg overflow-hidden p-0">
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
                            <CarouselPrevious className="h-10 w-10 bg-green-500" />
                        </div>
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2">
                            <CarouselNext className="h-10 w-10 bg-green-500" />
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
                                <Button onClick={() => window.location.href = activePlugin.learnMore}>Learn More</Button>
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