import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import FAQ from './FAQ';

it('starts with the first answer open and allows only one open item', async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(document.querySelector('#faq-panel-payouts')).toHaveAttribute(
        'aria-hidden',
        'true',
    );
    expect(document.querySelector('#faq-panel-kyc')).toHaveAttribute(
        'aria-hidden',
        'false',
    );
});
