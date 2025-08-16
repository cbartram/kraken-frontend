import {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Target, Settings, TrendingUp } from "lucide-react";
import {discordRedirect} from "@/lib/utils";

export default function CallToAction() {
    const [isHovered, setIsHovered] = useState(false);
    const [playerCount, setPlayerCount] = useState(3);
    const [particles, setParticles] = useState([]);

    // Plugin cards data
    const pluginCards = [
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Doom of Mokhaoitl",
            description: "Auto Prayer switching, auto thralls, auto death charge and advanced overlays make farming Doom at delves 8+ a breeze.",
            gradient: "from-red-500 to-pink-600"
        },
        {
            icon: <Target className="h-8 w-8" />,
            title: "Gear Swap",
            description: "Swap gear instantly with customizable presets and hotkeys for any situation. Add item triggers for specific gear swaps in any environment!",
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: "Tombs of Amascut Extended",
            description: "Real-time overlays for P2 skulls, insanity correct side indicators, Auto Prayers for Zebak and Wardens, highlights for Akkha orbs, and so much more!",
            gradient: "from-green-500 to-emerald-600"
        },
        {
            icon: <Settings className="h-8 w-8" />,
            title: "Yama",
            description: "Overlays for special attacks, falling P3 fireballs, prayers and more. The Yama plugin makes solos easy and duos absolutely free.",
            gradient: "from-purple-500 to-indigo-600"
        }
    ];

    // Initialize particles
    useEffect(() => {
        const initialParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 200,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            drift: (Math.random() - 0.5) * 2
        }));
        setParticles(initialParticles);
    }, []);

    // Animate particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prevParticles =>
                prevParticles.map(particle => ({
                    ...particle,
                    y: particle.y - particle.speed,
                    x: particle.x + particle.drift * 0.5,
                    opacity: particle.y < -100 ? 0 : particle.opacity
                })).filter(particle => particle.y > -100)
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    // Add new particles from bottom
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prevParticles => {
                const newParticle = {
                    id: Date.now() + Math.random(),
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                    y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                    size: Math.random() * 4 + 2,
                    speed: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.3,
                    drift: (Math.random() - 0.5) * 2
                };
                return [...prevParticles.slice(-49), newParticle];
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    // Simulate live counter
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerCount(prev => prev + Math.floor(Math.random() * 3));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden flex items-center">
            {/* Animated background particles from bottom */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className="absolute bg-emerald-400 rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: particle.x,
                            top: particle.y,
                            opacity: particle.opacity,
                            boxShadow: `0 0 ${particle.size * 2}px rgba(16, 185, 129, 0.5)`
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Bottom glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-emerald-500/20 via-emerald-500/10 to-transparent pointer-events-none" />

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        {/* Limited time offer badge */}
                        <motion.div
                            className="inline-block mb-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mt-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg">
                                ⚡ Limited Time Offer
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                        >
                            Experience OSRS{" "}
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Your Way
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                        >
                            Make your gameplay more enjoyable with quality of life features designed to enhance,
                            not replace, your RuneScape experience.
                        </motion.p>

                        {/* Feature checkmarks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap justify-center gap-8 mb-8 text-slate-300"
                        >
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                50+ Plugins
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Instant Access
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                Optimized Performance
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Plugin showcase cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {pluginCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"
                                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />

                                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 h-full relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.gradient} opacity-20 rounded-full -translate-y-10 translate-x-10`} />

                                    <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center text-white mb-4 shadow-lg`}>
                                        {card.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <div className="max-w-2xl mx-auto">
                            {/* User count badge */}
                            <motion.div
                                className="inline-block mb-8"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center justify-center bg-slate-800/50 backdrop-blur-md rounded-full px-6 py-3 border border-slate-700/50">
                                    <Users className="w-5 h-5 text-emerald-400 mr-3" />
                                    <span className="text-white font-medium">
                                        <span className="text-emerald-400 font-bold">{playerCount.toLocaleString()}</span> Kraken users
                                    </span>
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full ml-3 animate-pulse" />
                                </div>
                            </motion.div>

                            {/* Sign in button */}
                            <Button
                                onClick={discordRedirect}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="relative ml-5 overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-12 py-6 rounded-xl font-bold text-lg shadow-2xl group border-0 mb-4"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />

                                <div className="flex items-center justify-center space-x-3 relative z-10">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                    </svg>
                                    <span>SIGN IN</span>
                                    <motion.div
                                        animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                                        transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5 }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </div>
                            </Button>

                            <p className="text-slate-400 text-sm">
                                7 day free trial. No credit card required for trial.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}