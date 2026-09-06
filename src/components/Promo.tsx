import { promoPoints } from '../data/content';

export default function Promo() {
    return (
        <section id='promo' className='page-section promo section-shell'>
            <header className='section-heading'>
                <h2>PROMO MATERIALS</h2>
                <h3>Creatives that match the product</h3>
            </header>
            <div className='promo-grid'>
                <div
                    className='promo-art'
                    role='img'
                    aria-label='Lunazo bonus campaign creative'
                />
                <ul>
                    {promoPoints.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
