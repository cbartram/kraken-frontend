import {useEffect, useState} from 'react';
import { X, Cookie, Check, Shield } from 'lucide-react';
import ReactGA from "react-ga4";

export default function CookiePolicy({ showPolicy, onCookiePolicyClick, onClose }) {
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false
    });

    // If policy is hidden, show a button to reopen it
    if (!showPolicy) {
        return (
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={() => onCookiePolicyClick()}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all"
                >
                    <Cookie size={16} />
                    Cookie Settings
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-end justify-center p-4 sm:p-6 z-50">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />

            <div className="relative w-full max-w-4xl bg-slate-50 rounded-lg shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-slate-100 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <Cookie className="text-green-600" size={24} />
                        <h2 className="text-lg font-semibold text-slate-800">Cookie Policy</h2>
                    </div>
                    <button
                        onClick={() => onClose()}
                        className="p-1 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <X size={20} className="text-slate-600" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                        <p className="text-slate-700">
                            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                            By clicking "Accept All", you consent to our use of cookies while on the Kraken Plugins website.
                        </p>

                        {/* Toggle for detailed settings */}
                        <div>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                            >
                                {showDetails ? 'Hide Details' : 'Customize Settings'}
                                <Shield size={16} />
                            </button>
                        </div>

                        {/* Detailed Cookie Settings */}
                        {showDetails && (
                            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-slate-800">Necessary Cookies</h3>
                                        <p className="text-sm text-slate-600">Essential for the website to function properly</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-not-allowed">
                                        <input
                                            type="checkbox"
                                            checked={preferences.necessary}
                                            disabled
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-green-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-slate-800">Analytics Cookies</h3>
                                        <p className="text-sm text-slate-600">Help us understand how visitors interact with our website</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytics}
                                            onChange={() => setPreferences({...preferences, analytics: !preferences.analytics})}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-slate-800">Marketing Cookies</h3>
                                        <p className="text-sm text-slate-600">Used to display personalized advertisements</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={preferences.marketing}
                                            onChange={() => setPreferences({...preferences, marketing: !preferences.marketing})}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer with Actions */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-end p-4 bg-slate-100 border-t border-slate-200">
                    <button
                        onClick={() => onClose()}
                        className="w-full sm:w-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors"
                    >
                        Save Preferences
                    </button>
                    <button
                        onClick={() => onClose()}
                        className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <Check size={16} />
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}