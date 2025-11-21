import { Shield, Lock, Eye, Bell, Clock, Database, Share2, HelpCircle } from 'lucide-react';
import Navbar from "@/components/Navbar.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/components/AuthContext.jsx";
import Footer from "@/components/Footer.jsx";
import ReactGA from "react-ga4";

// Privacy Policy Page Component
export default function PrivacyPolicyPage() {
    const {user, logout, getUser} = useAuth()

    // Have to get user manually since this route isn't wrapped in a <ProtectedRoute />
    useEffect(() => {
        getUser()
        ReactGA.send({
            hitType: 'pageview',
            page: "/privacy-policy",
            title: "Privacy Policy Page",
        });
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
                            <h1 className="text-2xl md:text-3xl font-bold">Privacy Statement</h1>
                        </div>
                        <p className="mt-2 text-green-100">
                            Effective Date: May 5, 2025
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
                                General Overview
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We appreciate your trust in our services.
                                We are dedicated to safeguarding your personal data and respecting your right to privacy.
                                This document outlines our protocols regarding the collection, utilization, and distribution of your data when engaging with our ecosystem.
                                At Kraken Plugins, located at <a href="https://kraken-plugins.com">https://kraken-plugins.com</a>, visitor privacy is a paramount concern.

                                Should you have further inquiries or require clarification regarding our Privacy Statement, please feel free to reach out to our support team.

                                This policy pertains exclusively to our digital operations and is valid for users of our website regarding information shared and/or harvested within Kraken Plugins. This policy does not extend to data gathered offline or through channels external to this domain.
                            </p>
                            <p className="text-slate-700">
                                Please review this statement thoroughly. If you do not consent to the terms laid out in this Privacy Policy, you must refrain from accessing this site or utilizing our services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Database size={20} className="text-green-600" />
                                Data Collection
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Personal Identifiers</h3>
                                    <p className="text-slate-700">
                                        We may request personal identification details, which may include, but are not limited to:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-slate-700 pl-4">
                                        <li>Full Name</li>
                                        <li>Electronic mail (Email) address</li>
                                        <li>Telephone contact numbers</li>
                                        <li>Billing and payment addresses</li>
                                        <li>Account authentication credentials</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Usage Telemetry</h3>
                                    <p className="text-slate-700">
                                        We also gather data regarding your interaction with our platform and services, such as:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 text-slate-700 pl-4">
                                        <li>Your Network (IP) address</li>
                                        <li>Browser specifications and version</li>
                                        <li>Navigation history within our site</li>
                                        <li>Timestamps of your sessions</li>
                                        <li>Duration of page engagement</li>
                                        <li>Hardware and device specifics</li>
                                    </ul>

                                    <p className="text-slate-700 my-4">
                                        Kraken Plugins adheres to standard industry protocols regarding log files.
                                        These records track visitors during their sessions on the website.
                                        The data captured includes internet protocol (IP) addresses, timestamps, and navigation paths.
                                        This data is not linked to personally identifiable information.
                                        The primary objective is to analyze trends and plugin performance.
                                    </p>

                                    <p className="text-slate-700 my-4">
                                        Kraken Plugins does not intentionally solicit Personal Identifiable Information from minors under the age of 13.
                                        If you suspect that your child has submitted such data to our platform,
                                        we urge you to contact us immediately so we can take swift action to expunge such records from our database.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* How We Use Your Information */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Eye size={20} className="text-green-600" />
                                Utilization of Data
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We leverage the collected data for multiple objectives, including to:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2">
                                <li>Facilitate, maintain, and operate our digital infrastructure</li>
                                <li>Enhance, customize, and scale our service offerings</li>
                                <li>Analyze user behavior to optimize platform performance</li>
                                <li>Innovate new products, features, and specialized functionality</li>
                                <li>Manage correspondence with you, directly or via partners, regarding support, updates, and operational news</li>
                                <li>Execute and verify financial transactions</li>
                                <li>Dispatch administrative emails and push notifications</li>
                                <li>Identify and mitigate potential fraud or security risks</li>
                            </ul>
                        </section>

                        {/* Information Sharing */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Share2 size={20} className="text-green-600" />
                                Third-Party Disclosure
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We may disclose your information to external parties under specific circumstances, such as:
                            </p>
                            <ul className="list-disc list-inside text-slate-700 pl-4 space-y-2">
                                <li>With vendors and service providers who support our operational infrastructure</li>
                                <li>To adhere to statutory and legal requirements</li>
                                <li>To safeguard our intellectual property and legal rights</li>
                                <li>With strategic business partners, provided we have your consent</li>
                                <li>With other community members when you voluntarily share data via the platform</li>
                            </ul>
                        </section>

                        {/* Your Rights */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <HelpCircle size={20} className="text-green-600" />
                                User Rights
                            </h2>
                            <p className="text-slate-700 mb-4">
                                Depending on your jurisdiction, you may possess specific rights concerning your personal data:
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Inspect</h3>
                                    <p className="text-slate-700">You retain the right to request copies of the personal data we hold about you.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Correction</h3>
                                    <p className="text-slate-700">You may request that we rectify any information you deem inaccurate or supplement information you believe is incomplete.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Deletion</h3>
                                    <p className="text-slate-700">You have the right to request the erasure of your personal data under specific legal conditions.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800">Right to Restriction</h3>
                                    <p className="text-slate-700">You may request that we limit the processing of your personal data under specific legal conditions.</p>
                                </div>
                            </div>
                        </section>

                        {/* Data Retention */}
                        <section className="mb-8 border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Clock size={20} className="text-green-600" />
                                Data Retention Policy
                            </h2>
                            <p className="text-slate-700">
                                We store your personal information only for the duration necessary to fulfill the objectives outlined in this statement. We retain and utilize your data to the extent required to comply with legal obligations, resolve disputes, and enforce our agreements.
                            </p>
                        </section>

                        {/* Updates to This Policy */}
                        <section className="border-t border-slate-200 pt-8">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <Bell size={20} className="text-green-600" />
                                Policy Modifications
                            </h2>
                            <p className="text-slate-700 mb-4">
                                We reserve the right to modify this Privacy Policy periodically. We will alert you to any significant changes by publishing the revised policy on this page and updating the "Effective Date" located at the top.
                            </p>
                            <p className="text-slate-700">
                                We advise you to review this page regularly for any updates. Changes to this policy become effective immediately upon being posted here.
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