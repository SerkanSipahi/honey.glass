export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'honey.glass',
    subtitle: 'Serkan Sipahi - Software Engineer',
    description:
        'Serkan Sipahi is a Senior Software Engineer with a focus on Frontend Development. He is passionate about Programming and technologies around them.',
    // image: {
    //     src: '',
    //     alt: ''
    // },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        // {
        //     text: 'Projects',
        //     href: '/projects'
        // },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        // {
        //     text: 'About',
        //     href: '/about'
        // },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Imprint',
            href: '/imprint'
        },
        {
            text: 'Privacy',
            href: '/privacy'
        }
    ],
    socialLinks: [
        {
            text: 'Twitter',
            href: 'https://twitter.com/Bitcollage'
        },
        {
            text: 'Github',
            href: 'https://github.com/SerkanSipahi'
        },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/in/serkan-sipahi-59b20081/'
        },
        {
            text: 'XING',
            href: 'https://www.xing.com/profile/Serkan_Sipahi2/'
        }
    ],
    hero: {
        title: 'Ad astra per aspera',
        text:
            "In this big online world, I'm ready to start a big adventure. It's called [Ad astra per aspera](https://screenrant.com/ad-astra-per-aspera-strange-new-worlds-meaning/) - which means \"through hardships to the stars\". I believe in working through hard times to do something great. I've learned a lot over the last decade, and now I want to share it on my blog, http://honey.glass/blog.\n" +
            '\n' +
            "I'm going to talk about programming and all the cool tech stuff around it. I want to make everything I know easy for everyone to understand. I don't just want to make things; I want to help us all learn together and make tough topics as easy as enjoying honey.\n" +
            '\n' +
            "I hope my blog lights up the way in this huge, unknown online space. With honey.glass, I aim to create a place where we all share what we know freely, helping and feeding our curiosity. This journey might be tough, but it's also going to be rewarding.\n" +
            '\n' +
            "You can find me on [Twitter](https://twitter.com/Bitcollage), [GitHub](https://github.com/SerkanSipahi), [LinkedIn](https://www.linkedin.com/in/serkan-sipahi-59b20081/) and [XING](https://www.xing.com/profile/Serkan_Sipahi2/). I'm excited to meet you and share what we know. Let's make the online world a better place together!",
        image: {
            src: 'space.webp',
            alt: 'A black hole in space.'
        },
        actions: [
            // {
            //     text: 'Get in Touch',
            //     href: '/contact'
            // }
        ]
    },
    subscribe: {
        title: 'Subscribe to https://honey.glass Newsletter',
        text: 'Currently not available. Please check back later.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
