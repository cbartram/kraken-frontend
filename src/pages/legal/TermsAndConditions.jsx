import { FileText, Cookie, Book, AlertTriangle, Link, Shield, Scale, Trash2, RefreshCw } from 'lucide-react';
import Footer from "@/components/Footer.jsx";
import Navbar from "@/components/Navbar.jsx";
import {useAuth} from "@/components/AuthContext.jsx";
import {useEffect} from "react";

// Terms and Conditions Page Component
export default function TermsAndConditions() {
    const { user, getUser, onLogout, loading } = useAuth()

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Navbar user={user} onLogout={onLogout} loading={loading} />
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-green-600 text-white shadow-md">
                    <div className="container mx-auto py-8 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            <FileText size={32} />
                            <h1 className="text-2xl md:text-3xl font-bold">Terms and Conditions</h1>
                        </div>
                        <p className="mt-2 text-green-100">
                            Last updated: May 5, 2025
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
                                General
                            </h2>
                            <p className="text-slate-700 mb-4">
                                These terms and conditions outline the rules and regulations for the use of the Kraken Plugins Website, located at https://kraken-plugins.duckdns.com/.
                            </p>
                            <p className="text-slate-700 mb-4">
                                By accessing this website we assume you accept these terms and conditions. Do not continue to use Kraken Plugins if you do not agree to take all of the terms and conditions stated on this page.
                            </p>
                            <p className="text-slate-700">
                                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                            </p>
                        </section>

                        {/* Cookies */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Cookie size={20} className="text-green-600" />
                                Cookies
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We employ the use of cookies. By accessing Kraken Plugins, you agreed to use cookies in agreement with the Kraken Plugins Privacy Policy.
                            </p>
                            <p className="text-slate-700">
                                Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                            </p>
                        </section>

                        {/* License */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Scale size={20} className="text-green-600" />
                                License
                            </h2>
                            <p className="text-slate-700 mb-4">
                                Unless otherwise stated, Kraken Plugins and/or its licensors own the intellectual property rights for all material on Kraken Plugins. All intellectual property rights are reserved. You may access this from Kraken Plugins for your own personal use subjected to restrictions set in these terms and conditions.
                            </p>
                            <p className="text-slate-700 mb-4">
                                You must not:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2 mb-4">
                                <li>Republish material from Kraken Plugins</li>
                                <li>Sell, rent or sub-license material from Kraken Plugins</li>
                                <li>Reproduce, duplicate or copy material from Kraken Plugins</li>
                                <li>Redistribute content from Kraken Plugins</li>
                            </ul>
                            <p className="text-slate-700">
                                This Agreement shall begin on the date hereof.
                            </p>
                        </section>

                        {/* iFrames */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Link size={20} className="text-green-600" />
                                iFrames
                            </h2>
                            <p className="text-slate-700">
                                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                            </p>
                        </section>

                        {/* Content Liability */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle size={20} className="text-green-600" />
                                Content Liability
                            </h2>
                            <p className="text-slate-700">
                                We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                            </p>
                        </section>

                        {/* Your Privacy */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Shield size={20} className="text-green-600" />
                                Your Privacy
                            </h2>
                            <p className="text-slate-700">
                                Please read <a href="#" className="text-green-600 hover:text-green-700 underline">Privacy Policy</a>
                            </p>
                        </section>

                        {/* Reservation of Rights */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <RefreshCw size={20} className="text-green-600" />
                                Reservation of Rights
                            </h2>
                            <p className="text-slate-700">
                                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                            </p>
                        </section>

                        {/* Removal of links from our website */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Trash2 size={20} className="text-green-600" />
                                Removal of links from our website
                            </h2>
                            <p className="text-slate-700 mb-4">
                                If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                            </p>
                            <p className="text-slate-700">
                                We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                            </p>
                        </section>

                        {/* Disclaimer */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle size={20} className="text-green-600" />
                                Disclaimer
                            </h2>
                            <p className="text-slate-700 mb-4">
                                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2 mb-4">
                                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                            </ul>
                            <p className="text-slate-700">
                                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                            </p>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}