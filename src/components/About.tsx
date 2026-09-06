const proof = [
    ['5+ years', 'hands-on iGaming experience'],
    [
        'Media buyers ourselves',
        'we run Meta Ads, UAC, In-App, and others — the same channels you do',
    ],
    ['Own traffic', 'runs on every funnel before partners do'],
] as const;

export default function About() {
    return (
        <section className='page-section about section-shell'>
            <div className='section-heading'>
                <h2>WHO'S BEHIND</h2>
                <p>
                    Built by people who've spent years inside iGaming —
                    hands-on, from product to media buying
                </p>
            </div>
            <div className='proof-list'>
                {proof.map(([title, text]) => (
                    <article key={title}>
                        <h3>{title}</h3>
                        <p>{text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
