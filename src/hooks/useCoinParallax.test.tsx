import { act, renderHook } from '@testing-library/react';
import type { RefObject } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { useCoinParallax } from './useCoinParallax';

const element = {
    getBoundingClientRect: () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => ({}),
    }),
} as HTMLElement;
const ref = { current: element } as RefObject<HTMLElement>;

afterEach(() => vi.restoreAllMocks());

it('keeps the coin static when reduced motion is preferred', () => {
    vi.stubGlobal('matchMedia', () => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
    const { result } = renderHook(() => useCoinParallax(ref));
    expect(result.current.transform).toBe('none');
});

it('moves opposite the pointer and clamps parallax to the design bounds', () => {
    vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
    let queuedFrame: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        queuedFrame = callback;
        return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(
        () => undefined,
    );
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1440,
    });
    const { result } = renderHook(() => useCoinParallax(ref));
    act(() =>
        window.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 10000, clientY: 10000 }),
        ),
    );
    const firstFrame = queuedFrame as FrameRequestCallback | null;
    queuedFrame = null;
    expect(firstFrame).not.toBeNull();
    act(() => firstFrame?.(0));
    const secondFrame = queuedFrame as FrameRequestCallback | null;
    queuedFrame = null;
    expect(secondFrame).not.toBeNull();
    act(() => secondFrame?.(100));
    expect(String(result.current.transform)).toMatch(
        /translate3d\(-3\.\d+px, -3\.\d+px, 0\) rotate\(-0\.1\ddeg\)/,
    );
    for (let frameIndex = 2; frameIndex < 14; frameIndex += 1) {
        const callback = queuedFrame as FrameRequestCallback | null;
        queuedFrame = null;
        if (!callback) break;
        act(() => callback(frameIndex * 100));
    }
    const transform = String(result.current.transform);
    const translate = transform.match(
        /translate3d\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/,
    );
    const rotation = transform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/);
    const x = Number(translate?.[1]);
    const y = Number(translate?.[2]);
    const angle = Number(rotation?.[1]);
    expect(Math.abs(x)).toBeLessThanOrEqual(48);
    expect(Math.abs(y)).toBeLessThanOrEqual(48);
    expect(Math.abs(angle)).toBeLessThanOrEqual(2);
    expect(x).toBeLessThan(0);
    expect(y).toBeLessThan(0);
    expect(angle).toBeLessThan(0);
});

it.each([
    ['right', 100, 50, -1, 0],
    ['left', 0, 50, 1, 0],
    ['down', 50, 100, 0, -1],
    ['up', 50, 0, 0, 1],
    ['down-right', 100, 100, -1, -1],
    ['down-left', 0, 100, 1, -1],
    ['up-right', 100, 0, -1, 1],
    ['up-left', 0, 0, 1, 1],
] as const)(
    'moves in the opposite direction when the pointer moves %s',
    (_direction, clientX, clientY, expectedXSign, expectedYSign) => {
        vi.stubGlobal('matchMedia', () => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));
        let queuedFrame: FrameRequestCallback | null = null;
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
            (callback) => {
                queuedFrame = callback;
                return 1;
            },
        );
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(
            () => undefined,
        );
        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 1440,
        });
        const { result } = renderHook(() => useCoinParallax(ref));

        act(() =>
            window.dispatchEvent(
                new PointerEvent('pointermove', { clientX, clientY }),
            ),
        );
        for (let frameIndex = 0; frameIndex < 14; frameIndex += 1) {
            const callback = queuedFrame as FrameRequestCallback | null;
            queuedFrame = null;
            if (!callback) break;
            act(() => callback(frameIndex * 100));
        }

        const translate = String(result.current.transform).match(
            /translate3d\((-?\d+(?:\.\d+)?)px, (-?\d+(?:\.\d+)?)px/,
        );
        const x = Number(translate?.[1]);
        const y = Number(translate?.[2]);
        if (expectedXSign === 0) expect(Math.abs(x)).toBeLessThan(0.05);
        else expect(Math.sign(x)).toBe(expectedXSign);
        if (expectedYSign === 0) expect(Math.abs(y)).toBeLessThan(0.05);
        else expect(Math.sign(y)).toBe(expectedYSign);
        expect(Math.abs(x)).toBeLessThanOrEqual(48);
        expect(Math.abs(y)).toBeLessThanOrEqual(48);
    },
);

it('slows down near the end of the pointer movement', () => {
    vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
    let queuedFrame: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        queuedFrame = callback;
        return 1;
    });
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1440,
    });
    const { result } = renderHook(() => useCoinParallax(ref));
    const readX = () =>
        Number(
            String(result.current.transform).match(
                /translate3d\((-?\d+(?:\.\d+)?)px/,
            )?.[1],
        );
    const runFrame = (timestamp: number) => {
        const callback = queuedFrame as FrameRequestCallback | null;
        queuedFrame = null;
        act(() => callback?.(timestamp));
        return readX();
    };

    act(() =>
        window.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 100, clientY: 50 }),
        ),
    );
    const xAt0 = runFrame(0);
    const xAt100 = runFrame(100);
    const xAt200 = runFrame(200);
    runFrame(300);
    const xAt400 = runFrame(400);
    const xAt500 = runFrame(500);
    runFrame(600);
    runFrame(700);
    runFrame(800);
    runFrame(900);
    const xAt1000 = runFrame(1000);
    const xAt1100 = runFrame(1100);

    expect(Math.abs(xAt200 - xAt100)).toBeGreaterThan(Math.abs(xAt100 - xAt0));
    expect(Math.abs(xAt200 - xAt100)).toBeGreaterThan(
        Math.abs(xAt1100 - xAt1000) * 3,
    );
    expect(xAt100).toBeLessThan(-3.8);
    expect(xAt1000).toBeLessThan(-40);
    expect(xAt1100).toBeLessThan(xAt1000);
});

it('keeps moving smoothly when pointer events arrive between animation frames', () => {
    vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
    let queuedFrame: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        queuedFrame = callback;
        return 1;
    });
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1440,
    });
    const { result } = renderHook(() => useCoinParallax(ref));
    const readX = () =>
        Number(
            String(result.current.transform).match(
                /translate3d\((-?\d+(?:\.\d+)?)px/,
            )?.[1],
        );

    for (let frameIndex = 0; frameIndex < 8; frameIndex += 1) {
        act(() =>
            window.dispatchEvent(
                new PointerEvent('pointermove', {
                    clientX: 70 + frameIndex * 4,
                    clientY: 50,
                }),
            ),
        );
        const callback = queuedFrame as FrameRequestCallback | null;
        queuedFrame = null;
        act(() => callback?.(frameIndex * 16.67));
    }

    expect(readX()).toBeLessThan(-1);
});

it('continues scheduling parallax frames after a StrictMode remount', () => {
    vi.stubGlobal('matchMedia', () => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
    let queuedFrame: FrameRequestCallback | null = null;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        queuedFrame = callback;
        return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
        queuedFrame = null;
    });
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 1440,
    });
    renderHook(() => useCoinParallax(ref), { reactStrictMode: true });

    act(() =>
        window.dispatchEvent(
            new PointerEvent('pointermove', { clientX: 100, clientY: 100 }),
        ),
    );

    expect(queuedFrame).not.toBeNull();
});
