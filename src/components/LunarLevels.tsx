import { lunarLevels } from '../data/content';
import crescentMoon from '../assets/lunar-levels/crescent.png';
import fullMoon from '../assets/lunar-levels/full-moon.png';
import gibbousMoon from '../assets/lunar-levels/gibbous.png';
import halfMoon from '../assets/lunar-levels/half-moon.png';
import newMoon from '../assets/lunar-levels/new-moon.png';

const moonImages = {
    'new-moon': newMoon,
    crescent: crescentMoon,
    'half-moon': halfMoon,
    gibbous: gibbousMoon,
    'full-moon': fullMoon,
} as const;

export default function LunarLevels() {
    return (
        <section id='lunar-levels' className='page-section lunar section-shell'>
            <header className='section-heading split-heading'>
                <p className='eyebrow'>Every partner grows to a full moon</p>
                <div className='lunar-title-row'>
                    <h2>LUNAR LEVELS</h2>
                    <span className='launch-badge'>Launching soon</span>
                </div>
            </header>
            <p className='section-intro'>
                One lifetime status for every payout model — it never resets.
                FTDs count from day one: founding partners start at the phase
                they've earned.
            </p>
            <div className='lunar-grid'>
                {lunarLevels.map((level) => (
                    <div className='lunar-item' key={level.id}>
                        <span className='moon'>
                            <img
                                src={moonImages[level.id]}
                                alt={`${level.title} phase`}
                            />
                        </span>
                        <strong>{level.title}</strong>
                    </div>
                ))}
            </div>
            <p className='note-pill'>
                Details and benefits for each level will be revealed at launch
            </p>
        </section>
    );
}
