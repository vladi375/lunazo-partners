import { affiliateRegistrationUrl } from '../data/content';

export default function Closing() {
    return (
        <>
            <section className='closing section-shell'>
                <h2>
                    Start your first moon <span>phase</span>
                </h2>
                <p>
                    Approval within 24 hours. Your manager is one Telegram
                    message away.
                </p>
                <a
                    className='button button-primary'
                    href={affiliateRegistrationUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Join Lunazo Partners
                </a>
            </section>
            <footer className='footer section-shell'>
                <span className='brand'>
                    <span>LUNAZO</span>
                    <span>PARTNERS</span>
                </span>
                <nav aria-label='Legal'>
                    <a href='#terms'>Terms</a>
                    <a href='#privacy'>Privacy</a>
                    <span>18+</span>
                    <a href='mailto:partners@lunazo.bet'>partners@lunazo.bet</a>
                </nav>
            </footer>
        </>
    );
}
