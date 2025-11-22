import React, {useEffect} from 'react';
import {
    ArrowRight,
    CheckCircle,
    Shield,
    RefreshCwIcon,
    Heart,
    Zap
} from 'lucide-react';
import Footer from "@/components/Footer.jsx";
import Navbar from "@/components/Navbar.jsx";
import ReactGA from "react-ga4";
import {useAuth} from "@/components/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AboutUsDoom from "@/assets/about_us_doom.png";
import {discordRedirect} from "@/lib/utils.js";
import DiscordLogo from "@/assets/discord-mark-white.svg";


export default function AboutUsPage() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: "/about",
            title: "About Us Page",
        });
    }, []);

    const values = [
        {
            icon: <RefreshCwIcon className="w-8 h-8 text-emerald-600" />,
            title: "Regular Updates",
            description: "Client updates quickly and efficiently after Jagex or RuneLite releases new revisions."
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-600" />,
            title: "Safety First",
            description: "Plugins load quietly in a standard way to RuneLite, packet utilities are automated, and network traffic is encrypted."
        },
        {
            icon: <Zap className="w-8 h-8 text-emerald-600" />,
            title: "Performance",
            description: "Our plugins are designed to be fast to load and execute. We optimize our overlays to reduce lag spikes and ensure tick perfect accuracy"
        },
        {
            icon: <Heart className="w-8 h-8 text-emerald-600" />,
            title: "Support",
            description: "Friendly and easy to reach support when you need it, both through the website and on Discord!"
        }
    ];

    const stats = [
        { number: "50+", label: "Happy Customers" },
        { number: "10+", label: "Years Developments and OSRS Experience" },
        { number: "24/7", label: "Support Available through Discord" },
        { number: "99%", label: "Client Uptime Guarantee" }
    ];

    const teamMembers = [
        {
            name: "RuneWraith",
            role: "Founder & Lead Engineer",
            image: "https://cdn.discordapp.com/avatars/215299779352068097/244a46f4d9389adf7a256a2577054956?size=1024",
            description: "10+ years in professional software engineering experience. Committed OSRS player since 2021, with a passion for creating innovative plugins that enhance the OSRS experience.",
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar use={user} onLogout={logout} />
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-emerald-50 via-white to-slate-50 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Building the Future of OSRS Plugins
                            <span className="text-emerald-600 block">Together</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            We're a passionate team of innovators, creators, and problem-solvers dedicated to
                            crafting exceptional OSRS plugins that make the game more enjoyable.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate("/plugins")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                                Get Started <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-white">
                                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                                <div className="text-slate-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Founded in 2025, we started with a simple belief: OSRS plugins should make your life better,
                                without limits. What began as a single developer working on passion projects with friends through the weekends
                                has grown into a thriving community sharing plugins with people all over the world.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Our journey has been driven by our commitment to safety, continuous improvement, open source development,
                                and putting our users first. We've weathered challenges, celebrated victories,
                                and never lost sight of our core mission: to build plugins that make OSRS fun again.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    <span className="text-slate-700">Safety-first approach</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    <span className="text-slate-700">Continuous Updates</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    <span className="text-slate-700">Community Driven</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={AboutUsDoom}
                                alt="Team collaboration"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-emerald-600 text-white p-6 rounded-lg shadow-lg">
                                <div className="text-2xl font-bold">10+ Years</div>
                                <div className="text-emerald-100">of Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            The principles that guide everything we do and shape our company culture.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
                                <div className="flex justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            The passionate individuals behind our success, each bringing unique expertise and perspective.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center group">
                                <div className="relative mb-6 inline-block">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                                    />
                                    <div className="absolute inset-0 bg-emerald-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{member.name}</h3>
                                <p className="text-emerald-600 font-semibold mb-4">{member.role}</p>
                                <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Game?</h2>
                    <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                        Let's get you involved in the community and start enhancing your OSRS experience with our plugins.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => discordRedirect()} className="bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                            Join us on Discord <img src={DiscordLogo} className="w-5 h-5" />
                        </button>
                        <button onClick={() => navigate("/plugins")} className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
                            View Our Plugins
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}