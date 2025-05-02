import { useEffect, useRef } from "react"
import { motion } from "framer-motion";
import Video from '@/assets/runelite_masked.mp4'

export default function VideoShowcase() {
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
        <motion.div
            className="relative w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Glow effect background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-indigo-500 rounded-xl opacity-50 blur-xl perspective-distant translate-x-12" />

            {/* Video container with perspective effect */}
            <div className="relative  rounded-lg p-0 transform perspective-dramatic">
                <div className="rounded-md overflow-hidden shadow-xl relative bg-emerald-400 p-1 -rotate-y-3 rotate-x-0 hover:-rotate-y-1 transition-transform duration-300">
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