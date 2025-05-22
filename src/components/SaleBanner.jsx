import React, { useState, useEffect } from 'react';
import { Clock, Tag, Calendar } from 'lucide-react';

const SaleBanner = ({ saleData }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!saleData) return;

        const updateTimer = () => {
            const now = new Date();
            const startTime = new Date(saleData.startTime);
            const endTime = new Date(saleData.endTime);

            if (now < startTime) {
                // Sale hasn't started yet
                const diff = startTime - now;
                setTimeLeft(calculateTimeLeft(diff));
                setIsActive(false);
            } else if (now >= startTime && now <= endTime) {
                // Sale is active
                const diff = endTime - now;
                setTimeLeft(calculateTimeLeft(diff));
                setIsActive(true);
            } else {
                // Sale has ended
                setTimeLeft(null);
                setIsActive(false);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [saleData]);

    const calculateTimeLeft = (diff) => {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            })
        };
    };

    if (!saleData || !saleData.active) {
        return null;
    }

    const startDateTime = formatDateTime(saleData.startTime);
    const endDateTime = formatDateTime(saleData.endTime);

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 border border-purple-500/30 rounded-lg mb-8 shadow-2xl">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 animate-pulse"></div>

            <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Sale Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                                <Tag className="h-4 w-4 text-yellow-300" />
                                <span className="text-yellow-300 font-bold text-sm">
                  {saleData.discount}% OFF
                </span>
                            </div>
                            {isActive && (
                                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-300 font-medium text-sm">LIVE NOW</span>
                                </div>
                            )}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {saleData.name}
                        </h2>

                        <p className="text-gray-100 text-lg mb-4 max-w-2xl">
                            {saleData.description}
                        </p>

                        {/* Sale Duration */}
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-200">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-green-300" />
                                <span>
                  <strong>Starts:</strong> {startDateTime.date} at {startDateTime.time}
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-red-300" />
                                <span>
                  <strong>Ends:</strong> {endDateTime.date} at {endDateTime.time}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    {timeLeft && (
                        <div className="flex-shrink-0">
                            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="flex items-center gap-2 mb-3 justify-center">
                                    <Clock className="h-5 w-5 text-white" />
                                    <span className="text-white font-medium">
                    {isActive ? 'Ends In' : 'Starts In'}
                  </span>
                                </div>

                                <div className="grid grid-cols-4 gap-2 text-center min-w-[280px]">
                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-white">
                                            {timeLeft.days.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-gray-300 uppercase tracking-wide">
                                            Days
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-white">
                                            {timeLeft.hours.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-gray-300 uppercase tracking-wide">
                                            Hours
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-white">
                                            {timeLeft.minutes.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-gray-300 uppercase tracking-wide">
                                            Minutes
                                        </div>
                                    </div>

                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-white">
                                            {timeLeft.seconds.toString().padStart(2, '0')}
                                        </div>
                                        <div className="text-xs text-gray-300 uppercase tracking-wide">
                                            Seconds
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaleBanner;