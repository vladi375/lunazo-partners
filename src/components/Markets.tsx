import argentinaLabel from '../assets/markets/argentina.png';
import colombiaLabel from '../assets/markets/colombia.png';
import marketMap from '../assets/markets/map.png';

export default function Markets() {
    return (
        <section className='page-section markets section-shell'>
            <div className='markets-copy section-heading'>
                <h2>MARKETS</h2>
                <h3>Two markets, done properly</h3>
                <p>
                    We'd rather win two GEOs than spread across ten. Localized
                    funnels, payments and creatives per market
                </p>
                <div className='countries'>
                    <span className='country-label'>
                        <span className='country-flag'>
                            <img src={colombiaLabel} alt='Flag of Colombia' />
                        </span>
                        Colombia
                    </span>
                    <span className='country-label'>
                        <span className='country-flag'>
                            <img src={argentinaLabel} alt='Flag of Argentina' />
                        </span>
                        Argentina
                    </span>
                </div>
                <p className='note-pill'>More LATAM — when these two are won</p>
            </div>
            <img
                className='map-art'
                src={marketMap}
                alt='Map of Latin America with Colombia and Argentina marked'
            />
        </section>
    );
}
