
import React, {useEffect, useState} from 'react';
import {CalendarDays, Package, AlertCircle, Key, AlarmClockOff, Search} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import {useAuth} from "@/components/AuthContext.jsx";
import Navbar from "@/components/Navbar.jsx";
import SkeletonLoading from "@/components/SkeletonLoading.jsx";
import {formatDate, isPluginExpired} from "@/lib/utils.js";
import Footer from "@/components/Footer.jsx";

const Profile = () => {
    const {user, logout, loading} = useAuth();
    const [plugins, setPlugins] = useState([]);

    // New state for search and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPlugins, setFilteredPlugins] = useState([]);
    const itemsPerPage = 3; // Number of plugins per page

    useEffect(() => {
        if (user != null) {
            setPlugins(user.plugins);
            setFilteredPlugins(user.plugins);
        }
    }, [user]);

    useEffect(() => {
        if (plugins.length > 0) {
            console.log(plugins[0])
            const results = plugins.filter(plugin =>
                plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plugin.licenseKey.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlugins(results);
            setCurrentPage(1); // Reset to first page on new search
        }
    }, [searchQuery, plugins]);

    const getDaysUntilExpiration = (expirationTimestamp) => {
        const now = new Date();
        const expirationDate = new Date(expirationTimestamp);
        const diffTime = expirationDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const isExpiringSoon = (expirationTimestamp) => {
        const daysUntilExpiration = getDaysUntilExpiration(expirationTimestamp);
        return daysUntilExpiration <= 7 && daysUntilExpiration > 0;
    };

    const getPluginStatusBadge = (plugin) => {
        if (isPluginExpired(plugin.expirationTimestamp)) {
            return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>;
        } else if (isExpiringSoon(plugin.expirationTimestamp)) {
            return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Expiring Soon</Badge>;
        } else {
            return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Active</Badge>;
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredPlugins.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPlugins = filteredPlugins.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers for pagination
    const getPaginationItems = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={i === currentPage}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return items;
    };

    if(loading || user === null) {
        return <SkeletonLoading />;
    }

    return (
        <>
            <Navbar
                onLogout={logout}
                user={user}
            />
            <div className="min-h-screen p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white">Account</h1>
                        <p className="text-gray-600">Manage your account details and plugins</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* User Profile Card */}
                        <Card className="md:col-span-1 bg-gray-100 h-fit">
                            <CardHeader>
                                <CardTitle className="text-xl">Profile</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center space-y-4">
                                    <img
                                        src={user.avatarId.length > 0 ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatarId}?size=56`: 'https://kraken-plugins.duckdns.org/default.png'}
                                        alt="Avatar"
                                        className="rounded-full w-20 h-20 border border-gray-200"
                                    />
                                    <div className="text-center">
                                        <h3 className="font-medium text-gray-900">{user.discordUsername}</h3>
                                        <p className="text-sm text-gray-500">Discord ID: {user.discordId}</p>
                                        <p className="text-sm text-gray-500">Email: {user.email}</p>
                                        <div className="mt-2 flex items-center justify-center">
                                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                {user.tokens} Tokens
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Plugins Card */}
                        {plugins.length > 0 ? (
                            <Card className="md:col-span-2 bg-gray-100">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                    <div>
                                        <CardTitle className="text-xl">Purchased Plugins</CardTitle>
                                        <CardDescription>Currently active plugins</CardDescription>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        {filteredPlugins.length} {filteredPlugins.length === 1 ? 'Plugin' : 'Plugins'}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    {/* Search Input */}
                                    <div className="mb-6 relative">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Search plugins..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 bg-white"
                                            />
                                        </div>
                                    </div>

                                    {filteredPlugins.length > 0 ? (
                                        <>
                                            <div className="space-y-8">
                                                {currentPlugins.map((plugin, index) => (
                                                    <div key={plugin.id} className="p-4 bg-white rounded-lg shadow-sm">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-xl font-semibold text-gray-900">{plugin.name}</h3>
                                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                                    <Package className="h-4 w-4 mr-2" />
                                                                    <span>Plugin ID: {plugin.id}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {getPluginStatusBadge(plugin)}
                                                            </div>
                                                        </div>

                                                        <Separator className="my-4" />

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                                            <div className="p-3 bg-gray-50 rounded-md space-y-1">
                                                                <p className="text-sm font-medium text-gray-900">Purchase Date</p>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <CalendarDays className="h-4 w-4 mr-2" />
                                                                    <span>{formatDate(plugin.createdAt)}</span>
                                                                </div>
                                                            </div>

                                                            <div className="p-3 bg-gray-50 rounded-md space-y-1">
                                                                <p className="text-sm font-medium text-gray-900">Expiration Date</p>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <CalendarDays className="h-4 w-4 mr-2" />
                                                                    <span>{formatDate(plugin.expirationTimestamp)}</span>
                                                                </div>
                                                            </div>

                                                            <div className="p-3 bg-gray-50 rounded-md space-y-1">
                                                                <p className="text-sm font-medium text-gray-900">License Key</p>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <Key className="h-4 w-4 mr-2" />
                                                                    <span>{plugin.licenseKey}</span>
                                                                </div>
                                                            </div>

                                                            <div className="p-3 bg-gray-50 rounded-md space-y-1">
                                                                <p className="text-sm font-medium text-gray-900">Days until Expiration</p>
                                                                <div className="flex items-center text-sm text-gray-500">
                                                                    <AlarmClockOff className="h-4 w-4 mr-2" />
                                                                    <span>{getDaysUntilExpiration(plugin.expirationTimestamp)}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {isExpiringSoon(plugin.expirationTimestamp) && (
                                                            <div className="bg-orange-50 p-4 rounded-lg flex items-start mt-4">
                                                                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900">
                                                                        Your plugin is expiring soon
                                                                    </p>
                                                                    <p className="text-sm text-gray-700 mt-1">
                                                                        {`${getDaysUntilExpiration(plugin.expirationTimestamp)} days until your plugin expires.`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Pagination Controls */}
                                            {totalPages > 1 && (
                                                <div className="mt-8">
                                                    <Pagination>
                                                        <PaginationContent>
                                                            {currentPage > 1 && (
                                                                <PaginationItem>
                                                                    <PaginationPrevious
                                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                                    />
                                                                </PaginationItem>
                                                            )}

                                                            {getPaginationItems()}

                                                            {currentPage < totalPages && (
                                                                <PaginationItem>
                                                                    <PaginationNext
                                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                                    />
                                                                </PaginationItem>
                                                            )}
                                                        </PaginationContent>
                                                    </Pagination>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900">No plugins found</h3>
                                            <p className="text-gray-500 mt-1">
                                                {searchQuery ? 'Try a different search query' : 'No plugins available'}
                                            </p>
                                            {searchQuery && (
                                                <Button
                                                    variant="outline"
                                                    className="mt-4"
                                                    onClick={() => setSearchQuery('')}
                                                >
                                                    Clear Search
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="md:col-span-2">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                    <div>
                                        <CardTitle className="text-xl">Plugins</CardTitle>
                                        <CardDescription>Your purchased plugins</CardDescription>
                                    </div>
                                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">No Plugins</Badge>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="space-y-6">
                                        <p className="text-lg">You haven't purchased any plugins yet.</p>
                                        <Button className="bg-green-400 hover:bg-green-500 focus:border-0 active:border-0 focus:outline-none active:outline-none" onClick={() => window.location.href = "/plugins"}>
                                            Browse Plugins
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;