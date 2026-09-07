import brandLogo from '../assets/brand/Layer_1.png';
import { URL } from '../data/content';

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
                    href={URL.AFFILIATE_REGISTRATION}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Join Lunazo Partners
                </a>
            </section>
            <footer className='footer section-shell'>
                <span className='brand'>
                    <img src={brandLogo} alt='Lunazo Partners' />
                </span>
                <nav aria-label='Legal'>
                    <a
                        href={URL.TERMS}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Terms
                    </a>
                    <a
                        href={URL.PRIVACY}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Privacy
                    </a>
                    <span>18+</span>
                    <a href='mailto:partners@lunazo.bet'>partners@lunazo.bet</a>
                </nav>
            </footer>
        </>
    );
}
