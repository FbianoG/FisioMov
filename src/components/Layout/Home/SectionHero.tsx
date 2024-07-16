import './SectionHero.css'

export default function SectionHero() {

    return (
        <section>
            <div id='hero' className="hero">
                <img src='hero2.webp' alt='' />
                <div className="hero__content">
                    <span>SAÚDE</span>
                    <h1>FISIOMOV</h1>
                    <span>MOVIMENTO</span>
                </div>
                <span className='alert'>Sua saúde, em suas mãos, com o poder da IA ao seu lado.</span>
                <button>Cadastre-se agora!</button>
            </div>
        </section>

    )
}