import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Coins, DollarSign, Info} from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import Footer from "@/components/Footer.jsx";
import ReactGA from "react-ga4";

const PurchaseTokens = () => {
    const {user, logout, api, loading, getUser} = useAuth()
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('money'); // 'money' or 'gp'
    const [gpPaymentSubmitted, setGpPaymentSubmitted] = useState(false);
    const [submittedPackageInfo, setSubmittedPackageInfo] = useState(null);

    // GP payment form state
    const [gpPaymentInfo, setGpPaymentInfo] = useState({
        ingameUsername: '',
        emailAddress: ''
    });

    const tokenPackages = [
        {
            id: 1,
            amount: 100,
            price: 1.99,
            gpPrice: 15000000,
            key: 'kraken_token_100'
        },
        {
            id: 2,
            amount: 500,
            price: 5.99,
            gpPrice: 25000000,
            key: 'kraken_token_500'
        },
        {
            id: 3,
            amount: 1000,
            price: 9.99,
            gpPrice: 40000000,
            key: 'kraken_token_1000'
        },
        {
            id: 4,
            amount: 5000,
            price: 39.99,
            gpPrice: 150000000, // 60M GP
            key: 'kraken_token_5000'
        },
        {
            id: 5,
            amount: 10000,
            price: 79.99,
            gpPrice: 500000000, // 120M GP
            key: 'kraken_token_10000'
        },
        {
            id: 6,
            amount: 25000,
            price: 119.99,
            gpPrice: 1000000000, // 180M GP
            key: 'kraken_token_25000'
        }
    ];

    const handleSelectPackage = (packageId) => {
        setSelectedPackage(packageId);
    };

    const handleGpPaymentInfoChange = (field, value) => {
        setGpPaymentInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatGP = (amount) => {
        if(amount >= 1000000000) {
            return `${(amount / 1000000000).toFixed(0)}B`;
        }

        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(0)}M`;
        }
        return amount;
    };

    useEffect(() => {
        getUser()
        ReactGA.send({
            hitType: 'pageview',
            page: "/purchase",
            title: "Purchase Tokens Page",
        });
    }, [])

    const handlePurchase = async () => {
        if (!selectedPackage) return;
        setPurchaseLoading(true);
        const pkg = tokenPackages.find(pkg => pkg.id === selectedPackage)

        try {
            if (paymentMethod === 'money') {
                const res = await api.createCheckoutSession(pkg.key)
                window.location.href = res.url
            } else {
                const res = await api.sendEmail("GP Purchase Request:", user?.discordUsername, `
                The user ${user?.discordUsername},
                has made a purchase request for ${pkg.amount.toLocaleString()} tokens with ${formatGP(pkg.gpPrice)} GP.
                In-game username: ${gpPaymentInfo.ingameUsername}
                Email address: ${gpPaymentInfo.emailAddress}
                Discord ID: ${user?.discordId}
                Discord Username: ${user?.discordUsername}
                You must PM/email them in game a world to hop to, collect payment asap, and update their kraken db with an additional ${pkg.amount.toLocaleString()} tokens
                `)
                console.log('Email sent:', res);
                setGpPaymentSubmitted(true);
            }
        } catch (error) {
            console.error(`failed to process purchase: ${error.message}`);
        } finally {
            setPurchaseLoading(false);
        }
    };

    const isGpFormValid = () => {
        return gpPaymentInfo.ingameUsername.trim() !== '' &&
            gpPaymentInfo.emailAddress.trim() !== '';
    };

    const renderPurchaseButton = () => {
        const selectedPkg = tokenPackages.find(pkg => pkg.id === selectedPackage);
        const isDisabled = !selectedPackage || purchaseLoading ||
            (paymentMethod === 'gp' && !isGpFormValid());

        if (user != null) {
            return <Button
                onClick={handlePurchase}
                disabled={isDisabled}
                className={`w-full md:w-auto ${paymentMethod === 'gp' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300 hover:border-yellow-200' : 'bg-green-200 text-green-800 hover:bg-green-300 hover:border-0 hover:border-green-200' } py-6 sm:w-auto`}
                size="lg"
            >
                {selectedPackage ?
                    `Purchase ${selectedPkg?.amount.toLocaleString()} Tokens ${paymentMethod === 'gp' ? `for ${formatGP(selectedPkg?.gpPrice)} GP` : `for $${selectedPkg?.price}`}` :
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
                `Login to Purchase ${selectedPkg?.amount.toLocaleString()} Tokens` :
                'Select a Package'}
        </Button>
    }

    return (
        <div>
            <Navbar user={user} onLogout={logout} loading={loading} />
            <div className="flex flex-col items-center min-h-screen p-4">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Purchase Tokens</h1>
                        <p className="text-slate-600 mt-2">Select a token package to unlock Kraken's suite of plugins</p>
                    </div>

                    {
                        gpPaymentSubmitted ? (
                        // GP Payment Success View
                        <Card className="mb-6 bg-green-50 border-green-200">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <CardTitle className="text-2xl text-green-800">GP Payment Request Received!</CardTitle>
                                <CardDescription className="text-green-700 text-lg mt-2">
                                    Your request for {submittedPackageInfo?.amount} tokens has been successfully submitted.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-white p-4 rounded-lg border border-green-200">
                                    <h3 className="font-semibold text-green-800 mb-3">Order Summary</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Tokens:</span>
                                            <span className="ml-2 text-gray-900">{tokenPackages.find(pkg => pkg.id === selectedPackage)?.amount}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">GP Amount:</span>
                                            <span className="ml-2 text-gray-900">{formatGP(tokenPackages.find(pkg => pkg.id === selectedPackage)?.gpPrice)} GP</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">In-game Username:</span>
                                            <span className="ml-2 text-gray-900">{gpPaymentInfo?.ingameUsername}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Email:</span>
                                            <span className="ml-2 text-gray-900">{gpPaymentInfo?.emailAddress}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                                    <ul className="text-sm text-blue-700 space-y-2">
                                        <li className="flex items-start">
                                <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                            You will receive an <span className="font-bold mx-1">email confirmation</span> shortly at {gpPaymentInfo?.emailAddress}
                                        </li>
                                        <li className="flex items-start">
                                <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                            A staff member will <span className="font-bold mx-1">private message you in-game</span> at "{gpPaymentInfo?.ingameUsername}" with a world to meet
                                        </li>
                                        <li className="flex items-start">
                                <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                            Meet at the <span className="font-bold mx-1">Grand Exchange</span> on the specified world to complete the GP transfer
                                        </li>
                                        <li className="flex items-start">
                                <span className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                            Your tokens will be <span className="font-bold mx-1">automatically added</span> to your account once payment is received
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                    <p className="text-sm text-yellow-700">
                                        <strong>Please note:</strong> Orders placed between 9:00 PM - 8:00 AM U.S. Eastern Standard Time may experience delays.
                                        Make sure your private chat is set to <span className="font-bold">ON</span> so we can contact you in-game.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center">
                                <Button
                                    onClick={() => {
                                        setGpPaymentSubmitted(false);
                                        setSelectedPackage(null);
                                        setGpPaymentInfo({ ingameUsername: '', emailAddress: '' });
                                        setSubmittedPackageInfo(null);
                                    }}
                                    variant="outline"
                                    className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                    Make Another Purchase
                                </Button>
                            </CardFooter>
                        </Card>
                        ) : (
                    <>
                    {/* Payment Method Toggle */}
                    <Card className="mb-6 bg-gray-100">
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Choose how you'd like to pay for tokens</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-4">
                                <Button
                                    variant={paymentMethod === 'money' ? 'default' : 'outline'}
                                    onClick={() => setPaymentMethod('money')}
                                    className={`flex items-center space-x-2 ${
                                        paymentMethod === 'money'
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'border-green-200 text-green-700 hover:bg-green-50'
                                    }`}
                                >
                                    <DollarSign className="w-4 h-4" />
                                    <span>US Dollar</span>
                                </Button>
                                <Button
                                    variant={paymentMethod === 'gp' ? 'default' : 'outline'}
                                    onClick={() => setPaymentMethod('gp')}
                                    className={`flex items-center space-x-2 ${
                                        paymentMethod === 'gp'
                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                            : 'border-yellow-200 text-yellow-700 hover:bg-yellow-50'
                                    }`}
                                >
                                    <Coins className="w-4 h-4" />
                                    <span>OSRS GP</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6 bg-gray-100">
                        <CardHeader>
                            <CardTitle>Choose Token Package</CardTitle>
                            <CardDescription>
                                Select the amount of tokens you wish to purchase
                                {paymentMethod === 'gp' ? ' with OSRS GP' : ' with real money'}
                            </CardDescription>
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
                                                    ? paymentMethod === 'gp'
                                                        ? 'bg-yellow-50 border-yellow-500 shadow-md'
                                                        : 'bg-green-50 border-green-500 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className={`p-3 rounded-full mb-3 ${
                                                paymentMethod === 'gp'
                                                    ? 'bg-yellow-100'
                                                    : 'bg-green-100'
                                            }`}>
                                                <Coins className={`w-6 h-6 ${
                                                    paymentMethod === 'gp'
                                                        ? 'text-yellow-600'
                                                        : 'text-green-600'
                                                }`} />
                                            </div>
                                            <span className="text-2xl font-bold text-slate-900">{pkg.amount.toLocaleString()}</span>
                                            <span className="text-sm text-slate-500 mb-2">tokens</span>
                                            <span className="text-lg font-semibold text-slate-900">
                                                {paymentMethod === 'gp'
                                                    ? `${formatGP(pkg.gpPrice)} GP`
                                                    : `$${pkg.price}`
                                                }
                                            </span>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter className="flex-col justify-end border-t pt-6">
                            {paymentMethod === 'gp' && (
                                <div className="w-full mb-6">
                                    {/* GP Payment Information Form */}
                                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h3 className="font-semibold text-blue-800 mb-4">Payment Information</h3>
                                        <p className="text-blue-600 mb-6">Once GP has been paid, your tokens will be immediately updated for you to purchase plugins.</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="ingame-username" className="text-sm font-medium text-blue-700">
                                                    In-game Username *
                                                </Label>
                                                <Input
                                                    id="ingame-username"
                                                    type="text"
                                                    placeholder="Enter your OSRS username"
                                                    value={gpPaymentInfo.ingameUsername}
                                                    onChange={(e) => handleGpPaymentInfoChange('ingameUsername', e.target.value)}
                                                    className="mt-1"
                                                    required
                                                />
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Your username must exactly match your in game name. If it doesn't we cannot accept GP from the account.
                                                </p>
                                            </div>
                                            <div>
                                                <Label htmlFor="email-address" className="text-sm font-medium text-blue-700">
                                                    Email Address *
                                                </Label>
                                                <Input
                                                    id="email-address"
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    value={gpPaymentInfo.emailAddress}
                                                    onChange={(e) => handleGpPaymentInfoChange('emailAddress', e.target.value)}
                                                    className="mt-1"
                                                    required
                                                />
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Your email is required in case we can't reach you in game for collecting the GP.
                                                </p>
                                            </div>
                                            <div>
                                                <Label htmlFor="discord-id" className="text-sm font-medium text-blue-700">
                                                    Discord ID
                                                </Label>
                                                <Input
                                                    id="discord-id"
                                                    type="text"
                                                    value={user?.discordId || 'Not available'}
                                                    className="mt-1 bg-gray-100"
                                                    disabled
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="discord-username" className="text-sm font-medium text-blue-700">
                                                    Discord Username
                                                </Label>
                                                <Input
                                                    id="discord-username"
                                                    type="text"
                                                    value={user?.discordUsername || 'Not available'}
                                                    className="mt-1 bg-gray-100"
                                                    disabled
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger>
                                                    <div className="flex">
                                                        <Info className="mr-2" />
                                                        Additional Information
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="mx-4">
                                                        <ul className="mt-2 ml-4 list-disc text-blue-600">
                                                            <li>If your order is between the hours of 9:00 PM - 8:00 AM U.S. Eastern Standard Time there <span className="font-bold">will be a delay</span> in our ability to accept GP payment.</li>
                                                            <li>Make sure to have your private chat: <span className='font-bold'>ON</span> as information about the transfer may be communicated in-game if you are unreachable via email.</li>
                                                            <li>Double check your Kraken discord, if you have multiple discord accounts please make sure you are signed into the right one before purchasing tokens.</li>
                                                            <li>You will be contacted via email first and PM second about the world to hop to and a high level account will collect the GP at the Grand Exchange on the specified world.</li>
                                                        </ul>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            )}

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
                    </>
                    )
                }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PurchaseTokens;