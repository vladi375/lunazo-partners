import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Markets from './Markets';

it('renders the exported Figma map as an image', () => {
    render(<Markets />);

    const map = screen.getByRole('img', {
        name: 'Map of Latin America with Colombia and Argentina marked',
    });
    expect(map).toBeInstanceOf(HTMLImageElement);
    expect(map).toHaveAttribute('src', expect.stringContaining('map.png'));
});

it('renders crisp live country names beside cropped Figma flags', () => {
    render(<Markets />);

    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByText('Argentina')).toBeInTheDocument();
    expect(
        screen.getByRole('img', { name: 'Flag of Colombia' }),
    ).toHaveAttribute('src', expect.stringContaining('colombia.png'));
    expect(
        screen.getByRole('img', { name: 'Flag of Argentina' }),
    ).toHaveAttribute('src', expect.stringContaining('argentina.png'));
});
