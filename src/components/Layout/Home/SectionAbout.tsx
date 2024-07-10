import './SectionAbout.css'

export default function SectionAbout() {

    return (
        <section className='about'>

            <div className="about__head reveal">
                <h3 className="head__subtitle">Faça parte desse movimento</h3>
                <h2 className='head__title'>O Seu Parceiro Virtual</h2>
                <p>Nossa plataforma revolucionária utiliza a mais avançada inteligência artificial para aprimorar e otimizar o seu tratamento de fisioterapia.</p>
            </div>
            <div className="about__content reveal">
                <p>Comece a sua jornada hoje e descubra como a tecnologia pode fazer a diferença em seu processo de recuperação. Mais do que apenas uma plataforma de fisioterapia, fisioMov é um movimento pela saúde e bem-estar.</p>
                <ul>
                    <li><p><strong>Avaliação precisa da sua postura e movimentos:</strong> Nossa IA inovadora analisa seus movimentos com precisão, permitindo que seu fisioterapeuta personalize o seu tratamento e identifique áreas que precisam de mais atenção.</p></li>
                    <li><p><strong>Orientações e exercícios direcionados:</strong> Receba instruções personalizadas e exercícios direcionados para acelerar sua recuperação.</p></li>
                    <li><p><strong>Fisioterapia à distância:</strong> Acesse o seu tratamento de fisioterapia de onde estiver, com acompanhamento profissional e suporte contínuo.</p></li>
                    <li><p><strong>Resultados mais rápidos e eficazes:</strong> A fisioterapia com IA comprovadamente reduz o tempo de recuperação e melhora os resultados do tratamento.</p></li>
                </ul>
                <p id='about__content-titleLink reveal'>Junte-se a nós e faça parte da revolução da fisioterapia com inteligência artificial!</p>
                <a className='reveal' href='/'>Cadastre-se agora!</a>
            </div>
        </section >
    )
}