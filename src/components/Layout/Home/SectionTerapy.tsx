import { useEffect, useState } from 'react'
import './SectionTerapy.css'
import { allCardTerapy } from '../../../utils/CardTerapyObj'
import CardTerapy from './CardTerapy'

export default function SectionTerapy() {

    const [cardTerapy, setCardTerapy] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(3)

    function nextCard() {
        if (page + 1 > 3) setPage(1)
        else setPage(page + 1)
    }

    function backCard() {
        if (page - 1 == 0) setPage(3)
        else setPage(page - 1)
    }

    useEffect(() => {
        setCardTerapy(allCardTerapy)
    }, [])
    return (
        <section>
            <div className="terapy">
                <div className="terapy__head reveal">
                    <h2 className='terapy__head-title'>Nossos recursos terapêuticos</h2>
                    <span className="terapy__head-divider"></span>
                    <p className='terapy__head-legend'>Saiba um pouco mais sobre todos os nossos recursos</p>
                </div>
                <div className="terapy__list reveal">
                    {cardTerapy.map((element, index) => {
                        if (window.innerWidth <= 767) return <CardTerapy key={element.title} data={element} />

                        if (index < count * page && index >= (count * page) - 3) {
                            return <CardTerapy key={element.title} data={element} />
                        }
                    })}
                    <div className="terapy__list-scroll">
                        <button aria-label='Voltar cards de recursos terapêuticos' onClick={backCard}><i className="fa-solid fa-chevron-left"></i></button>
                        <button aria-label='Passar cards de recursos terapêuticos' onClick={nextCard}><i className="fa-solid fa-chevron-right"></i></button>
                    </div>

                </div>
            </div>
        </section>
    )
}