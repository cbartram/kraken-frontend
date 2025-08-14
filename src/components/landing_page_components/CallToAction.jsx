import {useState, useEffect, useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Users, Star, Award, Shield } from "lucide-react";
import {discordRedirect} from "@/lib/utils.js";
import Video from "@/assets/runelite_masked_v2.mp4";

export default function CallToAction() {
    const [isHovered, setIsHovered] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [playerCount, setPlayerCount] = useState(5);

    const features = [
        { icon: <Users className="h-6 w-6" />, text: "Safe and reliable client built on RuneLite" },
        { icon: <Star className="h-6 w-6" />, text: "Access to 20+ premium plugins" },
        { icon: <Award className="h-6 w-6" />, text: "Dedicated support and regular updates" },
        { icon: <Shield className="h-6 w-6" />, text: "New plugins released regularly" }
    ];

    // Simulate live counter
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayerCount(prev => Math.floor(prev + Math.random() * 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Cycle through features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature(prev => (prev + 1) % features.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }
    };

    const videoRef = useRef(null);

    useEffect(() => {
        // Make sure video loops when loaded
        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play();
            });
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', () => {});
            }
        };
    }, []);


    return (
        <section className="py-20 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        style={{
                            width: Math.random() * 40 + 10,
                            height: Math.random() * 40 + 10,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -Math.random() * 100 - 50],
                            x: [0, (Math.random() - 0.5) * 50],
                            opacity: [0.2, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3500,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block mb-4">
                            <motion.div
                                className="flex items-center justify-center bg-emerald-600/20 bg-opacity-20 rounded-full px-4 py-1 text-sm text-white font-medium border border-white border-opacity-20 backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                <span>{playerCount.toLocaleString()} Kraken users</span>
                            </motion.div>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-6 text-white"
                        >
                            Level Up Your
                            <motion.span
                                initial={{ opacity: 0.8 }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400 ml-2"
                            >
                                RuneScape
                            </motion.span>
                            <br /> Experience Today
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl text-white text-opacity-90 max-w-2xl mx-auto mb-8"
                        >
                            Our premium plugins have helped hundreds of players enhance their gameplay,
                            maximize efficiency, and discover new ways to enjoy the game.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-none bg-opacity-10 backdrop-blur-md rounded-xl p-8 border border-gray-300 border-opacity-10 shadow-xl"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="mb-6">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeFeature}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center text-white mb-4"
                                        >
                                            <div className="mr-3 bg-indigo-500 bg-opacity-20 p-2 rounded-full">
                                                {features[activeFeature].icon}
                                            </div>
                                            <p className="font-medium">{features[activeFeature].text}</p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="space-y-4"
                                >
                                    <Button
                                        onClick={() => discordRedirect()}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-lg font-medium text-lg relative overflow-hidden group"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-indigo-800 origin-left"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: isHovered ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="flex items-center justify-center space-x-2 relative z-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                                            </svg>
                                            <span>Sign in with Discord</span>
                                            <motion.div
                                                animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                                                transition={{ repeat: isHovered ? Infinity : 0, duration: 1 }}
                                            >
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.div>
                                        </div>
                                    </Button>

                                    <p className="text-white text-opacity-80 text-center text-sm">
                                        3 day free trial. No credit card required for trial.
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="relative hidden md:block"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 to-emerald-500 rounded-lg blur opacity-70 animate-pulse"></div>
                                    <div className="relative bg-black bg-opacity-80 rounded-lg pt-2 pl-2 pr-2 h-64">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="rounded-md overflow-hidden shadow-xl relative">
                                                {/* Video element - replace the src with your actual video path */}
                                                <video
                                                    ref={videoRef}
                                                    className="w-full h-full object-cover rounded-md"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                >
                                                    <source src={Video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-6 text-white text-opacity-80 text-sm"
                    >
                        By using Kraken Plugins, you agree to our Terms of Service and Privacy Policy
                    </motion.div>
                </div>
            </div>
        </section>
    );
}