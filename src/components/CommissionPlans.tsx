import { commissionPlans } from '../data/content';
import type { PointerEvent as ReactPointerEvent } from 'react';

function updateSpotlight(event: ReactPointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    card.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
}

function setSpotlightOpacity(
    event: ReactPointerEvent<HTMLElement>,
    opacity: '0' | '1',
) {
    event.currentTarget.style.setProperty('--spotlight-opacity', opacity);
}

export default function CommissionPlans() {
    return (
        <section
            id='commissions'
            className='page-section commissions section-shell'
        >
            <header className='section-heading'>
                <h2>
                    COMMISSION
                    <br className='desktop-only' /> PLANS
                </h2>
                <p>
                    These are starting rates. Show quality — get better terms.
                </p>
            </header>
            <div className='commission-grid'>
                {commissionPlans.map((plan) => {
                    const [prefix, amount] = plan.value.startsWith('up to ')
                        ? ['up to ', plan.value.slice(6)]
                        : ['', plan.value];
                    return (
                        <article
                            className={`commission-card ${plan.id}`}
                            key={plan.id}
                            onPointerEnter={(event) =>
                                setSpotlightOpacity(event, '1')
                            }
                            onPointerMove={updateSpotlight}
                            onPointerLeave={(event) =>
                                setSpotlightOpacity(event, '0')
                            }
                        >
                            <h3>{plan.title}</h3>
                            <strong>
                                {prefix && <small>{prefix}</small>}
                                <span>{amount}</span>
                            </strong>
                            <b>{plan.subtitle}</b>
                            <ul>
                                {plan.bullets.map((bullet) => (
                                    <li key={bullet}>{bullet}</li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
