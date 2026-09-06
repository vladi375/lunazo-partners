import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import LunarLevels from './LunarLevels';

it('renders the five exported Figma moon textures', () => {
    render(<LunarLevels />);

    for (const name of [
        'New moon',
        'Crescent',
        'Half moon',
        'Gibbous',
        'Full moon',
    ]) {
        expect(
            screen.getByRole('img', { name: `${name} phase` }),
        ).toBeVisible();
    }
});
