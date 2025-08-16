import {useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Star, Quote, Shield, Zap, Trophy } from "lucide-react";

export default function TestimonialsSection() {
    const [floatingElements, setFloatingElements] = useState([]);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Initialize floating elements
    useEffect(() => {
        const elements = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 30 + 20,
            opacity: Math.random() * 0.3 + 0.1,
            speed: Math.random() * 20 + 10,
            direction: Math.random() * 360
        }));
        setFloatingElements(elements);
    }, []);

    // Auto-cycle through testimonials for emphasis
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const testimonials = [
        {
            name: "Anonymous",
            role: "PvM Specialist",
            content: "The chamber of xeric plugin is actually OP for olm. I never could get skipping right but with this plugin it makes solos literally braindead. Highly recommend!",
            rating: 5,
            class: "bg-gradient-to-r from-blue-500 to-cyan-500",
            icon: <Shield className="w-5 h-5" />,
            highlight: "Chamber of Xeric mastery"
        },
        {
            name: "Anonymous",
            role: "Ironman",
            content: "I used to die to hydra all the time. Then I got the kraken plugin for it. I love that the plugin tracks and counts attacks for you so you don't have to remember a thing. The auto prayers also make the boss afk (almost too easy). Haven't died since!",
            rating: 5,
            class: "bg-gradient-to-r from-red-500 to-pink-500",
            icon: <Zap className="w-5 h-5" />,
            highlight: "Never died since using Kraken"
        },
        {
            name: "Anonymous",
            role: "Maxed Main",
            content: "I've tried quite a few plugins, but this collection offers the best balance of features without breaking the bank. The ToB plugin is my personal favorite. Literally don't know how I did Sotetseg before.",
            rating: 4,
            class: "bg-gradient-to-r from-yellow-500 to-orange-500",
            icon: <Trophy className="w-5 h-5" />,
            highlight: "Best balance of features"
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 relative overflow-hidden">
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }} />
            </div>

            {/* Floating geometric elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingElements.map(element => (
                    <motion.div
                        key={element.id}
                        className="absolute border border-green-500/20 rounded-lg"
                        style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            width: element.size,
                            height: element.size,
                            opacity: element.opacity
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                            opacity: [element.opacity, element.opacity * 0.5, element.opacity]
                        }}
                        transition={{
                            duration: element.speed,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Radial gradient overlays */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8}}
                    viewport={{once: true}}
                >
                    {/* Section badge */}
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm text-green-400 font-medium">
                            <Quote className="w-4 h-4 inline mr-2" />
                            Real User Experiences
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        viewport={{once: true}}
                        className="text-4xl md:text-5xl font-bold mb-6 text-white"
                    >
                        What Our{" "}
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Users Say
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                        className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Join the numerous OldSchool RuneScape players who have enhanced their gameplay with our
                        premium plugins and discovered new levels of efficiency.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                        viewport={{once: true}}
                        className="flex flex-wrap justify-center gap-8 mt-8 text-sm"
                    >
                        <div className="flex items-center text-slate-300">
                            <Star className="w-4 h-4 text-yellow-400 mr-2" />
                            4.8/5 Average Rating
                        </div>
                        <div className="flex items-center text-slate-300">
                            <Shield className="w-4 h-4 text-green-400 mr-2" />
                            50+ Active Users
                        </div>
                        <div className="flex items-center text-slate-300">
                            <Trophy className="w-4 h-4 text-orange-400 mr-2" />
                            95% Satisfaction Rate
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                            viewport={{once: true}}
                            whileHover={{y: -8, scale: 1.02}}
                            className="group relative"
                        >
                            {/* Glow effect on active testimonial */}
                            <AnimatePresence>
                                {activeTestimonial === index && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-sm opacity-30"
                                    />
                                )}
                            </AnimatePresence>

                            <Card className="bg-slate-800/50 backdrop-blur-md border-slate-700/50 h-full relative overflow-hidden group-hover:bg-slate-800/70 transition-all duration-300">
                                {/* Decorative corner element */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-full -translate-y-10 translate-x-10" />

                                <CardHeader className="relative">
                                    {/* Quote decoration */}
                                    <div className="absolute top-4 right-4 text-green-500/20">
                                        <Quote className="w-8 h-8" />
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`${testimonial.class} h-12 w-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg`}>
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                                            <CardDescription className="text-slate-400 flex items-center">
                                                {testimonial.icon}
                                                <span className="ml-2">{testimonial.role}</span>
                                            </CardDescription>
                                        </div>
                                    </div>

                                    {/* Highlight badge */}
                                    <div className="inline-block bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-xs text-green-400 font-medium mb-4">
                                        ✨ {testimonial.highlight}
                                    </div>
                                </CardHeader>

                                <CardContent className="relative">
                                    <p className="text-slate-300 leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>
                                </CardContent>

                                <CardFooter className="pt-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.2, delay: i * 0.1 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
                                                </motion.div>
                                            ))}
                                            {[...Array(5 - testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 text-slate-600"/>
                                            ))}
                                        </div>

                                        {/* Verified badge */}
                                        <div className="flex items-center text-green-400 text-xs font-medium">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Verified
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom decoration */}
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.8, delay: 0.5}}
                    viewport={{once: true}}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center text-slate-400 text-sm">
                        <div className="w-8 h-px bg-slate-600 mr-4" />
                        <span>Trusted by players worldwide</span>
                        <div className="w-8 h-px bg-slate-600 ml-4" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}