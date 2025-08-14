import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion";
import VideoMP4 from '@/assets/runelite_masked_v2.mp4'

export default function VideoShowcase() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 } // Start loading when 40% visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !videoRef.current) return;

        const video = videoRef.current;

        const handleLoadedData = () => {
            setIsLoaded(true);
            video.play().catch(console.error);
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.load(); // Start loading only when visible

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [isVisible]);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Glow effect background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-indigo-500 rounded-xl opacity-50 blur-xl perspective-distant translate-x-12" />

            {/* Video container with perspective effect */}
            <div className="relative rounded-lg p-0 transform perspective-dramatic">
                <div className="rounded-md overflow-hidden shadow-xl relative bg-emerald-400 p-1 -rotate-y-3 rotate-x-0 hover:-rotate-y-1 transition-transform duration-300">
                    {/* Placeholder/Loading state */}
                    {(!isVisible || !isLoaded) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-md min-h-[200px]">
                            {isVisible ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
                            ) : (
                                <div className="text-gray-400 text-sm">Video will load when visible</div>
                            )}
                        </div>
                    )}

                    {/* Video element - only render when visible */}
                    {isVisible && (
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                                isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata" // Only load metadata until we need to play
                        >
                            <source src={VideoMP4} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    {/* Reflection effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm opacity-30" />
                </div>
            </div>

            {/* Caption */}
            <p className="text-center text-indigo-200 mt-4 text-sm">
                Experience Kraken plugins in action
            </p>
        </motion.div>
    );
}