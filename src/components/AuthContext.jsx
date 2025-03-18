import { createContext, useContext, useState } from 'react';
import {createCognitoUser} from '@/lib/utils.ts'
import {K8S_BASE_URL, isProd} from "@/lib/constants.ts";
const AuthContext = createContext(null);

// AuthProvider is used in main.jsx and provides the login, logout, and user props to any component
// in the Tree. AuthProvider wraps all components (currently) so that any component can get information about
// the currently authenticated user.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    /**
     * getUser
     * This function is called when a previously authenticated browser loads back into Kraken. It checks previously
     * stored tokens in local storage to see if it can use them to authenticate the user without going through discord
     * OAuth again.
     *
     * If tokens are present and good the authenticated cognito user will be returned else null.
     * @returns {Promise<CognitoUser>}
     */
    const getUser = async () => {
        const refreshToken = localStorage.getItem("refreshToken")
        const discordId = localStorage.getItem("discordId")

        if(refreshToken == null || discordId == null) {
            return Promise.reject("cognito refresh token or discord id does not exist in local storage.")
        }

        try {
            const response = await fetch(`${isProd() ? K8S_BASE_URL : 'http://localhost:8081'}/api/v1/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(`${discordId}:${refreshToken}`)
                }
            });

            const data = await response.json();
            if (response.status !== 200) {
                console.error(`Unexpected response code from /api/v1/cognito/auth: ${response.status}`)
                console.error(data)
                return Promise.reject("Failed to auth user: unexpected response code: " + response.status)
            }

            setUser(data)
        } catch (error) {
            console.error('Login error:', error);
            return Promise.reject("Failed to auth user: error thrown while making http request: " + error)
        }
    }

    /**
     *  Logs a user in by either retrieving their information or creating them in Cognito. This happens
     *  after the discord OAuth callback resolves. This function sets the refreshToken, access token, and discord
     *  id of the user who was authenticated.
     * @returns {Promise<boolean>}
     */
    const login = async (discordAccessToken) => {
        if(discordAccessToken.length === 0) {
            console.error("User must login with discord first as the access token is null.")
            return false;
        }

        try {
            const response = await fetch(`https://discord.com/api/users/@me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${discordAccessToken}`
                }
            });

            const data = await response.json();
            if (response.status !== 200) {
                console.error(`Unexpected response code while getting user from Discord: ${response.status}`)
                console.error(data)
                return false
            }

            const user = await createCognitoUser({
                discordId: data.id,
                discordUsername: data.username,
                discordEmail: data.email,
                avatarId: data.avatar,
            })

            if(user !== null) {
                setUser(user);
                localStorage.setItem("refreshToken", user.credentials.refresh_token)
                localStorage.setItem("accessToken", user.credentials.access_token)
                localStorage.setItem("idToken", user.credentials.id_token)
                localStorage.setItem("discordId", user.discordId)
                return true;
            }

            console.error("failed to create user in cognito.")
            return false
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken')
        localStorage.removeItem('discordId');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};