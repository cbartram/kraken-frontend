import { FileText, Cookie, Book, AlertTriangle, Link, Shield, Scale, Trash2, RefreshCw } from 'lucide-react';
import Footer from "@/components/Footer.jsx";
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useEffect} from "react";
import ReactGA from "react-ga4";

// Terms and Conditions Page Component
export default function TermsAndConditions() {
    const { user, getUser, logout, loading } = useAuth()

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        getUser()

        ReactGA.send({
            hitType: 'pageview',
            page: "/terms-and-conditions",
            title: "Terms and Conditions Page",
        });
    }, [])

    return (
        <>
            <Navbar user={user} onLogout={logout} loading={loading} />
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-green-600 text-white shadow-md">
                    <div className="container mx-auto py-8 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            <FileText size={32} />
                            <h1 className="text-2xl md:text-3xl font-bold">Terms and Conditions</h1>
                        </div>
                        <p className="mt-2 text-green-100">
                            Effective Date: May 5, 2025
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto py-8 px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
                        {/* General */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Book size={20} className="text-green-600" />
                                General Overview
                            </h2>
                            <p className="text-slate-700 mb-4">
                                These stipulations define the rules and obligations regarding the use of the Kraken Plugins Website, accessible at <a href="https://kraken-plugins.com">https://kraken-plugins.com</a>.
                            </p>
                            <p className="text-slate-700 mb-4">
                                By navigating and using this website, you imply your full acceptance of these terms and conditions. If you do not agree to adhere to all the terms stated on this page, you must discontinue the use of Kraken Plugins immediately.
                            </p>
                            <p className="text-slate-700">
                                The following terminology applies to these Terms and Conditions, the Privacy Statement, the Disclaimer Notice, and all related Agreements: "Client", "You", and "Your" refer to you, the individual accessing this website and accepting the Company's terms. "The Company", "Ourselves", "We", "Our", and "Us" refer to our entity. "Party", "Parties", or "Us" refers to both the Client and ourselves collectively. All terms relate to the offer, acceptance, and consideration of payment required to undertake our assistance to the Client in the most effective manner to meet the Client's needs regarding the Company's services, in accordance with the prevailing laws of the Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization, and/or gender-specific terms are considered interchangeable and refer to the same.
                            </p>
                        </section>

                        {/* Cookies */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Cookie size={20} className="text-green-600" />
                                Cookie Usage
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We utilize cookies on this platform. By accessing Kraken Plugins, you consent to the use of cookies in accordance with the Kraken Plugins Privacy Policy.
                            </p>
                            <p className="text-slate-700">
                                Most interactive websites employ cookies to retrieve user details for each visit. Our website uses cookies to facilitate the functionality of specific areas, improving the user experience for visitors. Additionally, some of our affiliate or advertising partners may also utilize cookies.
                            </p>
                        </section>

                        {/* License */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Scale size={20} className="text-green-600" />
                                Intellectual Property License
                            </h2>
                            <p className="text-slate-700 mb-4">
                                Unless explicitly stated otherwise, Kraken Plugins and/or its licensors hold the intellectual property rights for all material on Kraken Plugins. All rights are reserved. You may access content from Kraken Plugins for personal use only, subject to the restrictions outlined in these terms.
                            </p>
                            <p className="text-slate-700 mb-4">
                                You are strictly prohibited from:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2 mb-4">
                                <li>Republishing material from Kraken Plugins</li>
                                <li>Selling, renting, or sub-licensing material from Kraken Plugins</li>
                                <li>Reproducing, duplicating, or copying material from Kraken Plugins</li>
                                <li>Redistributing content from Kraken Plugins</li>
                            </ul>
                            <p className="text-slate-700">
                                This Agreement is effective as of the date hereof.
                            </p>
                        </section>

                        {/* iFrames */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Link size={20} className="text-green-600" />
                                iFrames and Embedding
                            </h2>
                            <p className="text-slate-700">
                                You may not create frames around our web pages that alter the visual presentation or appearance of our Website in any way without prior approval and written permission.
                            </p>
                        </section>

                        {/* Content Liability */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle size={20} className="text-green-600" />
                                Content Liability
                            </h2>
                            <p className="text-slate-700">
                                We accept no responsibility for any content that appears on your Website. You agree to indemnify and defend us against all claims arising from your Website. No link(s) should appear on any Website that could be interpreted as libelous, obscene, or criminal, or that infringes, violates, or advocates the infringement or violation of any third-party rights.
                            </p>
                        </section>

                        {/* Your Privacy */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Shield size={20} className="text-green-600" />
                                Your Privacy
                            </h2>
                            <p className="text-slate-700">
                                Please review our <a href="#" className="text-green-600 hover:text-green-700 underline">Privacy Policy</a>.
                            </p>
                        </section>

                        {/* Reservation of Rights */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <RefreshCw size={20} className="text-green-600" />
                                Reservation of Rights
                            </h2>
                            <p className="text-slate-700">
                                We reserve the right to request the removal of all links or any specific link to our Website. You agree to remove all links to our Website immediately upon request. We also reserve the right to amend these terms and conditions and our linking policy at any time. By continuing to link to our Website, you agree to be bound by and follow these linking terms and conditions.
                            </p>
                        </section>

                        {/* Removal of links from our website */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Trash2 size={20} className="text-green-600" />
                                Link Removal Requests
                            </h2>
                            <p className="text-slate-700 mb-4">
                                If you discover any link on our Website that is offensive for any reason, you are welcome to contact and inform us at any time. While we will consider requests to remove links, we are not obligated to do so or to respond to you directly.
                            </p>
                            <p className="text-slate-700">
                                We do not guarantee the correctness of the information on this website, nor do we warrant its completeness or accuracy. Furthermore, we do not promise that the website will remain available or that the material on the website will be kept up to date.
                            </p>
                        </section>

                        {/* Disclaimer */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle size={20} className="text-green-600" />
                                Legal Disclaimer
                            </h2>
                            <p className="text-slate-700 mb-4">
                                To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2 mb-4">
                                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                            </ul>
                            <p className="text-slate-700">
                                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.
                            </p>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}