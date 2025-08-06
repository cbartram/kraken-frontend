import {Toaster} from "@/components/ui/sonner.js";
import {AuthProvider} from "@/components/AuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RedirectIfAuthenticated} from "@/components/RedirectIfAuthenticated";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login.js";
import AuthCallback from "@/components/AuthCallback";
import PurchaseTokens from "@/pages/PurchaseTokens";
import DownloadClient from "@/pages/DownloadClient"
import Profile from "@/pages/Profile"
import Support from "@/pages/Support"
import Plugins from "@/pages/Plugins"
import PaymentProcessing from "@/pages/PaymentProcessing"
import FAQPage from '@/pages/Faq'
import PluginDetailPage from '@/pages/PluginDetail'
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy"
import TermsAndConditions from "@/pages/legal/TermsAndConditions"
import {ProtectedRoute} from "@/components/ProtectedRoute";
import {useEffect} from "react";
import ReactGA from 'react-ga4'
import './index.css'
import SalesManagement from "@/pages/SaleManagement.jsx";

function App() {

    useEffect(() => {
        console.log("Initializing GA4")
        ReactGA.initialize("G-57JXXGGCTJ", {
            debug: process.env.NODE_ENV === 'development',
        });
    }, []);

    return (
        <BrowserRouter>
            <Toaster richColors closeButton />
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RedirectIfAuthenticated resource="landing">
                                <Landing />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuthenticated resource="login">
                                <Login />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route path="/discord/oauth" element={<AuthCallback />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/purchase" element={<PurchaseTokens />}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

                    <Route path="/admin/management/sales" element={
                        <ProtectedRoute>
                            <SalesManagement />
                        </ProtectedRoute>
                    }
                    />

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/support" element={
                        <ProtectedRoute>
                            <Support />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/download" element={
                        <ProtectedRoute>
                            <DownloadClient />
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/processing" element={
                        <ProtectedRoute>
                            <PaymentProcessing />
                        </ProtectedRoute>
                    }
                    />
                    {/* Any users can visit the /plugins page,
                but only authenticated users will see the "buy now" buttons */}
                    <Route
                        path="/plugins"
                        element={<Plugins />}
                    />
                    <Route path="/plugins/:name" element={<PluginDetailPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App