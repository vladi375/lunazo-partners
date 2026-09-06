import { useRef, useState } from 'react';
import { faqItems } from '../data/content';
import { useCoinParallax } from '../hooks/useCoinParallax';

export default function FAQ() {
    const [openId, setOpenId] = useState<string | null>(faqItems[0].id);
    const [closingIds, setClosingIds] = useState<Set<string>>(() => new Set());
    const coinRef = useRef<HTMLDivElement>(null);
    const coinStyle = useCoinParallax(coinRef);

    const toggleItem = (itemId: string) => {
        const reduceMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
            false;
        setClosingIds((current) => {
            if (reduceMotion) return new Set();
            const next = new Set(current);
            if (openId) next.add(openId);
            next.delete(itemId);
            if (openId === itemId) next.add(itemId);
            return next;
        });
        setOpenId(openId === itemId ? null : itemId);
    };

    return (
        <section id='faq' className='page-section faq section-shell'>
            <div className='faq-side'>
                <div className='section-heading'>
                    <h2>FAQ</h2>
                    <h3>Questions partners ask first</h3>
                </div>
                <div
                    ref={coinRef}
                    className='faq-coin'
                    style={coinStyle}
                    aria-hidden='true'
                />
            </div>
            <div className='faq-list'>
                {faqItems.map((item) => {
                    const open = item.id === openId;
                    const closing = closingIds.has(item.id);
                    const panelId = `faq-panel-${item.id}`;
                    return (
                        <article
                            className={`faq-item${open ? ' is-open' : ''}${closing ? ' is-closing' : ''}`}
                            key={item.id}
                        >
                            <h3>
                                <button
                                    type='button'
                                    aria-expanded={open}
                                    aria-controls={panelId}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <span>{item.question}</span>
                                    <span aria-hidden='true'>⌃</span>
                                </button>
                            </h3>
                            <div
                                id={panelId}
                                role='region'
                                aria-hidden={!open}
                                className={`faq-panel${open ? ' is-open' : ''}${closing ? ' is-closing' : ''}`}
                                onAnimationEnd={(event) => {
                                    if (
                                        closing &&
                                        event.animationName === 'faq-panel-close'
                                    ) {
                                        setClosingIds((current) => {
                                            const next = new Set(current);
                                            next.delete(item.id);
                                            return next;
                                        });
                                    }
                                }}
                            >
                                <div className='faq-panel-inner'>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
