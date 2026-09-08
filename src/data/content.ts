export type NavItem = { label: string; href: `#${string}`; badge?: string };
export type CommissionPlan = {
    id: string;
    title: string;
    value: string;
    subtitle: string;
    bullets: readonly string[];
};
export type LunarLevel = { id: string; title: string; phase: number };
export type Benefit = {
    id: string;
    title: string;
    description: string;
    icon: 'wallet' | 'manager' | 'stats' | 'casino';
};
export type FaqItem = { id: string; question: string; answer: string };

export const navItems = [
    { label: 'Commissions', href: '#commissions' },
    { label: 'Lunar levels', href: '#lunar-levels', badge: 'Soon' },
    { label: 'Promo', href: '#promo' },
    { label: 'FAQ', href: '#faq' },
] as const satisfies readonly NavItem[];

export const URL = {
    AFFILIATE_REGISTRATION:
        'https://affiliates.lunazopartners.com/registration?namespace=affiliate',
    AFFILIATE_LOGIN:
        'https://affiliates.lunazopartners.com/auth?namespace=affiliate',
    TERMS: 'https://affiliates.lunazopartners.com/terms',
    PRIVACY: 'https://affiliates.lunazopartners.com/privacy-policy',
};

export const commissionPlans = [
    {
        id: 'cpa',
        title: 'CPA',
        value: 'up to $40',
        subtitle: 'per qualified FTD',
        bullets: [
            'Fixed payout per deposit',
            'Geo-based rates',
            'Best for most traffic sources and teams',
        ],
    },
    {
        id: 'revshare',
        title: 'REVSHARE',
        value: 'up to 50%',
        subtitle: 'of net gaming revenue',
        bullets: [
            'Lifetime player value',
            'No negative carryover',
            'Best for SEO and influence traffic',
        ],
    },
    {
        id: 'hybrid',
        title: 'HYBRID',
        value: 'CPA + RevShare %',
        subtitle: 'negotiated per deal',
        bullets: [
            'Upfront plus tail',
            'Agreed on your volume',
            'Best for partners with high volumes and quality traffic',
        ],
    },
] as const satisfies readonly CommissionPlan[];

export const lunarLevels = [
    { id: 'new-moon', title: 'New moon', phase: 0 },
    { id: 'crescent', title: 'Crescent', phase: 1 },
    { id: 'half-moon', title: 'Half moon', phase: 2 },
    { id: 'gibbous', title: 'Gibbous', phase: 3 },
    { id: 'full-moon', title: 'Full moon', phase: 4 },
] as const satisfies readonly LunarLevel[];

export const benefits = [
    {
        id: 'crypto',
        title: 'Crypto payouts, no KYC docs',
        description:
            'Link a wallet and get paid. No document uploads, no bank delays.',
        icon: 'wallet',
    },
    {
        id: 'manager',
        title: 'Manager who answers',
        description:
            'Telegram-first support from people who run LATAM traffic themselves.',
        icon: 'manager',
    },
    {
        id: 'stats',
        title: 'Real-time stats',
        description:
            'Clicks, registration, FTDs and revenue by sub ID, updated as they happen.',
        icon: 'stats',
    },
    {
        id: 'casino',
        title: 'Casino and sport',
        description:
            'One brand, two verticals. Send slots and betting traffic to the same offer.',
        icon: 'casino',
    },
] as const satisfies readonly Benefit[];

export const faqItems = [
    {
        id: 'payouts',
        question: 'How often are payouts?',
        answer: 'Monthly, by the 20th in crypto, to the wallet linked to your account. \nMinimum payout is $50. Hold depends on your model.',
    },
    {
        id: 'kyc',
        question: 'Do I need to pass KYC?',
        answer: 'No document KYC for partners. You link a crypto wallet and that is your payout identity.',
    },
    {
        id: 'traffic',
        question: 'What traffic is accepted?',
        answer: 'Meta Ads, SEO, ASO, Influencers, PPC and UAC. Branded and misleading traffic is not accepted — details in Terms.',
    },
    {
        id: 'levels',
        question: 'When do Lunar levels launch?',
        answer: "With the platform's first major update. Confirmed FTDs are counted from your first day, so your status will reflect everything you've driven before launch.",
    },
    {
        id: 'geos',
        question: 'Which GEOs are open?',
        answer: 'Colombia and Argentina — our two focus markets with localized funnels and payment methods. More LATAM GEOs will open once these two are running at full strength.',
    },
] as const satisfies readonly FaqItem[];

export const promoPoints = [
    'Banners in all standard sizes, general and parallax',
    'Localized for each GEO, ES and EN',
    'Landing pages tested on our own traffic',
    'Custom creatives on request',
] as const;
