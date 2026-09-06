import { describe, expect, it } from 'vitest';
import { commissionPlans, faqItems, lunarLevels } from './content';

describe('landing page content', () => {
    it('contains every designed repeated item', () => {
        expect(commissionPlans).toHaveLength(3);
        expect(lunarLevels).toHaveLength(5);
        expect(faqItems).toHaveLength(5);
        expect(new Set(faqItems.map((item) => item.id)).size).toBe(5);
    });
});
