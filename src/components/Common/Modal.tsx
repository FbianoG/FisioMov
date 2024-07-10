import axios from 'axios'
import './Modal.css'
import { UrlBack } from '../../api/api'

interface ModalProps {
    patient: any
    activity: any
    onClick: () => void
    functions: any
}

const Modal: React.FC<ModalProps> = ({ patient, activity, onClick, functions }) => {


    const updateActivites = async (e, id) => {
        e.preventDefault()
        const field = e.target
        const activity = { id, series: Number(field.series.value), qtd: Number(field.qtd.value) }
        try {
            const response = await axios.post(`${UrlBack}/updateActivity`, { patientId: patient._id, activity, token: sessionStorage.getItem('Token') })
            functions.getPatients(sessionStorage.getItem('Token'))
        } catch (error) {
            console.log(error)
        }
    }


    const sendActivites = async (e, id) => {
        e.preventDefault()
        const field = e.target
        const activity = { id, series: Number(field.series.value), qtd: Number(field.qtd.value) }
        try {
            const response = await axios.post(`${UrlBack}/sendActivity`, { patientId: patient._id, activity, token: sessionStorage.getItem('Token') })
            functions.getPatients(sessionStorage.getItem('Token'))
        } catch (error) {
            console.log(error)
        }

    }


    const deteleAtivities = async (e: string) => {
        try {
            const response = await axios.post(`${UrlBack}/deleteActivity`, { patientId: patient._id, actId: e, token: sessionStorage.getItem('Token') })
            functions.getPatients(sessionStorage.getItem('Token'))
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="modal">
            <div className="content">
                <h3>{patient.name}</h3>
                <div className="activities__header">
                    <span>Atividade</span>
                    <span>Series</span>
                    <span>Repetições</span>
                </div>
                <div className="activities__list">
                    {patient.proced.map(element => {
                        const atv = activity.find(act => element.id === act._id)
                        return (
                            <form className='activities__item' onSubmit={(e) => updateActivites(e, atv._id)}>
                                <span>{atv.name}</span>
                                <input type='number' name='series' defaultValue={element.series} />
                                <input type='number' name='qtd' defaultValue={element.qtd} />
                                <button title='Atualizar' type='submit'>✏️</button>
                                <button title='Excluir Atividade' type='button' onClick={() => deteleAtivities(element.id)}>🗑️</button>
                            </form>
                        )
                    })}
                </div>
                <div className="activities__header">
                    <span>Atividade</span>
                    <span>Series</span>
                    <span>Repetições</span>
                </div>
                <div className="activities__list">
                    {activity.map(element => {

                        if (patient.proced.some(e => e.id === element._id)) return

                        return (

                            <form className="activities__item" onSubmit={(e) => sendActivites(e, element._id)}>
                                <span>{element.name}</span>
                                <input type='number' name='series' />
                                <input type='number' name='qtd' />
                                <button type='submit' style={{ gridColumn: 'span 2' }}>Enviar</button>
                            </form>
                        )
                    })}
                </div>
                <button className='btnExit' onClick={onClick}>❌</button>
            </div>
        </div>
    )
}

export default Modal