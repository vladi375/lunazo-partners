import { URL } from '../data/content';

export default function Hero() {
    return (
        <section className='hero' aria-labelledby='hero-title'>
            <div className='hero-art' aria-hidden='true' />
            <div className='hero-content section-shell'>
                <h1 id='hero-title'>
                    Where iGaming
                    <br /> traffic turns
                    <br /> into profit
                </h1>
                <p>
                    Casino and betting offers in Colombia and Argentina.
                    Flexible CPA, RevShare or hybrid — crypto payouts monthly,
                    live stats, a manager who answers.
                </p>
                <div className='hero-actions'>
                    <a
                        className='button button-primary'
                        href={URL.AFFILIATE_REGISTRATION}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Join now
                    </a>
                    <a className='button button-secondary' href='#commissions'>
                        See commissions
                    </a>
                </div>
            </div>
        </section>
    );
}
