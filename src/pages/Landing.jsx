import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
    Shield,
    Swords,
    Map,
    Gem,
    Skull,
    ArrowUpRight,
    ChevronDown,
    Star,
    Github
} from 'lucide-react';
import Logo from "@/assets/logo.png"

export default function Landing() {
    const [activeTab, setActiveTab] = useState('all');
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Plugin data
    const plugins = [
        {
            id: 1,
            name: "Combat Assistant",
            description: "Optimize your PvM and PvP strategies with real-time combat metrics and suggestions.",
            icon: <Swords className="h-8 w-8 text-green-400"/>,
            category: "combat",
            popular: true,
            price: "$4.99"
        },
        {
            id: 2,
            name: "Loot Tracker Pro",
            description: "Advanced tracking of all your drops with estimated GP values and statistics.",
            icon: <Gem className="h-8 w-8 text-purple-400"/>,
            category: "utility",
            popular: true,
            price: "$3.99"
        },
        {
            id: 3,
            name: "Quest Helper",
            description: "Step-by-step guides for every quest with item requirements and path tracking.",
            icon: <Map className="h-8 w-8 text-green-400"/>,
            category: "utility",
            popular: false,
            price: "$2.99"
        },
        {
            id: 4,
            name: "Boss Timer",
            description: "Track respawn timers for all bosses and receive notifications for your favorites.",
            icon: <Skull className="h-8 w-8 text-red-400"/>,
            category: "combat",
            popular: true,
            price: "$3.99"
        },
        {
            id: 5,
            name: "HD Ground Items",
            description: "Enhanced visualization for ground items with custom highlighting based on value.",
            icon: <Gem className="h-8 w-8 text-blue-400"/>,
            category: "visual",
            popular: false,
            price: "$2.99"
        },
        {
            id: 6,
            name: "Advanced Protection",
            description: "Get real-time alerts for suspicious activity and protect your valuable items.",
            icon: <Shield className="h-8 w-8 text-blue-400"/>,
            category: "security",
            popular: false,
            price: "$5.99"
        }
    ];

    const filteredPlugins = activeTab === 'all'
        ? plugins
        : activeTab === 'popular'
            ? plugins.filter(plugin => plugin.popular)
            : plugins.filter(plugin => plugin.category === activeTab);

    // Hero section animation variants
    const heroVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

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
                            <a href="#features" className="hover:text-green-500 text-green-400 transition-colors">Features</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#plugins" className="hover:text-green-500 transition-colors">Plugins</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#testimonials" className="hover:text-green-500 transition-colors">Testimonials</a>
                        </motion.li>
                        <motion.li whileHover={{scale: 1.1}}>
                            <a href="#pricing" className="hover:text-green-500 transition-colors">Pricing</a>
                        </motion.li>
                        <motion.li whileTap={{scale: 0.95}}>
                            <Button className="bg-green-500 hover:bg-green-600 text-black">
                                Get Started
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
                                <Button className="bg-green-500 hover:bg-green-600 text-black w-full">
                                    Get Started
                                </Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={heroVariants}
                className="relative pt-16 pb-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            >
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-center mb-6"
                    >
                        Elevate Your <span className="text-green-500">RuneScape</span> Experience
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-10"
                    >
                        Premium RuneLite plugins designed to enhance your gameplay with advanced features and
                        optimizations.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                        <Button className="bg-green-500 hover:bg-green-600 text-black text-lg px-8 py-6">
                            Browse Plugins
                        </Button>
                        <Button variant="outline"
                                className="border-green-500 text-green-500 hover:bg-green-500/10 text-lg px-8 py-6">
                            Learn More
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="relative w-full max-w-4xl"
                    >
                        <div
                            className="bg-gray-800 border-2 border-green-500/50 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20">
                            <img
                                src="/api/placeholder/1200/675"
                                alt="RuneLite plugin interface"
                                className="w-full object-cover"
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 bg-green-500 rounded-full p-4 shadow-lg"
                                animate={{
                                    rotate: [0, 10, 0, -10, 0],
                                    scale: [1, 1.1, 1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                            >
                                <Star className="h-8 w-8 text-black"/>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

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
                            Our plugins are meticulously crafted by experienced RuneScape players to provide the best
                            possible advantage while complying with game rules.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield className="h-12 w-12 text-green-500"/>,
                                title: "100% Safe & Compliant",
                                description: "All our plugins follow RuneScape's rules and terms of service. No risk to your account."
                            },
                            {
                                icon: <ArrowUpRight className="h-12 w-12 text-green-500"/>,
                                title: "Performance Optimized",
                                description: "Lightweight plugins that won't impact your game performance or cause lag."
                            },
                            {
                                icon: <Github className="h-12 w-12 text-green-500"/>,
                                title: "Regular Updates",
                                description: "Frequent updates to ensure compatibility with the latest RuneLite and OSRS versions."
                            },
                            {
                                icon: <Swords className="h-12 w-12 text-green-500"/>,
                                title: "Combat Advantages",
                                description: "Get the edge in PvM and PvP with real-time combat information and suggestions."
                            },
                            {
                                icon: <Map className="h-12 w-12 text-green-500"/>,
                                title: "Enhanced Navigation",
                                description: "Improved maps, teleport directories, and navigation tools to save you time."
                            },
                            {
                                icon: <Gem className="h-12 w-12 text-green-500"/>,
                                title: "Loot Analysis",
                                description: "Track your drops and analyze your profits over time with detailed statistics."
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

                    <div className="flex justify-center flex-wrap gap-2 mb-12">
                        {['all', 'popular', 'combat', 'utility', 'visual', 'security'].map((tab) => (
                            <motion.button
                                key={tab}
                                whileTap={{scale: 0.95}}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full ${
                                    activeTab === tab
                                        ? 'bg-green-500 text-black font-bold'
                                        : 'bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </motion.button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlugins.map((plugin) => (
                            <motion.div
                                key={plugin.id}
                                variants={cardVariants}
                                whileHover="hover"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                                viewport={{once: true}}
                            >
                                <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full flex flex-col">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            {plugin.icon}
                                            {plugin.popular && (
                                                <span
                                                    className="bg-green-500 text-xs font-bold text-black px-2 py-1 rounded-full">
                          POPULAR
                        </span>
                                            )}
                                        </div>
                                        <CardTitle className="text-xl mt-2">{plugin.name}</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            {plugin.category.charAt(0).toUpperCase() + plugin.category.slice(1)} Plugin
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-gray-300 flex-grow">
                                        <p>{plugin.description}</p>
                                    </CardContent>
                                    <CardFooter
                                        className="flex justify-between items-center pt-4 border-t border-gray-700">
                                        <span className="text-green-500 font-bold">{plugin.price}</span>
                                        <Button className="bg-gray-700 hover:bg-gray-600">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
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
                        <Button className="bg-green-500 hover:bg-green-600 text-black text-lg px-8 py-6">
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
                            Join thousands of satisfied RuneScape players who have enhanced their gameplay with our
                            premium plugins.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "PkMaster99",
                                role: "PvP Specialist",
                                content: "The Combat Assistant plugin completely changed my PvP game. The real-time suggestions and visual cues have improved my KD ratio significantly.",
                                rating: 5
                            },
                            {
                                name: "IronBTW",
                                role: "Ironman Player",
                                content: "As an Ironman, efficiency is everything. The Quest Helper and Loot Tracker have saved me countless hours of grinding. Worth every gold piece!",
                                rating: 5
                            },
                            {
                                name: "MaxedMain",
                                role: "Completionist",
                                content: "I've tried many plugin suites, but this collection offers the best balance of features without breaking game rules. The Boss Timer is my personal favorite.",
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
                                                className="bg-green-500 h-10 w-10 rounded-full flex items-center justify-center font-bold text-black">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
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
                            Simple, <span className="text-green-500">Affordable Pricing</span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Choose the plan that works best for your gameplay style and needs.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "Starter Pack",
                                price: "$9.99",
                                period: "monthly",
                                description: "Perfect for casual players",
                                features: [
                                    "Access to 3 plugins of your choice",
                                    "Basic support",
                                    "Monthly updates",
                                    "Cancel anytime"
                                ],
                                highlighted: false
                            },
                            {
                                name: "Pro Bundle",
                                price: "$19.99",
                                period: "monthly",
                                description: "Our most popular package",
                                features: [
                                    "Access to all plugins",
                                    "Priority support",
                                    "Weekly updates",
                                    "Custom configurations",
                                    "Exclusive Discord access"
                                ],
                                highlighted: true
                            },
                            {
                                name: "Annual Pass",
                                price: "$149.99",
                                period: "yearly",
                                description: "Best value for dedicated players",
                                features: [
                                    "Access to all plugins",
                                    "Premium support",
                                    "Early access to new plugins",
                                    "Custom configurations",
                                    "Exclusive Discord access",
                                    "2 months free vs monthly"
                                ],
                                highlighted: false
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                className={plan.highlighted ? "md:-mt-4 md:mb-4" : ""}
                            >
                                <Card className={`h-full flex flex-col ${
                                    plan.highlighted
                                        ? "bg-green-500 text-black border-green-400"
                                        : "bg-gray-800 border-gray-700"
                                }`}>
                                    <CardHeader className={`text-center ${plan.highlighted ? "pb-2" : ""}`}>
                                        {plan.highlighted && (
                                            <div
                                                className="bg-black text-green-500 font-bold py-1 px-3 rounded-full text-sm mx-auto mb-2">
                                                MOST POPULAR
                                            </div>
                                        )}
                                        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                        <div className="mt-2">
                                            <span className="text-3xl font-bold">{plan.price}</span>
                                            <span
                                                className={plan.highlighted ? "text-black/70" : "text-gray-400"}>/{plan.period}</span>
                                        </div>
                                        <CardDescription
                                            className={plan.highlighted ? "text-black/80" : "text-gray-400"}>
                                            {plan.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <Shield
                                                        className={`h-5 w-5 ${plan.highlighted ? "text-black" : "text-green-500"}`}/>
                                                    <span
                                                        className={plan.highlighted ? "text-black/90" : "text-gray-300"}>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="pt-4">
                                        <Button
                                            className={`w-full py-6 ${
                                                plan.highlighted
                                                    ? "bg-black text-green-500 hover:bg-gray-900"
                                                    : "bg-green-500 text-black hover:bg-green-600"
                                            }`}
                                        >
                                            Get Started
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-br from-green-500 to-green-600 text-black">
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
                        <Button className="bg-black hover:bg-gray-900 text-green-500 text-lg px-8 py-6 shadow-lg">
                            Get Started Today
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                            className="text-center mb-6"
                        >
                            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                            <p className="text-gray-300">Subscribe to our newsletter for the latest plugin updates,
                                RuneScape tips, and exclusive offers.</p>
                        </motion.div>
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.1}}
                            viewport={{once: true}}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-700 border-gray-600 flex-grow py-6"
                            />
                            <Button
                                className="bg-green-500 hover:bg-green-600 text-black whitespace-nowrap py-6"
                            >
                                Subscribe
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-gray-900 border-t border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="h-6 w-6 text-green-500"/>
                                <span className="text-xl font-bold text-green-500">RuneLite Pro Plugins</span>
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
                                <li><a href="#" className="text-gray-400 hover:text-green-500">All Plugins</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-green-500">Combat Plugins</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}