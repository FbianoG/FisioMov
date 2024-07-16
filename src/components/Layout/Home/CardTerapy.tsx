// import './CardTerapy.css'

export default function CardTerapy({ data }) {

    return (
        <>
            <div className="terapy__card">
                <div className="terapy__card-data">
                    <h3>{data.title}</h3>
                    <p>{data.text}</p>
                </div>
                <img src={data.src} alt={'Foto ' + data.title} loading="lazy" />
            </div>
            <span className="terapy__list-divider"></span>
        </>
    )
}