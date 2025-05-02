import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Coins } from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const PurchaseTokens = () => {
    const {user, logout, api, loading, getUser} = useAuth()
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [purchaseLoading, setPurchaseLoading] = useState(false);

    const tokenPackages = [
        { id: 1, amount: 100, price: 1.99, key: 'kraken_token_100' },
        { id: 2, amount: 500, price: 5.99, key: 'kraken_token_500' },
        { id: 3, amount: 1000, price: 9.99, key: 'kraken_token_1000' },
        { id: 4, amount: 5000, price: 39.99, key: 'kraken_token_5000' },
        { id: 5, amount: 10000, price: 79.99, key: 'kraken_token_10000' },
        { id: 6, amount: 25000, price: 119.99, key: 'kraken_token_25000' }
    ];

    const handleSelectPackage = (packageId) => {
        setSelectedPackage(packageId);
    };

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        getUser()
    }, [])


    const handlePurchase = async () => {
        if (!selectedPackage) return;
        setPurchaseLoading(true);
        const pkg = tokenPackages.find(pkg => pkg.id === selectedPackage)

        try {
            const res = await api.createCheckoutSession(pkg.key)
            window.location.href = res.url
        } catch (error) {
            console.error(`failed to created checkout session: ${error.message}`);
        } finally {
            setPurchaseLoading(false);
        }
    };

    const renderPurchaseButton = () => {
        if (user != null) {
            return <Button
                onClick={handlePurchase}
                disabled={!selectedPackage || purchaseLoading}
                className="w-full md:w-auto bg-green-200 text-green-800 hover:bg-green-300 py-6 hover:border-0 hover:border-green-200 sm:w-auto"
                size="lg"
            >
                {selectedPackage ?
                    `Purchase ${tokenPackages.find(pkg => pkg.id === selectedPackage)?.amount.toLocaleString()} Tokens` :
                    'Select a Package'}
            </Button>
        }

        return <Button
            onClick={() => window.location.href = '/login'}
            disabled={!selectedPackage || purchaseLoading}
            className="w-full md:w-auto bg-green-200 text-green-800 hover:bg-green-300 py-6 hover:border-0 hover:border-green-200 sm:w-auto"
            size="lg"
        >
            {selectedPackage ?
                `Login to Purchase ${tokenPackages.find(pkg => pkg.id === selectedPackage)?.amount.toLocaleString()} Tokens` :
                'Select a Package'}
        </Button>
    }

    return (
        <div>
            <Navbar user={user} onLogout={logout} loading={loading} />
            <div className="flex flex-col items-center min-h-screen p-6">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Purchase Tokens</h1>
                        <p className="text-slate-600 mt-2">Select a token package to unlock Kraken's suite of plugins</p>
                    </div>

                    <Card className="mb-6 bg-gray-100">
                        <CardHeader>
                            <CardTitle>Choose Token Package</CardTitle>
                            <CardDescription>Select the amount of tokens you wish to purchase</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tokenPackages.map((pkg) => (
                                    <div key={pkg.id} className="relative">
                                        <RadioGroupItem
                                            value={pkg.id.toString()}
                                            id={`package-${pkg.id}`}
                                            className="sr-only"
                                            checked={selectedPackage === pkg.id}
                                            onClick={() => handleSelectPackage(pkg.id)}
                                        />
                                        <Label
                                            htmlFor={`package-${pkg.id}`}
                                            className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                                selectedPackage === pkg.id
                                                    ? 'bg-green-50 border-green-500 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="bg-green-100 p-3 rounded-full mb-3">
                                                <Coins className="w-6 h-6 text-green-600" />
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900">{pkg.amount.toLocaleString()}</span>
                                            <span className="text-sm text-slate-500 mb-2">tokens</span>
                                            <span className="text-lg font-semibold text-slate-900">${pkg.price}</span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t pt-6">
                            { renderPurchaseButton() }
                        </CardFooter>
                    </Card>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Why Purchase Tokens?</h2>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start">
                              <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span>Access premium RuneLite plugins to enhance your gameplay</span>
                            </li>
                            <li className="flex items-start">
                                <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Customize your Old School RuneScape experience with plugins for Skilling and Bossing</span>
                            </li>
                            <li className="flex items-start">
                              <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                                <span>Support ongoing development of new plugins</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseTokens;