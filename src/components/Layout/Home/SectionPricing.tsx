import './SectionPricing.css'

export default function SectionPricing() {

    return (
        <section>
            <div className="pricing">
                <div className="pricing__card reveal">
                    <i className="fa-solid fa-user-doctor"></i>
                    <span>50<b>+</b></span>
                    <span className='pricing__card-divider'></span>
                    <p>Colaboradores altamente capacitados</p>
                </div>
                <div className="pricing__card reveal">
                    <i className="fa-solid fa-user-group"></i>
                    <span>3500<b>+</b></span>
                    <span className='pricing__card-divider'></span>
                    <p>Clientes espalhados por todo Brasil</p>
                </div>
                <div className="pricing__card reveal">
                    <i className="fa-solid fa-wheelchair-move"></i>
                    <span>100<b>+</b></span>
                    <span className='pricing__card-divider'></span>
                    <p>Técnicas diferentes para o seu cuidado</p>
                </div>
            </div>
        </section>
    )
}