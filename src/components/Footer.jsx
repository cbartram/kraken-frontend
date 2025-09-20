import Logo from "@/assets/logo.png";
import CookiePolicy from "@/pages/legal/CookiePolicy.jsx";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.js";
import DiscordLogo from "@/assets/discord-mark-white.svg";
import {DISCORD_LINK} from "@/constants.jsx";

export default function Footer() {
    const [showCookiePolicy, setShowCookiePolicy] = useState(false);

    return (
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
                        <Button onClick={() => window.open(DISCORD_LINK, '_blank').focus()} className="mt-4  bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white text-sm font-medium">
                            <img src={DiscordLogo} height={25} width={25} />
                            Join our Discord
                        </Button>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-green-500">
                                <span className="sr-only">Discord</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500">
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500">
                                <span className="sr-only">GitHub</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Products</h4>
                        <ul className="space-y-2">
                            <li><a href="/plugins" className="text-gray-400 hover:text-green-500">Plugins</a></li>
                            <li><a href="/download" className="text-gray-400 hover:text-green-500">Client Download</a></li>
                            <li><a href="/purchase" className="text-gray-400 hover:text-green-500">Purchase Tokens</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="/faq" className="text-gray-400 hover:text-green-500">FAQ</a></li>
                            <li><a href={DISCORD_LINK} className="text-gray-400 hover:text-green-500">Discord</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="/privacy-policy" className="text-gray-400 hover:text-green-500">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-green-500" onClick={() => setShowCookiePolicy(true)}>Cookie Policy</a></li>
                            <li><a href="/terms-and-conditions" className="text-gray-400 hover:text-green-500">Terms & Conditions</a></li>
                            <li><a href="/admin/management/sales" className="text-gray-400 hover:text-green-500">Sales</a></li>
                        </ul>
                        <CookiePolicy
                            showPolicy={showCookiePolicy}
                            onCookiePolicyClick={() => setShowCookiePolicy(true)}
                            onClose={() => setShowCookiePolicy(false)}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}