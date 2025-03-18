import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// @ts-ignore
import { AuthProvider } from "@/components/AuthContext.jsx"
// @ts-ignore
import { ProtectedRoute } from '@/components/ProtectedRoute.jsx'
// @ts-ignore
import AuthCallback from "@/components/AuthCallback.jsx"
import Login from '@/pages/Login'
// @ts-ignore
import PurchaseTokens from "@/pages/PurchaseTokens.jsx"

// @ts-ignore
import Landing from "@/pages/Landing.jsx"
// @ts-ignore
import Profile from "@/pages/Profile.jsx"
// @ts-ignore
import Support from "@/pages/Support.jsx"
// @ts-ignore
import Plugins from "@/pages/Plugins.jsx"
// @ts-ignore
import { RedirectIfAuthenticated } from '@/components/RedirectIfAuthenticated.jsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
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
                <Route path="/profile" element={
                    <ProtectedRoute resource="profile">
                        <Profile />
                    </ProtectedRoute>
                }
                />
                <Route path="/support" element={
                    <ProtectedRoute resource="support">
                        <Support />
                    </ProtectedRoute>
                }
                />
                <Route path="/purchase" element={
                    <ProtectedRoute resource="support">
                        <PurchaseTokens />
                    </ProtectedRoute>
                }
                />
                {/* Any users can visit the /plugins page but only authenticated users will see the "buy now" buttons */}
                <Route
                    path="/plugins"
                    element={<Plugins />}
                />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);
