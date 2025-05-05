import { Shield, Lock, Eye, Bell, Clock, Database, Share2, HelpCircle } from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/components/AuthContext.jsx";
import Footer from "@/components/Footer.jsx";

// Privacy Policy Page Component
export default function PrivacyPolicyPage() {
    const {user, logout, getUser} = useAuth()

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Navbar user={user} onLogout={logout} />
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-green-600 text-white shadow-md">
                    <div className="container mx-auto py-8 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            <Shield size={32} />
                            <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
                        </div>
                        <p className="mt-2 text-green-100">
                            Last updated: May 5, 2025
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto py-8 px-4 md:px-6">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
                        {/* Introduction */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Lock size={20} className="text-green-600" />
                                General
                            </h2>
                            <p className="text-slate-700 mb-4">
                                Thank you for choosing our services.
                                We are committed to protecting your personal information and your right to privacy.
                                This Privacy Policy describes how we collect, use, and share your information when you use our website and services.
                                At Kraken Plugins, accessible from https://kraken-plugins.duckdns.com, one of our main priorities is the privacy of our visitors.

                                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

                                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Kraken Plugins. This policy is not applicable to any information collected offline or via channels other than this website.
                            </p>
                            <p className="text-slate-700">
                                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Database size={20} className="text-green-600" />
                                Information We Collect
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Personal Information</h3>
                                    <p className="text-slate-700">
                                        We may collect personal identification information, including but not limited to:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-slate-700 pl-4">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Billing address</li>
                                        <li>Account login credentials</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Usage Data</h3>
                                    <p className="text-slate-700">
                                        We may also collect information about how you access and use our website and services, including:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-slate-700 pl-4">
                                        <li>Your IP address</li>
                                        <li>Browser type and version</li>
                                        <li>Pages you visit on our site</li>
                                        <li>Time and date of your visit</li>
                                        <li>Time spent on pages</li>
                                        <li>Device information</li>
                                    </ul>

                                    <p className="text-slate-700 my-4">
                                        Kraken Plugins follows a standard procedure of using log files.
                                        These files log visitors when they visit websites.
                                        The information collected by log files include internet protocol (IP) addresses, date and time stamp.
                                        These are not linked to any information that is personally identifiable.
                                        The purpose of the information is for analyzing the usage of our plugins.
                                    </p>

                                    <p className="text-slate-700 my-4">
                                        Kraken Plugins does not knowingly collect any Personal Identifiable Information from children under the age of 13.
                                        If you think that your child provided this kind of information on our website,
                                        we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Eye size={20} className="text-green-600" />
                                How We Use Your Information
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We use the information we collect in various ways, including to:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2">
                                <li>Provide, operate, and maintain our website and services</li>
                                <li>Improve, personalize, and expand our website and services</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Develop new products, services, features, and functionality</li>
                                <li>Communicate with you, either directly or through one of our partners, for customer service, updates, and other information relating to the website</li>
                                <li>Process your transactions</li>
                                <li>Send you emails and notifications</li>
                                <li>Find and prevent fraud</li>
                            </ul>
                        </section>

                        {/* Information Sharing */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Share2 size={20} className="text-green-600" />
                                Information Sharing
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We may share your information with third parties in certain situations, including:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2">
                                <li>With service providers who assist us in operating our website and providing our services</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect and defend our rights and property</li>
                                <li>With business partners with your consent</li>
                                <li>With other users when you share information through the site</li>
                            </ul>
                        </section>

                        {/* Your Rights */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <HelpCircle size={20} className="text-green-600" />
                                Your Rights
                            </h2>
                            <p className="text-slate-700 mb-4">
                                Depending on your location, you may have certain rights regarding your personal information:
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Access</h3>
                                    <p className="text-slate-700">You have the right to request copies of your personal information.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Rectification</h3>
                                    <p className="text-slate-700">You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Erasure</h3>
                                    <p className="text-slate-700">You have the right to request that we erase your personal information, under certain conditions.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Restrict Processing</h3>
                                    <p className="text-slate-700">You have the right to request that we restrict the processing of your personal information, under certain conditions.</p>
                                </div>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock size={20} className="text-green-600" />
                                Data Retention
                            </h2>
                            <p className="text-slate-700">
                                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                            </p>
                        </section>

                        {/* Updates to This Policy */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Bell size={20} className="text-green-600" />
                                Updates to This Policy
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page.
                            </p>
                            <p className="text-slate-700">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </section>
                    </div>
                </main>

                {/* Footer */}
               <Footer />
            </div>
        </>
    );
}