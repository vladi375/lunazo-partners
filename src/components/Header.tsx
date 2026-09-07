import { useEffect, useRef, useState } from 'react';
import brandLogo from '../assets/brand/Layer_1.png';
import { navItems, URL } from '../data/content';

export default function Header() {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                requestAnimationFrame(() => triggerRef.current?.focus());
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    const closeFromMenu = () => {
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
    };

    return (
        <header className='site-header'>
            <div className='header-inner'>
                <a
                    className='brand'
                    href='#content'
                    aria-label='Lunazo Partners home'
                >
                    <img src={brandLogo} alt='Lunazo Partners' />
                </a>
                <nav className='desktop-nav' aria-label='Primary navigation'>
                    {navItems.map((item) => (
                        <a href={item.href} key={item.href}>
                            {item.label}
                            {'badge' in item && <sup>{item.badge}</sup>}
                        </a>
                    ))}
                </nav>
                <div className='header-actions'>
                    <a
                        className='button button-secondary'
                        href={URL.AFFILIATE_LOGIN}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Log in
                    </a>
                    <a
                        className='button button-primary'
                        href={URL.AFFILIATE_REGISTRATION}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Join now
                    </a>
                </div>
                <button
                    ref={triggerRef}
                    className='menu-trigger'
                    type='button'
                    aria-label='Open menu'
                    aria-controls='mobile-navigation'
                    aria-expanded={open}
                    onClick={() => setOpen(true)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>
            {open && (
                <div
                    id='mobile-navigation'
                    className='mobile-menu'
                    role='dialog'
                    aria-modal='true'
                    aria-label='Navigation'
                >
                    <div className='mobile-menu-top'>
                        <span className='brand'>
                            <img src={brandLogo} alt='Lunazo Partners' />
                        </span>
                        <button
                            type='button'
                            className='menu-close'
                            aria-label='Close menu'
                            onClick={closeFromMenu}
                        >
                            ×
                        </button>
                    </div>
                    <nav aria-label='Mobile navigation'>
                        {navItems.map((item) => (
                            <a
                                href={item.href}
                                key={item.href}
                                onClick={closeFromMenu}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className='mobile-menu-actions'>
                        <a
                            className='button button-primary'
                            href={URL.AFFILIATE_REGISTRATION}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Join now
                        </a>
                        <a
                            className='button button-secondary'
                            href={URL.AFFILIATE_LOGIN}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Log in
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
