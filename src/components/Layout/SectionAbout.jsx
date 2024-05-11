import './SectionAbout.css'

export default function SectionAbout() {

    return (
        <section>
            <div class="about">
                <h1 className='about__title'>
                    Faça parte desse movimento,
                </h1>
                <h2 className='about__subtitle'>o seu parceiro virtual.</h2>

                <div className="about__content">
                    <img src='https://img.freepik.com/fotos-gratis/feliz-casal-maduro-fazendo-exercicios-de-alongamento-com-ajuda-de-fisioterapeuta-em-casa_637285-7850.jpg' alt='' />
                    <h1 className='about__content-title'>FisioMov</h1>
                    <p>Nossa plataforma revolucionária permite que você aprimore e otimize o seu tratamento de fisioterapia com a ajuda da mais avançada inteligência artificial.</p>
                    <p>Aqui, a cura está ao alcance de um clique. Com a nossa IA inovadora, você terá à disposição uma avaliação precisa da sua posição e movimentos, permitindo uma fisioterapia personalizada e eficiente. Não importa onde você esteja, fisioMov estará ao seu lado, oferecendo orientações e exercícios direcionados para acelerar sua recuperação.</p>
                    <p>Comece a sua jornada com fisioMov hoje e descubra como a tecnologia pode fazer a diferença em seu processo de recuperação. Sua saúde, em suas mãos, com o poder da IA ao seu lado.</p>
                </div>

            </div>
        </section>
    )
}