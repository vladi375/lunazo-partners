import { describe, expect, it } from 'vitest';
import { commissionPlans, faqItems, lunarLevels } from './content';

describe('landing page content', () => {
    it('contains every designed repeated item', () => {
        expect(commissionPlans).toHaveLength(3);
        expect(lunarLevels).toHaveLength(5);
        expect(faqItems).toHaveLength(5);
        expect(new Set(faqItems.map((item) => item.id)).size).toBe(5);
    });

    it('renders the approved Figma FAQ copy', () => {
        expect(faqItems).toEqual([
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
        ]);
    });
});
