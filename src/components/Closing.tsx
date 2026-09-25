import brandLogo from '../assets/brand/Layer_1.png';
import { URL } from '../data/content';
import { withLandingQueryParams } from '../utils/withLandingQueryParams';

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
                    href={withLandingQueryParams(
                        URL.AFFILIATE_REGISTRATION,
                        window.location.search,
                    )}
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
                        href={withLandingQueryParams(
                            URL.TERMS,
                            window.location.search,
                        )}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Terms
                    </a>
                    <a
                        href={withLandingQueryParams(
                            URL.PRIVACY,
                            window.location.search,
                        )}
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
