import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Header from './Header';

describe('mobile navigation', () => {
    it('opens and closes with Escape and restores focus', async () => {
        const user = userEvent.setup();
        render(<Header />);
        const trigger = screen.getByRole('button', { name: /open menu/i });
        await user.click(trigger);
        expect(
            screen.getByRole('dialog', { name: /navigation/i }),
        ).toBeVisible();
        await user.keyboard('{Escape}');
        expect(
            screen.queryByRole('dialog', { name: /navigation/i }),
        ).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
    });

    it('closes after selecting a section link', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: /open menu/i }));
        const commissions = within(
            screen.getByRole('dialog', { name: /navigation/i }),
        ).getByRole('link', { name: /commissions/i });
        expect(commissions).toHaveAttribute('href', '#commissions');
        await user.click(commissions);
        expect(
            screen.queryByRole('dialog', { name: /navigation/i }),
        ).not.toBeInTheDocument();
    });

    it('uses safe external affiliate links for login and registration', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: /open menu/i }));

        const registrationUrl =
            'https://affiliates.lunazopartners.com/registration?namespace=affiliate';
        const loginUrl =
            'https://affiliates.lunazopartners.com/auth?namespace=affiliate';
        for (const link of screen.getAllByRole('link', { name: /join now/i })) {
            expect(link).toHaveAttribute('href', registrationUrl);
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
        for (const link of screen.getAllByRole('link', { name: /log in/i })) {
            expect(link).toHaveAttribute('href', loginUrl);
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        }
    });
});
