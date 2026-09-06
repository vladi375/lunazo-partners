import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type RefObject,
} from 'react';

type Motion = { x: number; y: number; scrollY: number; rotate: number };
const still: Motion = { x: 0, y: 0, scrollY: 0, rotate: 0 };
type PointerVelocity = Pick<Motion, 'x' | 'y' | 'rotate'>;
const stillVelocity: PointerVelocity = { x: 0, y: 0, rotate: 0 };
const springFrequency = 7;
const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));
const stepCriticalSpring = (
    value: number,
    velocity: number,
    targetValue: number,
    deltaSeconds: number,
) => {
    const offset = value - targetValue;
    const intermediate = velocity + springFrequency * offset;
    const decay = Math.exp(-springFrequency * deltaSeconds);
    return {
        value: targetValue + (offset + intermediate * deltaSeconds) * decay,
        velocity:
            (velocity - springFrequency * intermediate * deltaSeconds) * decay,
    };
};
const motionQuery = () =>
    window.matchMedia?.('(prefers-reduced-motion: reduce)') ??
    ({
        matches: false,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
    } as unknown as MediaQueryList);

export function useCoinParallax(
    ref: RefObject<HTMLElement | null>,
): CSSProperties {
    const prefersReduced =
        typeof window !== 'undefined' && motionQuery().matches;
    const [style, setStyle] = useState<CSSProperties>(
        prefersReduced
            ? { transform: 'none' }
            : { transform: 'translate3d(0px, 0px, 0) rotate(0deg)' },
    );
    const current = useRef<Motion>({ ...still });
    const target = useRef<Motion>({ ...still });
    const velocity = useRef<PointerVelocity>({ ...stillVelocity });
    const previousFrameAt = useRef<number | null>(null);
    const frame = useRef<number | null>(null);

    useEffect(() => {
        const media = motionQuery();
        if (media.matches) {
            setStyle({ transform: 'none' });
            return;
        }

        const renderFrame = (timestamp: number) => {
            const now = current.current;
            const goal = target.current;
            const deltaSeconds =
                previousFrameAt.current === null
                    ? 1 / 60
                    : clamp(
                          (timestamp - previousFrameAt.current) / 1000,
                          1 / 240,
                          0.05,
                      );
            previousFrameAt.current = timestamp;
            const nextX = stepCriticalSpring(
                now.x,
                velocity.current.x,
                goal.x,
                deltaSeconds,
            );
            const nextY = stepCriticalSpring(
                now.y,
                velocity.current.y,
                goal.y,
                deltaSeconds,
            );
            const nextRotate = stepCriticalSpring(
                now.rotate,
                velocity.current.rotate,
                goal.rotate,
                deltaSeconds,
            );
            now.x = nextX.value;
            now.y = nextY.value;
            now.rotate = nextRotate.value;
            velocity.current.x = nextX.velocity;
            velocity.current.y = nextY.velocity;
            velocity.current.rotate = nextRotate.velocity;
            now.scrollY += (goal.scrollY - now.scrollY) * 0.14;
            const totalY = clamp(now.y + now.scrollY, -64, 64);
            setStyle({
                transform: `translate3d(${now.x.toFixed(2)}px, ${totalY.toFixed(2)}px, 0) rotate(${now.rotate.toFixed(2)}deg)`,
            });
            const pointerDistance =
                Math.abs(goal.x - now.x) +
                Math.abs(goal.y - now.y) +
                Math.abs(goal.rotate - now.rotate);
            const pointerSpeed =
                Math.abs(velocity.current.x) +
                Math.abs(velocity.current.y) +
                Math.abs(velocity.current.rotate);
            const unsettled =
                pointerDistance > 0.03 ||
                pointerSpeed > 0.03 ||
                Math.abs(goal.scrollY - now.scrollY) > 0.05;
            if (unsettled) {
                frame.current = requestAnimationFrame(renderFrame);
            } else {
                now.x = goal.x;
                now.y = goal.y;
                now.rotate = goal.rotate;
                velocity.current = { ...stillVelocity };
                previousFrameAt.current = null;
                frame.current = null;
            }
        };
        const requestRender = () => {
            if (frame.current === null)
                frame.current = requestAnimationFrame(renderFrame);
        };
        const onPointerMove = (event: PointerEvent) => {
            if (window.innerWidth <= 760 || !ref.current) return;
            const bounds = ref.current.getBoundingClientRect();
            const normalizedX =
                ((event.clientX - bounds.left) / Math.max(bounds.width, 1) -
                    0.5) *
                2;
            const normalizedY =
                ((event.clientY - bounds.top) / Math.max(bounds.height, 1) -
                    0.5) *
                2;
            target.current.x = clamp(normalizedX * -48, -48, 48);
            target.current.y = clamp(normalizedY * -48, -48, 48);
            target.current.rotate = clamp(normalizedX * -2, -2, 2);
            requestRender();
        };
        const onScroll = () => {
            target.current.scrollY = clamp(window.scrollY * 0.025, -16, 16);
            requestRender();
        };
        const onMotionChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                target.current = { ...still };
                current.current = { ...still };
                velocity.current = { ...stillVelocity };
                previousFrameAt.current = null;
                if (frame.current !== null) cancelAnimationFrame(frame.current);
                frame.current = null;
                setStyle({ transform: 'none' });
            }
        };
        window.addEventListener('pointermove', onPointerMove, {
            passive: true,
        });
        window.addEventListener('scroll', onScroll, { passive: true });
        media.addEventListener?.('change', onMotionChange);
        onScroll();
        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('scroll', onScroll);
            media.removeEventListener?.('change', onMotionChange);
            if (frame.current !== null) cancelAnimationFrame(frame.current);
            frame.current = null;
        };
    }, [ref]);

    return style;
}
