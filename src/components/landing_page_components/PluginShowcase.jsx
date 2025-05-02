import { useState, useRef, useEffect } from 'react';
import PluginDemo from '@/assets/kraken-demo.png'
import DiscordIcon from '@/assets/discord-mark-white.svg'
import {Cog, CogIcon, TvMinimal, Unplug} from "lucide-react";

const PluginShowcase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Add animation when component mounts
        setIsVisible(true);

        // Optional: Add scroll trigger animation
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="relative bg-gray-900 text-white rounded-lg p-8 my-12 overflow-hidden">
            <h2 className="text-3xl font-bold mb-8 text-center">Powerful Plugin Management</h2>

            <div className="hidden md:flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Image Column */}
                <div className="relative w-full md:w-1/2 h-96">
                    <div className={`relative h-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
                        {/* Feature Highlights with Lines */}
                        <div className={`absolute top-[-33%] -right-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center">
                                <div className="bg-green-500/20 text-green-400 p-2 rounded-lg shadow-lg">
                                    <span className="font-bold text-sm">Familiar Plugin Interface</span>
                                </div>
                                <div className="w-16 h-0.5 bg-green-500"></div>
                            </div>
                        </div>

                        <div className={`absolute top-[-15%] -right-2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center">
                                <div className="bg-blue-500/20 text-blue-400  p-2 rounded-lg shadow-lg">
                                    <span className="font-bold text-sm">
                                        Easy Configuration
                                    </span>
                                </div>
                                <div className="w-16 h-0.5 bg-blue-500"></div>
                            </div>
                        </div>

                        <div className={`absolute top-[125%] -right-2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center">
                                <div className="bg-[#5865f2]/20 text-[#5865f2] p-2 rounded-lg shadow-lg">
                                    <span className="font-bold text-sm">
                                        Discord Integration
                                    </span>
                                </div>
                                <div className="w-16 h-0.5 bg-[#5865f2]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <img
                    src={PluginDemo}
                    alt="Plugin Interface Screenshot"
                    className="h-[700px] rounded-lg mx-auto"
                />

                {/* Text Column */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className={`bg-gray-800 p-4 rounded-lg transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'}`}>
                        <h3 className="text-xl font-bold text-green-500 mb-2 flex flex-row"><Unplug  className="mr-2" />Familiar Plugin Interface</h3>
                        <p>Kraken plugins is built directly on top of RuneLite. The interface follows RuneLite's established plugin patterns so you'll feel right at home.</p>
                    </div>

                    <div className={`bg-gray-800 p-4 rounded-lg transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'}`}>
                        <h3 className="text-xl font-bold text-blue-500 mb-2 flex flex-row" ><CogIcon  className="mr-2" /> Easy Configuration</h3>
                        <p>Simple toggle switches let you enable or disable plugins with a single click. Access detailed settings with the configuration button right next to each plugin.</p>
                    </div>

                    <div className={`bg-gray-800 p-4 rounded-lg transition-all duration-700 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'}`}>
                        <h3 className="text-xl font-bold text-[#5865f2] mb-2 flex flex-row"><img src={DiscordIcon} className="mr-2 bg-[#5865f2] rounded-md p-1" height={25} width={25} /> Discord Integration</h3>
                        <p>Login once with Discord and all your plugins from Kraken will be instantly loaded.</p>
                    </div>
                </div>
            </div>

            <div className={`mt-8 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div>
                    <button className="bg-gradient-to-r flex items-center mx-auto from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all" onClick={() => window.location.href = '/plugins'}>
                        See All Plugins <Unplug className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PluginShowcase;