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

export const affiliateRegistrationUrl =
    'https://affiliates.lunazopartners.com/registration?namespace=affiliate';

export const affiliateLoginUrl =
    'https://affiliates.lunazopartners.com/auth?namespace=affiliate';

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
        answer: 'Monthly, by the 20th in crypto, to the wallet linked to your account. Minimum payout is $50. Hold depends on your model.',
    },
    {
        id: 'kyc',
        question: 'Do I need to pass KYC?',
        answer: 'Partners can begin without traditional banking paperwork. Your manager will confirm the requirements for your traffic and payout setup.',
    },
    {
        id: 'traffic',
        question: 'What traffic is accepted?',
        answer: 'SEO, media buying, influencer, social and other agreed traffic sources are accepted. Your manager approves the final mix.',
    },
    {
        id: 'levels',
        question: 'When do Lunar levels launch?',
        answer: 'Lunar levels are launching soon. Details and benefits for each level will be revealed at launch.',
    },
    {
        id: 'geos',
        question: 'Which GEOs are open?',
        answer: 'Colombia and Argentina are the primary open markets, with more LATAM GEOs available by agreement.',
    },
] as const satisfies readonly FaqItem[];

export const promoPoints = [
    'Banners in all standard sizes, general and parallax',
    'Localized for each GEO, ES and EN',
    'Landing pages tested on our own traffic',
    'Custom creatives on request',
] as const;
