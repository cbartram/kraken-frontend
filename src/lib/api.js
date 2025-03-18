import {K8S_BASE_URL, isProd} from "@/lib/constants.ts";


class ApiClient {
    constructor(user) {
        this.user = user
    }

    /**
     * Makes a generic asynchronous request to an API endpoint using the fetch API.
     * @param endpoint The endpoint to make a request to not including the base URL. i.e. /api/v1/health
     * @param options Any fetch options to pass along to the request including request method and body.
     * @returns {Promise<Response|any>}
     */
    async request(endpoint, options = {}) {
        const url = `${this.getBaseUrl()}${endpoint}`;
        const headers = this.getHeaders();

        const config = {
            headers,
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                console.error("error during http fetch")
                const errorData = await response.json().catch(() => null);
                throw new Error(`error: ${errorData?.error}, status code: ${response.status}, message: ${errorData?.message}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            }

            return response;

        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    getHeaders() {
        throw new Error("Method getHeaders() must be implemented.")
    }

    getBaseUrl() {
        throw new Error("Method getBaseUrl() must be implemented.")
    }
}

/**
 * Functions as the client for the Kubernetes API client hosted on the kubernetes cluster.
 * This API is responsible for all server, file install, and backup operations.
 */
class KubeApiClient extends ApiClient {
    constructor(user) {
        super(user)
        this.baseURL = K8S_BASE_URL;
    }

    getHeaders() {
        const headers = new Headers();
        headers.append("Authorization", `Basic ${btoa(this.user.discordId + ":" + this.user.credentials.refresh_token)}`);
        headers.append("Content-Type", "application/json");
        return headers;
    }

    getBaseUrl() {
        if(isProd()) {
            return this.baseURL
        } else {
            return "http://localhost:8080"
        }
    }

    async sendEmail(subject, message) {
        return this.request('/api/v1/support/send-message', {
            method: "POST",
            body: JSON.stringify({
                subject,
                message,
            })
        })
    }

    async createCheckoutSession(item) {
        return this.request(`/api/v1/stripe/create-checkout-session?key=${item.name}`, {
            method: 'GET'
        })
    }

    async createBillingSession(sessionId, customerId) {
        if(sessionId == null) {
            return this.request(`/api/v1/stripe/create-billing-session?customerId=${customerId}`, {
                method: 'GET'
            })
        }

        return this.request(`/api/v1/stripe/create-billing-session?sessionId=${sessionId}`, {
            method: 'GET'
        })
    }

    async getSubscriptionDetails(subscriptionId) {
        return this.request(`/api/v1/stripe/subscription?id=${subscriptionId}`, {
            method: 'GET'
        })
    }
}

export {
    KubeApiClient
};