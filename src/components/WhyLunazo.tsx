import { benefits } from '../data/content';

export default function WhyLunazo() {
    return (
        <section
            className='page-section why section-shell'
            aria-labelledby='why-title'
        >
            <header className='section-heading'>
                <h2 id='why-title'>WHY LUNAZO</h2>
                <p>
                    A new brand with founder-led support and LATAM focus — not
                    another white-label farm.
                </p>
            </header>
            <div className='benefit-grid'>
                {benefits.map((benefit, index) => (
                    <article className='benefit-card' key={benefit.id}>
                        <span className='benefit-icon' aria-hidden='true'>
                            <span
                                className={`benefit-icon-art benefit-icon-${index}`}
                            />
                        </span>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
