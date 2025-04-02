import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    BotOff,
    ChevronDown,
    Star,
    VenetianMask,
    CloudUpload,
    Gamepad,
    BellOff,
    Wrench,
    ArrowRight, Sparkles, Package, Trophy,
} from 'lucide-react';
import Logo from "@/assets/logo.png"
import DiscordLogo from "@/assets/discord-mark-white.svg"
import {discordRedirect} from "@/lib/utils";
import {useNavigate} from "react-router-dom";
import Olm from "/olm.png";
import Tob from "/tob.png";
import Zulrah from "/zulrah.png";

export default function Landing() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeLoot, setActiveLoot] = useState(null);

    // Sample loot items
    const lootItems = [
        { id: 1, name: "Theatre of Blood", rarity: "Insane", bonus: "Settings for every boss room." },
        { id: 2, name: "Chambers of Xeric", rarity: "Overpowered", bonus: "Olm cycle tracker and room helpers." },
        { id: 3, name: "Zulrah", rarity: "Powerful", bonus: "Where to stand, what to pray, and when to move." }
    ];

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                setActiveLoot(prev => {
                    if (prev === null) return 0;
                    return (prev + 1) % lootItems.length;
                });
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isHovering, lootItems.length]);


    const plugins = [
        {
            id: 2,
            title: "Theatre of Blood",
            name: 'Theatre-of-Blood',
            description: "Utilities for tick eating, hiding entities and tracking ticks for all bosses in the Theatre of Blood.",
            price: {
                month: 500,
                threeMonths: 1000,
                year: 5000
            },
            backgroundImage: Tob,
            isTopPick: true
        },
        {
            id: 4,
            title: "Zulrah",
            name: 'Zulrah',
            description: "Tracks Zulrah's rotation, where to stand, where to move, and what to pray.",
            price: {
                month: 200,
                threeMonths: 500,
                year: 1000
            },
            backgroundImage: Zulrah,
            isTopPick: false
        },
        {
            id: 1,
            title: "Chambers Helper",
            name: 'Cox-Helper',
            description: "Tracks olm's cycle for easy skipping and simple solo's.",
            price: {
                month: 500,
                threeMonths: 1000,
                year: 5000
            },
            backgroundImage: Olm,
            isTopPick: true
        },
    ];


    // Card hover animation
    const cardVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="flex items-center gap-2"
                    >
                        <img src={Logo} height={50} width={50} />
                        <span className="text-xl font-bold text-green-500">Kraken Plugins</span>
                    </motion.div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsNavOpen(!isNavOpen)}
                        >
                            <ChevronDown className={`h-6 w-6 transition-transform ${isNavOpen ? 'rotate-180' : ''}`}/>
                        </Button>
                    </div>

                    {/* Desktop navigation */}
                    <ul className="hidden md:flex items-center space-x-6">
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="/download" className="hover:text-green-500 text-green-400 transition-colors">Download Client</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#features" className="hover:text-green-500 text-green-400 transition-colors">Features</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="/plugins" className="hover:text-green-500 transition-colors">Plugins</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#testimonials" className="hover:text-green-500 transition-colors">Testimonials</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#pricing" className="hover:text-green-500 transition-colors">Pricing</a>
                        </motion.li>
                        <motion.li whileTap={{scale: 0.95}}>
                            <Button onClick={() => discordRedirect()} className="bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white text-sm font-medium">
                                <img src={DiscordLogo} height={25} width={25} />
                                Sign In with Discord
                            </Button>
                        </motion.li>
                    </ul>
                </div>

                {/* Mobile navigation */}
                {isNavOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden border-t border-gray-700"
                    >
                        <ul className="flex flex-col items-center py-4 space-y-4">
                            <li><a href="#features" className="hover:text-green-500 transition-colors">Features</a>
                            </li>
                            <li><a href="#plugins" className="hover:text-green-500 transition-colors">Plugins</a></li>
                            <li><a href="#testimonials"
                                   className="hover:text-green-500 transition-colors">Testimonials</a></li>
                            <li><a href="#pricing" className="hover:text-green-500 transition-colors">Pricing</a></li>
                            <li>
                                <Button className="bg-green-500 hover:bg-green-600 text-black w-full" onClick={() => navigate('/plugins')}>
                                    Browse Plugins
                                </Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="w-full bg-gradient-to-br from-indigo-900 to-indigo-700 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
                    {/* Background particle effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-green-400 rounded-full opacity-20"
                                initial={{
                                    x: Math.random() * 100 - 50,
                                    y: Math.random() * 100 - 50,
                                    scale: Math.random() * 0.5 + 0.5
                                }}
                                animate={{
                                    x: Math.random() * 200 - 100,
                                    y: Math.random() * 200 - 100,
                                    scale: Math.random() * 1 + 0.5,
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 8 + Math.random() * 10,
                                    ease: "easeInOut",
                                    repeatType: "reverse"
                                }}
                                style={{
                                    width: `${Math.random() * 40 + 10}px`,
                                    height: `${Math.random() * 40 + 10}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                            />
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        {/* Content Section */}
                        <div className="flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 mb-4">
                                <Sparkles className="mr-1 h-4 w-4" />
                                Game Easy
                              </span>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                    Level Up with <span className="text-green-400">Kraken</span> Plugins
                                </h1>

                                <p className="text-indigo-200 text-lg mb-8">
                                    Transform your Old School RuneScape experience with custom plugins designed to maximize your loot potential and create an unmatched gaming experience.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button onClick={() => navigate("/login")} className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg shadow-green-600/20">
                                        Get Started with a Free Trial
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>

                                    <Button onClick={() => navigate("/plugins")} variant="outline" className="border-indigo-300 bg-indigo-500 text-indigo-100  hover:text-indigo-100 hover:bg-indigo-600 rounded-lg flex items-center gap-2">
                                        View Plugins
                                        <Package className="h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Interactive Loot Showcase */}
                        <div className="flex items-center justify-center">
                            <motion.div
                                className="relative w-full max-w-md"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-indigo-500/20 rounded-full blur-3xl" />

                                <motion.div
                                    className="relative bg-indigo-800/60 backdrop-blur-sm border border-indigo-500/30 p-8 rounded-2xl shadow-xl"
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)"
                                    }}
                                    onHoverStart={() => setIsHovering(true)}
                                    onHoverEnd={() => setIsHovering(false)}
                                >
                                    <div className="absolute -right-3 -top-3">
                                        <motion.div
                                            className="bg-green-200 rounded-full p-2 shadow-lg"
                                            animate={{
                                                rotate: [0, 10, 0, -10, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatType: "loop"
                                            }}
                                        >
                                            <img src={Logo} height={25} width={25} alt="Logo" />
                                        </motion.div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                                        <Trophy className="mr-2 h-6 w-6 text-green-400" />
                                        Kraken Plugins
                                    </h3>

                                    <p className="text-indigo-200 mb-6">
                                        Our plugins provide overpowered insights into the game <span className="font-bold">without</span> modifying RuneLite.
                                    </p>

                                    <div className="space-y-4">
                                        {lootItems.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                className={`p-4 rounded-lg border ${
                                                    activeLoot === index
                                                        ? 'bg-green-500/20 border-green-500'
                                                        : 'bg-indigo-700/40 border-indigo-600/50'
                                                }`}
                                                animate={{
                                                    scale: activeLoot === index ? 1.05 : 1,
                                                    y: activeLoot === index ? -5 : 0
                                                }}
                                                onClick={() => setActiveLoot(index)}
                                                whileHover={{ scale: 1.03 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-white">{item.name}</span>
                                                    <span className={`text-sm px-2 py-1 rounded ${
                                                        item.rarity === "Insane" ? "bg-orange-500/20 text-orange-300" :
                                                            item.rarity === "Overpowered" ? "bg-purple-500/20 text-purple-300" :
                                                                "bg-blue-500/20 text-blue-300"
                                                    }`}>
                          {item.rarity}
                        </span>
                                                </div>
                                                <div className="text-green-300 text-sm mt-1">{item.bonus}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                            className="text-3xl md:text-4xl font-bold mb-4"
                        >
                            Why Choose Our <span className="text-green-500">Premium Plugins</span>
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                            viewport={{once: true}}
                            className="text-gray-300 max-w-2xl mx-auto"
                        >
                            Our plugins are meticulously crafted by experienced engineers to provide unparalleled
                            advantages in game.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BotOff className="h-12 w-12 text-green-500"/>,
                                title: "No plugin automation",
                                description: "None of our plugins are \"bots\". They assist you with additional in game information using RuneLite\'s official un-modified API.",
                            },
                            {
                                icon: <VenetianMask className="h-12 w-12 text-green-500"/>,
                                title: "Incognito Client",
                                description: "The Kraken client doesn't modify RuneLite in any way, sideloading all the plugins during runtime. Plugins run the exact same way as any normal plugin installed through the Plugin Hub. This makes Kraken & its plugins nearly impossible to detect."
                            },
                            {
                                icon: <CloudUpload className="h-12 w-12 text-green-500"/>,
                                title: "Regular Updates",
                                description: "Frequent, automatic updates ensure compatibility with the latest RuneLite and OSRS versions and are applied instantly to your client."
                            },
                            {
                                icon: <Gamepad className="h-12 w-12 text-green-500"/>,
                                title: "RuneLite Mode",
                                description: "Want to run RuneLite without any Kraken plugins? With RuneLite mode it's as easy as clicking a button!"
                            },
                            {
                                icon: <BellOff className="h-12 w-12 text-green-500"/>,
                                title: "Quiet Plugins",
                                description: "All our plugins are \"quiet\". Meaning, they assist you with tasks in game without any actual automation or input. This allows them to run silently just like a RuneLite plugin you would get from the PluginHub."
                            },
                            {
                                icon: <Wrench className="h-12 w-12 text-green-500"/>,
                                title: "Expertly Engineered",
                                description: "Our plugins are battle tested to make sure they work under any condition."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                whileHover={{y: -5}}
                                className="bg-gray-700 p-6 rounded-lg border border-gray-600"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plugins Section */}
            <section id="plugins" className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Our <span className="text-green-500">Premium Plugins</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Browse our selection of carefully crafted plugins designed to enhance your RuneScape
                            experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plugins.map((plugin) => (
                            <motion.div
                                key={plugin.id}
                                variants={cardVariants}
                                whileHover="hover"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                viewport={{once: true}}
                            >
                                <div key={plugin.id} className="relative">
                                    <div
                                        className="absolute inset-0 rounded-lg bg-no-repeat bg-cover z-0 opacity-100"
                                        style={{ backgroundImage: `url(${plugin.backgroundImage})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100 rounded-lg z-10" />

                                    <Card className="relative z-20 border-0 bg-transparent overflow-hidden">
                                        <CardHeader className="mb-24">
                                            <CardTitle className="text-2xl text-white">{plugin.title}</CardTitle>
                                            <CardDescription className="text-gray-200 min-h-24">{plugin.description}</CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex flex-col mt-12">
                                                <div className="bg-black/50 p-4 rounded-lg">
                                                    <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 mb-4">
                                                        <Sparkles className="mr-1 h-4 w-4" />
                                                        Top Plugin
                                                    </span>
                                                    <h3 className="font-medium text-white mb-2">Subscription Options</h3>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">1 Month</span>
                                                        <span className="text-white font-bold">{plugin.price.month} Tokens</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-gray-300">3 Months</span>
                                                        <span className="text-white font-bold">{plugin.price.threeMonths} Tokens</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300">1 Year</span>
                                                        <span className="text-white font-bold">{plugin.price.year} Tokens</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        <Button className="bg-green-500 hover:bg-green-600 text-black text-lg px-8 py-6" onClick={() => navigate('/plugins')}>
                            View All Plugins
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Our <span className="text-green-500">Users Say</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Join hundreds of satisfied RuneScape players who have enhanced their gameplay with our
                            premium plugins.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "PkMaster99",
                                role: "PvP Specialist",
                                content: "The Effect Timers plugin completely changed my PvP game. The real-time suggestions and visual cues have improved my KD ratio significantly.",
                                rating: 5
                            },
                            {
                                name: "IronBTW",
                                role: "Ironman Player",
                                content: "As an Ironman, efficiency is everything. The Chambers plugin saved me countless hours of grinding in solos. Worth every gold piece!",
                                rating: 5
                            },
                            {
                                name: "MaxedMain",
                                role: "Completionist",
                                content: "I've tried many plugin suites, but this collection offers the best balance of features without breaking the bank. The ToB plugin is my personal favorite.",
                                rating: 4
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                whileHover={{y: -5}}
                            >
                                <Card className="bg-gray-700 border-gray-600 h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-gray-300">{testimonial.name}</CardTitle>
                                                <CardDescription
                                                    className="text-gray-400">{testimonial.role}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-300">{testimonial.content}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-green-500 text-green-500"/>
                                            ))}
                                            {[...Array(5 - testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 text-gray-500"/>
                                            ))}
                                        </div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Simple plugin pricing with <span className="text-green-500">Kraken Tokens</span>
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Purchase Kraken Tokens and use them to subscribe to our plugins. Choose the plugin and subscription length that fits your gameplay needs. You
                            can also get started today with a <span className="text-green-400 font-bold">3 day</span> day free trial!
                        </p>
                    </motion.div>

                    {/* Flow Diagram */}
                    <div className="flex flex-col items-center mb-16">
                        <motion.div
                            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.7}}
                            viewport={{once: true}}
                        >
                            {/* Step 1 */}
                            <motion.div
                                className="bg-gray-800 p-6 rounded-lg text-center w-full md:w-64"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-500 text-2xl font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Purchase Tokens</h3>
                                <p className="text-gray-400">Buy Kraken Tokens with your preferred payment method. Starting at just $1.99</p>
                            </motion.div>

                            {/* Arrow */}
                            <div className="hidden md:block">
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <ArrowRight size={36} className="text-green-500" />
                                </motion.div>
                            </div>
                            <div className="block md:hidden my-4">
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-green-500">
                                        <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Step 2 */}
                            <motion.div
                                className="bg-gray-800 p-6 rounded-lg text-center w-full md:w-64"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-500 text-2xl font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Choose Plan</h3>
                                <p className="text-gray-400">Select your preferred subscription length for plugins: 1mo, 3mo, 12mo</p>
                            </motion.div>

                            {/* Arrow */}
                            <div className="hidden md:block">
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <ArrowRight size={36} className="text-green-500" />
                                </motion.div>
                            </div>
                            <div className="block md:hidden my-4">
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-green-500">
                                        <path d="M12 5v14m0 0l-7-7m7 7l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Step 3 */}
                            <motion.div
                                className="bg-gray-800 p-6 rounded-lg text-center w-full md:w-64"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green-500 text-2xl font-bold">3</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Enjoy Plugins</h3>
                                <p className="text-gray-400">Access your premium plugin in the Kraken client instantly after purchase</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-br from-green-300 to-green-600 text-black">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        viewport={{once: true}}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Ready to Transform Your RuneScape Experience?
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.1}}
                        viewport={{once: true}}
                        className="text-xl max-w-2xl mx-auto mb-10"
                    >
                        Join thousands of players who have already upgraded their gameplay with our premium plugins.
                    </motion.p>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                        viewport={{once: true}}
                    >
                        <Button onClick={() => discordRedirect()} className="bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white p-6 text-sm font-medium">
                            <img src={DiscordLogo} height={25} width={25} />
                            Sign In with Discord
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img src={Logo} height={75} width={75} className="h-6 w-6 text-green-500" alt="logo"/>
                                <span className="text-xl font-bold text-green-500">Kraken Plugins</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Elevating your Old School RuneScape experience with premium plugins.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-green-500">
                                    <span className="sr-only">Discord</span>
                                    {/* Discord icon would go here */}
                                </a>
                                <a href="#" className="text-gray-400 hover:text-green-500">
                                    <span className="sr-only">Twitter</span>
                                    {/* Twitter icon would go here */}
                                </a>
                                <a href="#" className="text-gray-400 hover:text-green-500">
                                    <span className="sr-only">GitHub</span>
                                    {/* GitHub icon would go here */}
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Products</h4>
                            <ul className="space-y-2">
                                <li><a href="/plugins" className="text-gray-400 hover:text-green-500">Plugins</a></li>
                                <li><a href="/download" className="text-gray-400 hover:text-green-500">Client Download</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="/faq" className="text-gray-400 hover:text-green-500">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-green-500">Discord</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="/" className="text-gray-400 hover:text-green-500">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-green-500">Cookie Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-green-500">Terms & Conditions</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}