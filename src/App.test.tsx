import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from './App';

it('renders the landing page main region', () => {
    render(<App />);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'content');
});

it('uses the exported Lunazo Partners logo in the header and footer', () => {
    render(<App />);

    const logos = screen.getAllByRole('img', { name: 'Lunazo Partners' });
    expect(logos).toHaveLength(2);
    for (const logo of logos) {
        expect(logo).toHaveAttribute('src', expect.stringMatching(/Layer_1\.png$/));
    }
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
