import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
    site: 'https://honey.glass',
    integrations: [
        mdx(),
        sitemap(),
        partytown({
            config: {
                forward: ['dataLayer.push']
            }
        }),
        tailwind({
            applyBaseStyles: false
        })
    ],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: 'material-theme-palenight',
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            langs: [],
            // Enable word wrap to prevent horizontal scrolling
            // wrap: true,
            // Add custom transformers: https://shikiji.netlify.app/guide/transformers
            // Find common transformers: https://shikiji.netlify.app/packages/transformers
            transformers: []
        }
    }
});
