// The prod base url for the API gateway/lambda backed kraken API.
const K8S_BASE_URL: string = "https://kraken-plugins.com"

const isProd = () => {
    return window.location.hostname !== "localhost"
}

export {
    isProd,
    K8S_BASE_URL
}