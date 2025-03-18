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
import {
    BotOff,
    Swords,
    ChevronDown,
    Star,
    VenetianMask,
    CloudUpload,
    Gamepad,
    BellOff,
    Wrench,
    ArrowRight,
} from 'lucide-react';
import Logo from "@/assets/logo.png"
import DiscordLogo from "@/assets/discord-mark-white.svg"
import {discordRedirect} from "@/lib/utils";

export default function Landing() {
    const [activeTab, setActiveTab] = useState('all');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [hoveredToken, setHoveredToken] = useState(null);
    const [hoveredPlan, setHoveredPlan] = useState(null);

    // Plugin data
    const plugins = [
        {
            id: 1,
            name: "Theatre of Blood",
            description: "Never misclick a Nylocas, miss a red ball tick eat, or confuse a Verzik nylo again. All in one plugin for ToB",
            icon: <Swords className="h-8 w-8 text-purple-400"/>,
            category: "combat",
            popular: true,
        },
        {
            id: 2,
            name: "Chambers Helper",
            description: "Tracks helpful information for many Chambers rooms and shows Olm's cycle. Skipping specials has never be easier!",
            icon: <Swords className="h-8 w-8 text-purple-400"/>,
            category: "combat",
            popular: true,
        },
        {
            id: 3,
            name: "Zulrah",
            description: "Displays the current rotation, where to stand, where to move, and what to pray for your favorite Snake boss!",
            icon: <Swords className="h-8 w-8 text-purple-400"/>,
            category: "combat",
            popular: false,
        }
    ];

    const tokenPackages = [
        {
            id: 'basic',
            name: 'Basic Pack',
            tokens: 100,
            price: '$9.99',
            savings: null,
            highlighted: false
        },
        {
            id: 'popular',
            name: 'Value Pack',
            tokens: 300,
            price: '$24.99',
            savings: 'Save 16%',
            highlighted: true
        },
        {
            id: 'premium',
            name: 'Premium Pack',
            tokens: 1000,
            price: '$79.99',
            savings: 'Save 20%',
            highlighted: false
        }
    ];

    const subscriptionPlans = [
        {
            id: 'monthly',
            name: 'Monthly Access',
            tokens: 80,
            duration: '1 month',
            features: [
                'Access to all plugins',
                'Basic support',
                'Monthly updates',
                'Plugin configurations'
            ],
            highlighted: false
        },
        {
            id: 'quarterly',
            name: 'Quarterly Access',
            tokens: 210,
            duration: '3 months',
            features: [
                'Access to all plugins',
                'Priority support',
                'Regular updates',
                'Custom configurations',
                'Save 12% vs monthly'
            ],
            highlighted: true
        },
        {
            id: 'annual',
            name: 'Annual Access',
            tokens: 700,
            duration: '12 months',
            features: [
                'Access to all plugins',
                'Premium support',
                'Early access to new plugins',
                'Custom configurations',
                'Exclusive Discord access',
                'Save 27% vs monthly'
            ],
            highlighted: false
        }
    ];

    const arrowVariants = {
        hidden: { opacity: 0, pathLength: 0 },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1
            }
        }
    };
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
                        Premium RuneLite compatible plugins are designed to enhance your gameplay with advanced features and
                        optimizations.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                        <Button className="bg-green-500 hover:bg-green-600 text-black text-lg px-8 py-6">
                            Browse Plugins
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="relative w-full max-w-4xl"
                    >
                        <div
                            className="bg-gray-800 border-2 border-green-500/50 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20">
                            <img
                                src={Logo}
                                height={75}
                                width={75}
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
                            Our plugins are meticulously crafted by experienced engineers to provide unparalleled
                            advantages in game.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BotOff className="h-12 w-12 text-green-500"/>,
                                title: "No plugin automation",
                                description: "None of our plugins are \"bots\". They assist you with additional in game information using RuneLite\'s official unmodified API",
                            },
                            {
                                icon: <VenetianMask className="h-12 w-12 text-green-500"/>,
                                title: "Incognito Client",
                                description: "The Kraken client doesn't modify RuneLite in any way, sideloading all the plugins during runtime. This makes it nearly impossible to detect."
                            },
                            {
                                icon: <CloudUpload className="h-12 w-12 text-green-500"/>,
                                title: "Regular Updates",
                                description: "Frequent updates to ensure compatibility with the latest RuneLite and OSRS versions and are applied instantly to your client."
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
                                        <CardTitle className="text-xl mt-2 text-gray-300">{plugin.name}</CardTitle>
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
                            Purchase Kraken Tokens and use them to subscribe to our plugins. Choose the plugin and subscription length that fits your gameplay needs.
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
                                <p className="text-gray-400">Buy Kraken Tokens with your preferred payment method</p>
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
                                <p className="text-gray-400">Select your preferred subscription length for plugins</p>
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
                                <p className="text-gray-400">Access all premium plugins instantly after subscription</p>
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