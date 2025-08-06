import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {Plus, Percent, Clock, Tag, RefreshCw, Sparkles} from 'lucide-react';
import {useAuth} from "@/components/AuthContext.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const SalesManagement = () => {
    const { api, logout, loading, user } = useAuth()
    const [sales, setSales] = useState([]);
    const [plugins, setPlugins] = useState([])
    const [countdowns, setCountdowns] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        discount: 0,
        startTime: new Date(),
        endTime: new Date(),
        pluginNames: [],
        description: '',
        name: '',
        active: true,
    });
    const [submitting, setSubmitting] = useState(false);

    // Fetch active sales
    const fetchSales = async () => {
        try {
            setPageLoading(true);
            const response = await api.getSales();
            setSales(response);
            const plugins = await api.getPlugins();
            setPlugins(plugins.map(p => ({ value: p.name, label: p.title })));
            setError(null);
        } catch (err) {
            setError('Failed to fetch sales: ' + err.message);
            setSales([]);
        } finally {
            setPageLoading(false);
        }
    };

    // Create new sale
    const handleCreateSale = async () => {
        setSubmitting(true);
        setError(null);

        try {
            const saleData = {
                discount: parseInt(formData.discount),
                startTime: formData.startTime.toISOString(),
                endTime: formData.endTime.toISOString(),
                pluginNames: formData.pluginNames.map(name => name.trim()),
                description: formData.description,
                active: true,
                name: formData.name,
            };

            const response = await api.createSale(saleData.name, saleData.description, saleData.discount, saleData.startTime, saleData.endTime, saleData.active, saleData.pluginNames);
            console.log("Sale create response: ", response)
            // Reset form and refresh sales
            setFormData({
                name: '',
                active: true,
                discount: 0,
                startTime: new Date(),
                endTime: new Date(),
                pluginNames: [],
                description: ''
            });
            setShowCreateForm(false);
            fetchSales();
        } catch (err) {
            setError('Failed to create sale: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedCountdowns = {};
            sales.forEach(sale => {
                updatedCountdowns[sale.id] = calcTimeRemaining(sale.endTime);
            });
            setCountdowns(updatedCountdowns);
        }, 1000);

        return () => clearInterval(interval); // Cleanup
    }, [sales]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const calcTimeRemaining = (endTime) => {
        const now = new Date();
        const end = new Date(endTime);
        const diff = end - now;

        if (diff <= 0) return "Expired";

        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const isExpired = (endTime) => {
        return new Date(endTime) < new Date();
    };

    const isUpcoming = (startTime) => {
        return new Date(startTime) > new Date();
    };

    const getStatusBadge = (sale) => {
        if (isExpired(sale.endTime)) {
            return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>;
        }
        if (isUpcoming(sale.startTime)) {
            return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Ending Soon</Badge>;
        }
        return <Badge variant="default" className="bg-green-500/20 text-green-600 hover:bg-green-700 hover:text-white">Active</Badge>;
    };

    return (
        <div className="bg-gray-900 text-gray-100">
        <Navbar onLogout={logout} user={user} onBillingSession={() => {}} loading={loading} />
        <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white-900">Sales Management</h1>
                    <p className="text-gray-600 mt-2">Manage plugin sales and promotions</p>
                </div>
                <Button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Plus className="h-4 w-4" />
                    Create New Sale
                </Button>
            </div>

            {error && (
                <Alert className="mb-6 bg-red-600/20 border-0" variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Create Sale Form */}
            {showCreateForm && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Create New Sale</CardTitle>
                        <CardDescription>
                            Set up a new promotional sale for your plugins
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" className="py-2">Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Summer Sale"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="discount" className="py-2">Discount Percentage (1-99)</Label>
                                    <Input
                                        id="discount"
                                        type="number"
                                        min="1"
                                        max="99"
                                        value={formData.discount}
                                        onChange={(e) => setFormData({...formData, discount: e.target.value})}
                                        placeholder="25%"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="pluginNames" className="py-2">Plugin Names (comma-separated)</Label>
                                    <Select
                                        isMulti
                                        name="pluginNames"
                                        options={plugins}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Select plugins..."
                                        closeMenuOnSelect={false}
                                        value={formData.pluginNames.map(name => ({ value: name, label: name }))}
                                        onChange={(selectedOptions) =>
                                            setFormData({
                                                ...formData,
                                                pluginNames: selectedOptions.map(option => option.value)
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="start_time" className="py-2">Start Date & Time</Label>
                                    <div className="w-full bg-white rounded-md shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-green-500">
                                        <DateTimePicker
                                            onChange={(value) => setFormData({...formData, startTime: value})}
                                            value={formData.startTime}
                                            className="w-full"
                                            calendarClassName="!z-50"
                                            disableClock={true}
                                            clearIcon={null}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="end_time" className="py-2">End Date & Time</Label>
                                    <div className="w-full bg-white rounded-md shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-green-500">
                                        <DateTimePicker
                                            onChange={(value) => setFormData({...formData, endTime: value})}
                                            value={formData.endTime}
                                            className="w-full"
                                            calendarClassName="!z-50"
                                            disableClock={true}
                                            clearIcon={null}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description" className="py-2">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Get ready for a summer of fun with 25% of all these amazing plugins!"
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button onClick={handleCreateSale} disabled={submitting} className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <Plus />
                                    {submitting ? 'Creating...' : 'Create Sale'}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="text-white hover:text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sales List */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Current Sales</h2>
                    <Button variant="outline" onClick={fetchSales} disabled={pageLoading} className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white border-0 -focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <RefreshCw />
                        {pageLoading ? 'Loading...' : 'Refresh'}
                    </Button>
                </div>

                {pageLoading && sales.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="animate-pulse">Loading sales...</div>
                    </div>
                ) : sales.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Sales</h3>
                            <p className="text-gray-600">There are currently no active sales. Create one to get started!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {sales.map((sale) => (
                            <Card key={sale.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="flex items-center gap-3">
                                                <Sparkles className="h-5 w-5 text-blue-600" />
                                                {sale.name}
                                                {getStatusBadge(sale)}
                                                <Badge className="bg-indigo-500/20 text-indigo-600 hover:bg-indigo-700 hover:text-white">{sale.discount}% Off</Badge>
                                            </CardTitle>
                                            {sale.description && (
                                                <CardDescription className="mt-2">
                                                    {sale.description}
                                                </CardDescription>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="grid gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Tag className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Plugins Included</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {sale.plugins && sale.plugins.length > 0 ? (
                                                    sale.plugins.map((plugin, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {plugin.pluginMetadata.title}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-500">No plugins specified</span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium">Duration</span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p><span className="font-medium">Starts:</span> {formatDate(sale.startTime)}</p>
                                                <p><span className="font-medium">Ends:</span> {formatDate(sale.endTime)}</p>
                                                <p>
                                                    <span className="font-medium">
                                                        Time Remaining: &nbsp;
                                                    </span>
                                                    <Badge className="bg-indigo-500/20 text-indigo-600 hover:bg-indigo-700 hover:text-white">{countdowns[sale.id] || '...'}</Badge>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {sale.id && (
                                        <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                                            Sale ID: {sale.id}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default SalesManagement;