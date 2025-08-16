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
    ArrowRight, Sparkles, Download, Unplug, Banknote, Package,
} from 'lucide-react';
import Logo from "@/assets/logo.png"
import DiscordLogo from "@/assets/discord-mark-white.svg"
import PluginShowcase from "@/components/landing_page_components/PluginShowcase";
import {discordRedirect} from "@/lib/utils";
import {useNavigate} from "react-router-dom";
import Olm from "/olm.png";
import Tob from "/tob.png";
import Zulrah from "/zulrah.png";
import PluginCarousel from "@/components/landing_page_components/PluginCarousel";
import VideoShowcase from "@/components/landing_page_components/VideoShowcase.jsx";
import CallToAction from "@/components/landing_page_components/CallToAction.jsx";
import Footer from "@/components/Footer.jsx";
import ReactGA from "react-ga4";
import TestimonialsSection from "@/components/landing_page_components/TestimonialsSection.jsx";

export default function Landing() {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

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
    const features = [
        {
            icon: <BotOff className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "Minimal automation",
            description: "None of our plugins are \"bots\". Although some plugins can auto switch prayers most simply assist you with additional in game information. None of the plugins use injection and are all 100% compatible with RuneLite's official un-modified API.",
        },
        {
            icon: <VenetianMask className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "Incognito Client",
            description: "The Kraken client doesn't modify RuneLite in any way, sideloading all the plugins during runtime. Plugins run the exact same way as any normal plugin installed through the Plugin Hub. This makes Kraken & its plugins nearly impossible to detect."
        },
        {
            icon: <CloudUpload className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "Regular Updates",
            description: "Frequent, automatic updates ensure compatibility with the latest RuneLite and OSRS versions and are applied instantly to your client."
        },
        {
            icon: <Gamepad className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "RuneLite Mode",
            description: "Want to run RuneLite without any Kraken plugins? With RuneLite mode it's as easy as clicking a button!"
        },
        {
            icon: <Package className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "Plugin Packs",
            description: "Purchase a plugin pack to get a suite of plugins at a reduced price. We have packs for Raids, Slayer, entry mode PvM and more!"
        },
        {
            icon: <Download className="h-12 w-12 text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"/>,
            title: "1 Click Install",
            description: "Install the Kraken Client once with 1 click. Updates to the client and plugins are automatically applied to your account."
        }
    ];
    const cardVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            transition: {
                duration: 0.3
            }
        }
    };

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: "/",
            title: "Landing Page",
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center cursor-pointer">
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5}}
                        className="flex items-center gap-2"
                    >
                        <img src={Logo} height={50} width={50} />
                    </motion.div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            className="cursor-pointer"
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
                            <a href="/download" className="hover:text-green-500 transition-colors">Download Client</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#features" className="hover:text-green-500 transition-colors">Features</a>
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
                            <Button onClick={() => discordRedirect()} className="bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white text-sm font-medium cursor-pointer">
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
                                <Button className="bg-green-500 hover:bg-green-600 text-black w-full cursor-pointer" onClick={() => navigate('/plugins')}>
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
                                7 Day Free Trial
                              </span>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                    Level Up with <span className="text-green-400">Kraken</span> Plugins
                                </h1>

                                <p className="text-indigo-200 text-lg mb-8">
                                    Transform your Old School RuneScape experience with custom plugins designed to maximize your loot potential and create an unmatched gaming experience.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button onClick={() => navigate("/plugins")} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg flex cursor-pointer items-center gap-2 shadow-lg shadow-green-600/20">
                                        View Plugins
                                        <Unplug className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button onClick={() => window.open("https://discord.gg/bbPS2AP7Cq", '_blank').focus()} className="mt-4 w-full bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white text-sm font-medium">
                                    <img src={DiscordLogo} height={25} width={25} />
                                    Join our Discord
                                </Button>
                            </motion.div>
                        </div>

                        {/* Interactive Loot Showcase */}
                        <div className="flex items-center justify-center">
                            <VideoShowcase />
                        </div>
                    </div>
                </div>
            </div>

            <PluginShowcase />
            <PluginCarousel />

            {/* Features Section */}
            <section id="features" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
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
                            Kraken is built directly on top of an unmodified RuneLite client. This means that all of our plugins are <span className="text-green-400 font-bold">100%</span> compatible with the official client.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.1 }}
                                viewport={{once: true}}
                                whileHover={{y: -8}}
                                className="group relative bg-gray-700 p-6 rounded-lg border border-gray-600 hover:bg-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer overflow-hidden"
                            >
                                {/* Top light bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="mb-4 inline-block p-3 bg-gray-600 group-hover:bg-gray-300 rounded-xl border border-gray-500 group-hover:border-green-400/50 transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-50 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                </div>
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
                        <button className="bg-gradient-to-r flex items-center mx-auto cursor-pointer from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all" onClick={() => window.location.href = '/plugins'}>
                            View All Plugins <Unplug className="ml-2" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection />

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
                            can also get started today with a <span className="text-green-400 font-bold">3 day</span> day free trial for every plugin!
                        </p>
                    </motion.div>

                    {/* Flow Diagram */}
                    <div className="flex flex-col items-center">
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
                        <Button className="bg-green-500/20 text-green-500 hover:bg-green-600/20 text-lg px-8 py-6 mt-16 cursor-pointer" onClick={() => navigate('/purchase')}>
                            <Banknote /> See Pricing Options
                        </Button>
                    </div>
                </div>
            </section>

            <CallToAction />
            <Footer />
        </div>
    )
}