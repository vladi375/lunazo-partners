import './styles/tokens.css';
import './styles/global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import CommissionPlans from './components/CommissionPlans';
import LunarLevels from './components/LunarLevels';
import WhyLunazo from './components/WhyLunazo';
import About from './components/About';
import Markets from './components/Markets';
import Promo from './components/Promo';
import FAQ from './components/FAQ';
import Closing from './components/Closing';

export default function App() {
    return (
        <>
            <Header />
            <main id='content'>
                <Hero />
                <div className='rates-zone'>
                    <CommissionPlans />
                    <LunarLevels />
                </div>
                <WhyLunazo />
                <About />
                <Markets />
                <Promo />
                <FAQ />
                <Closing />
            </main>
        </>
    );
}
