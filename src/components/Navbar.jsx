import React from 'react';
import {ChevronDown} from 'lucide-react';
import {Skeleton} from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from '@/assets/logo.png'
import {Button} from "@/components/ui/button";
import {discordRedirect} from "@/lib/utils";
import DiscordLogo from "@/assets/discord-mark-white.svg";


const Navbar = ({ onLogout, userId, avatarId, skeleton, onBillingSession }) => {
    if(skeleton) {
        return (
            <div className="bg-slate-700 text-white p-4 bg-gradient-to-r from-slate-700 to-slate-800 opacity-95 drop-shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <nav className="flex space-x-4">

                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                            <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-[50px]" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-700 text-white p-2 bg-gradient-to-r from-slate-700 to-slate-800 opacity-95 drop-shadow-lg">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <nav className="flex space-x-4">
                        <img src={Logo} alt="logo" height={40} width={40} />
                        <h3>Kraken Plugins</h3>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="/" className="hover:text-green-500 text-white-400 transition-colors">Home</a>
                    <a href="/plugins" className="hover:text-green-500 text-white-400 transition-colors">Plugins</a>
                    <a href="/tokens" className="hover:text-green-500 text-white-400 transition-colors">Purchase Tokens</a>
                    {
                        userId ?  <DropdownMenu>
                                <ChevronDown />
                                <DropdownMenuTrigger asChild>
                                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center cursor-pointer">
                                        <img alt="user profile avatar"
                                             src={`https://cdn.discordapp.com/avatars/${userId}/${avatarId}?size=56`}
                                             className="w-10 h-10 rounded-full border-2 border-gray-800"/>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => window.location.href = "/dashboard"}>
                                            Dashboard
                                            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = "/profile"}>
                                            Profile
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={onBillingSession}>
                                            Billing
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.location.href = "/support"}>
                                            Support
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onLogout}>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>:
                            <Button onClick={() => discordRedirect()} className="bg-[#5865f2] hover:bg-[#707cfa] active:bg-[#4c5bfc] focus:outline-none focus:bg-[#4c5bfc] text-white text-sm font-medium">
                                <img src={DiscordLogo} height={25} width={25} />
                                Sign In with Discord
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar