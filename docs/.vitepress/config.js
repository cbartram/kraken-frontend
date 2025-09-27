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
                    { text: 'Requirements', link: '/intro/requirements' },
                ]
            },
            {
                text: 'Client Setup',
                items: [
                    { text: 'Download & Install', link: '/client/download' },
                    { text: 'Running the Client', link: '/client/running' },
                    { text: 'Offline Mode', link: '/client/offline' }
                ]
            },
            {
                text: 'Licensing',
                items: [
                    { text: 'Finding Your License Key', link: '/license/finding' },
                    { text: 'Entering Your Key', link: '/license/entering' },
                    { text: 'Troubleshooting Keys', link: '/license/troubleshooting' }
                ]
            },
            {
                text: 'Settings & Options',
                items: [
                    { text: 'General Settings', link: '/settings/general' },
                    { text: 'Plugin Options', link: '/settings/plugins' }
                ]
            },
            {
                text: 'Plugins',
                items: [
                    { text: 'Available Plugins', link: '/plugins/available' },
                    { text: 'Managing Plugins', link: '/plugins/managing' }
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