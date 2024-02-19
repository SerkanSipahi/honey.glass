import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v3.0.0/dist/cookieconsent.umd.js';

/**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 * https://cookieconsent.orestbida.com/essential/getting-started.html#configuration
 */
CookieConsent.run({
    cookie: {
        name: 'cc_cookie'
    },

    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            enabled: true, // this category is enabled by default
            readOnly: true // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/ // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid' // string: exact cookie name
                    }
                ]
            },
            services: {
                ga: {
                    label: 'Google Analytics'
                },
                youtube: {
                    label: 'Youtube Embed'
                }
            }
        },
        ads: {}
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description:
                        'We use cookies and other tracking technologies to improve your browsing experience on our website, to analyze our website traffic, and to understand where our visitors are coming from.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: 'Your Privacy Choices',
                            description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`
                        },
                        {
                            title: 'Strictly Necessary',
                            description:
                                'These cookies are essential for the proper functioning of the website and cannot be disabled.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description:
                                'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics',
                            cookieTable: {
                                caption: 'Cookie table',
                                headers: {
                                    name: 'Cookie',
                                    domain: 'Domain',
                                    desc: 'Description'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: location.hostname,
                                        desc: 'Description 1'
                                    },
                                    {
                                        name: '_gid',
                                        domain: location.hostname,
                                        desc: 'Description 2'
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }
});
