import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Heart } from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                className="flex justify-between items-center w-full py-4 px-6 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-lg text-indigo-900">{question}</span>
                {isOpen ? (
                    <ChevronUp className="flex-shrink-0 text-green-600" size={20} />
                ) : (
                    <ChevronDown className="flex-shrink-0 text-green-600" size={20} />
                )}
            </button>

                {isOpen && (
                    <div className="text-gray-600 px-6 py-4">{answer}</div>
                )}
        </div>
    );
};

const FAQSection = ({ title, questions }) => {
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-200 mb-4">{title}</h3>
            <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                {questions.map((item, index) => (
                    <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
        </div>
    );
};

const FAQPage = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const generalQuestions = [
        {
            question: "How do I download the client?",
            answer: (
                <div className="space-y-2">
                    <p>You can download our client application from the client page <a href="/download" className="text-indigo-600 underline">here</a>.</p>
                    <p className="text-sm mt-2">Note: Make sure you're logged in to access the download section.</p>
                </div>
            )
        },
        {
            question: "Is this software safe?",
            answer: (
                <div className="space-y-2">
                    <p>Yes, our software is completely safe to use however, these plugins are <span className="font-bold">not</span> sanctioned by RuneLite. Although they are not bots
                        they are not approved for public use because of their overpowered nature. Bans, although unlikely <span className="font-bold">can still happen</span> and
                        Kraken is <span className="font-bold">not</span> responsible.
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>Kraken does <span className="font-bold">not</span> modify the RuneLite client in any way.</li>
                        <li>Kraken makes <span className="font-bold">minor</span> modifications to the RuneLite launcher (the application which launches the RuneLite client).</li>
                        <li>Krakens plugins are loaded securely through signed URL's at runtime and passed to the RuneLite client the same way as all your plugin hub plugins are loaded.</li>
                    </ul>
                    <p className="text-sm mt-2">Our software is also code-signed so you can verify its authenticity before installation.</p>
                </div>
            )
        },
        {
            question: "What if I just want normal RuneLite for a bit?",
            answer: (
                <div className="space-y-2">
                    <p>
                        The Kraken Launcher comes with "RuneLite" mode. If you press the start (Windows for Windows, and Cmd for Mac) key on your keyboard
                        you can search for "RuneLite (Configure)" hit enter, and check "RuneLite mode" and press save. From here on out no Kraken plugins will
                        be loaded. It will just be normal RuneLite, well, more normal RuneLite than Kraken's RuneLite already is.
                    </p>
                </div>
            )
        },
        {
            question: "Does Kraken support Jagex Accounts?",
            answer: (
                <div className="space-y-2">
                    <p>
                        The Kraken Launcher is compatible with the Jagex accounts as well as the Jagex launcher. In order to use the Kraken Launcher with Jagex accounts follow this guide:
                    </p>
                    <ul className="list-disc list-inside pl-4 space-y-1">
                        <li>For Windows, run RuneLite (configure) from the start menu. Otherwise, pass --configure to the launcher (i.e. /Applications/RuneLite.app/Contents/MacOS/RuneLite --configure on Mac).</li>
                        <li>In the Client arguments input box add --insecure-write-credentials</li>
                        <li>Click Save</li>
                        <li>Launch RuneLite normally via the Jagex launcher. RuneLite will write your launcher credentials to .runelite/credentials.properties.</li>
                        <li>On your next launch it will use the saved credentials allowing you to use your Jagex account with Kraken plugins.</li>
                    </ul>
                    <p className="text-sm mt-2">If you want to use a non-jagex account with Kraken you can delete the credentials.properties file to return your Kraken Client back to normal.
                        If for any reason you need to invalidate the credentials,
                        you can use the "End sessions" button under account settings on runescape.com.</p>
                </div>
            )
        },
        {
            question: "What are the system requirements?",
            answer: (
                <div>
                    <p>Our application is designed to run efficiently on most modern systems and shares the same requirements as RuneLite itself. Minimum requirements:</p>
                    <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                        <li>Operating System: Windows 10+, macOS 11.0+, or Ubuntu 20.04+</li>
                        <li>Processor: Dual-core 2.0 GHz or higher</li>
                        <li>Memory: 4GB RAM (8GB recommended)</li>
                        <li>Storage: 500MB free space</li>
                        <li>Internet connection for activation and updates</li>
                    </ul>
                </div>
            )
        }
    ];

    const tokenQuestions = [
        {
            question: "How do I purchase tokens?",
            answer: (
                <div className="space-y-2">
                    <p>Tokens can be purchased directly through our platform:</p>
                    <ol className="list-decimal list-inside pl-4 space-y-1">
                        <li>Log in to your account</li>
                        <li>Navigate to "<a href="/purchase" className="text-indigo-600 underline">Purchase Tokens</a>"</li>
                        <li>Select your preferred token package</li>
                        <li>Complete the checkout process using any of our supported payment methods (Credit Card, PayPal, or CashApp)</li>
                    </ol>
                    <p className="text-sm mt-2">Bulk discounts are available for purchases over 1000 tokens.</p>
                </div>
            )
        },
        {
            question: "What do I do with tokens?",
            answer: (
                <div className="space-y-2">
                    <p>Tokens are our in-app currency that can be used for purchasing plugins</p>
                    <p>Tokens provide flexibility, allowing you to customize your experience by paying only for the plugins you want. Tokens also
                    make it easier on us because we don't have to manage pricing and sales for hundreds of different plugins especially as more plugins are added.
                    </p>
                </div>
            )
        },
        {
            question: "Do tokens expire?",
            answer: (
                <p>No, tokens do not expire. Once purchased, they remain in your account until used. However, promotional or bonus tokens awarded through special events may have expiration dates, which will be clearly indicated in your token balance dashboard.</p>
            )
        }
    ];

    const licenseQuestions = [
        {
            question: "Where do I enter my license key?",
            answer: (
                <div className="space-y-2">
                    <p>To activate your plugin with a license key:</p>
                    <ol className="list-decimal list-inside pl-4 space-y-1">
                        <li>Launch the Kraken Client application</li>
                        <li>Click on the "Kraken" logo in the RuneLite side panel</li>
                        <li>Sign in with discord (your plugins will appear)</li>
                        <li>Enter your license key in the provided field in the plugins configuration</li>
                        <li>Your plugin's toggle will be green if it is activated correctly and red if the license key is missing or incorrect.</li>
                    </ol>
                    <p className="text-sm mt-2">Your software will automatically validate the key and unlock all features associated with your license.</p>
                </div>
            )
        },
        {
            question: "How can I tell when my plugin will expire?",
            answer: (
                <div className="space-y-2">
                    <p>You can check the expiration date of your plugins by navigating to your <a href="/profile" className="text-indigo-600 underline">user profile</a> and your plugin expiration dates will be clearly marked.</p>
                </div>
            )
        }
    ];

    const technicalQuestions = [
        {
            question: "How are plugins loaded?",
            answer: (
                <div className="space-y-2">
                    <p>Our application uses a dynamic plugin system that loads plugins as needed for users.</p>
                    <p>
                        Krakens plugins are loaded securely through signed URL's at runtime and passed to the RuneLite client the same way as all your plugin hub plugins are loaded.
                    </p>
                </div>
            )
        },
        {
            question: "I purchased a plugin but it isn't loading in the client?",
            answer: (
                <div className="space-y-2">
                    <p>Make sure you are signed into the same discord account as the one you purchased your plugin on. Plugins are associated with your discord id
                    so if you purchase a plugin under discord user: "abc" but login to the client with discord user: "xyz" then you won't see your plugins. If all else
                    fails, restart the client and then open a support ticket.</p>
                </div>
            )
        },
        {
            question: "Can I develop my own plugins?",
            answer: (
                <div className="space-y-2">
                    <p>Yes! Open a support ticket and we can discuss how to get your plugin added to Kraken!</p>
                </div>
            )
        },
        {
            question: "What happens if a plugin crashes?",
            answer: (
                <p>Our application is designed with plugin isolation to prevent crashes from affecting the entire system. If a plugin crashes, the application will automatically disable it.
                    You can then choose to restart the plugin or contact support.
                    Crash logs are generated in the "/logs" directory of RuneLite to help diagnose the issue.
                </p>
            )
        }
    ];

    return (
        <>
            <Navbar user={user} onLogout={logout} />
            <div className="bg-gradient-to-br from-slate-600 to-slate-900 min-h-screen">
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-200 mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl text-green-400">Find answers to common questions about our application</p>
                    </div>

                    <div className="space-y-10">
                        <FAQSection title="General Information" questions={generalQuestions} />
                        <FAQSection title="Tokens & Purchases" questions={tokenQuestions} />
                        <FAQSection title="Licensing & Activation" questions={licenseQuestions} />
                        <FAQSection title="Technical Questions" questions={technicalQuestions} />
                    </div>

                    <div className="mt-12 text-center p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-800 mb-2">Still have questions?</h3>
                        <p className="text-gray-600 mb-4">Our support team is here to help you with any other questions you might have.</p>
                        <button onClick={() => navigate("/support")} className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <Heart className="mr-2" size={20} />
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default FAQPage;