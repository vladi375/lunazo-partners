import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CommissionPlans from './CommissionPlans';

describe('commission card spotlight', () => {
    it('tracks the pointer in card-local coordinates and fades after exit', () => {
        render(<CommissionPlans />);
        const card = screen
            .getByRole('heading', { name: 'CPA' })
            .closest('article');
        expect(card).not.toBeNull();
        if (!card) return;

        card.getBoundingClientRect = () => ({
            x: 100,
            y: 50,
            left: 100,
            top: 50,
            right: 500,
            bottom: 400,
            width: 400,
            height: 350,
            toJSON: () => ({}),
        });

        fireEvent.pointerEnter(card);
        fireEvent.pointerMove(card, { clientX: 220, clientY: 130 });

        expect(card).toHaveStyle({
            '--spotlight-x': '120px',
            '--spotlight-y': '80px',
            '--spotlight-opacity': '1',
        });

        fireEvent.pointerLeave(card);
        expect(card).toHaveStyle({ '--spotlight-opacity': '0' });
    });
});
