import './SectionTeam.css'

export default function SectionTeam() {

    return (
        <section>
            <h1 className='team__title reveal'>Nossa Equipe de Fisioterapia</h1>
            <p className='team__legend reveal'>Desenvolvido por especialistas em fisioterapia e tecnologia, nosso compromisso é proporcionar a você uma experiência única de recuperação.</p>
            <div className="team__list">
                <div className="team__item reveal">
                    <div className="team__item-img">
                        <img src='https://fbianog.github.io/FisioMov-Front/public/img/adrieli.jpeg' alt='' />
                    </div>
                    <div className="team__item-data">
                        <p>Adrieli Salvador</p>
                        <span>Estudante de Fisioterapia Universidade Uni LaSalle</span>
                    </div>
                </div>
                <div className="team__item reveal">
                    <div className="team__item-img">
                        <img src='https://fbianog.github.io/FisioMov-Front/public/img/barbara.jpeg' alt='' />
                    </div>
                    <div className="team__item-data">
                        <p>Barbara Dias</p>
                        <span>Estudante de Fisioterapia Universidade Uni LaSalle</span>
                    </div>
                </div>
                <div className="team__item reveal">
                    <div className="team__item-img">
                        <img src='https://fbianog.github.io/FisioMov-Front/public/img/yasmim.jpeg' alt='' />
                    </div>
                    <div className="team__item-data">
                        <p>Yasmim Braga</p>
                        <span>Estudante de Fisioterapia Universidade Uni LaSalle</span>
                    </div>
                </div>
            </div>

        </section>

    )
}