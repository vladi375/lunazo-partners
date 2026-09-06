import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from './App';

it('renders the landing page main region', () => {
    render(<App />);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'content');
});

it('links every landing registration CTA to the affiliate portal safely', () => {
    render(<App />);
    const registrationUrl =
        'https://affiliates.lunazopartners.com/registration?namespace=affiliate';
    const links = [
        ...screen.getAllByRole('link', { name: 'Join now' }),
        screen.getByRole('link', { name: 'Join Lunazo Partners' }),
    ];

    expect(links).toHaveLength(3);
    for (const link of links) {
        expect(link).toHaveAttribute('href', registrationUrl);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
});
