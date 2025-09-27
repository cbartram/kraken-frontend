// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Kraken Plugins",
    description: "Extended Old School RuneScape Plugins",
    themeConfig: {
        nav: [
            { text: 'Home', link: 'https://kraken-plugins.com' },
            { text: 'Plugins', link: 'https://kraken-plugins.com/plugins' },
            { text: 'Download Client', link: 'https://kraken-plugins.com/download' },
            { text: 'Docs', link: '/' },
            { text: 'About', link: 'https://kraken-plugins.com/about' },
            { text: 'Support', link: 'https://kraken-plugins.com/support' }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Overview', link: '/' },
                    { text: 'Signing Up', link: '/signup' },
                    { text: 'Requirements', link: '/requirements' },
                ]
            },
            {
                text: 'Client Setup',
                items: [
                    { text: 'Download & Install', link: '/client/download' },
                    { text: 'Running the Client', link: '/client/running' },
                    { text: 'Configuration & Options', link: '/client/configuration' }
                ]
            },
            {
                text: 'Plugins',
                items: [
                    { text: 'Available Plugins', link: '/plugins/available' },
                    { text: 'Managing Plugins', link: '/plugins/managing' },
                    { text: 'License Keys', link: '/plugins/license' },
                    { text: 'Troubleshooting Keys', link: '/license/troubleshooting' }
                ]
            },
            {
                text: 'Support',
                items: [
                    { text: 'Common Issues', link: '/support/issues' },
                    { text: 'Contact Support', link: '/support/contact' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/cbartram/kraken-api' }
        ]
    }
})