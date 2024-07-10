import axios from 'axios'
import './Modal.css'
import { UrlBack } from '../../api/api'
import { ActivitiesData, PatientData } from '../../interface/interface'

import { useForm, SubmitHandler } from "react-hook-form";
import { deleteActivities, deleteActivity, FormDataSendAct, sendActivity } from '../../api/activities';

interface ModalProps {
    patient: PatientData
    activity: ActivitiesData[]
    onClick: (value: boolean) => void
    functions: { loadActivities: () => void, loadPatients: () => void }
}

const Modal: React.FC<ModalProps> = ({ patient, activity, onClick, functions }) => {

    const { register, handleSubmit } = useForm<FormDataSendAct>();

    const updateActivites = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        const token = sessionStorage.getItem('Token')
        const field = e.currentTarget as HTMLFormElement;
        const activity = { id, series: Number(field.series.value), qtd: Number(field.qtd.value) }
        try {
            const response = await axios.post(`${UrlBack}/updateActivity`, { patientId: patient._id, activity, token })
            functions.loadActivities()
        } catch (error) {
            console.log(error)
        }
    }

    const sendAct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const field = e.currentTarget as HTMLFormElement;
        const data: FormDataSendAct = { id: field.id.value, series: Number(field.series.value), qtd: Number(field.qtd.value) }
        try {
            const response = await sendActivity(data, patient._id)
            functions.loadPatients()
        } catch (error) {
            console.log(error)
        }
    }

    const deteleAtivitys = async (actId: string) => {
        try {
            const response = await deleteActivity(patient._id, actId)
            functions.loadPatients()
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
                    {activity && patient.proced.map(element => {
                        const atv = activity.find(act => element.id === act._id)
                        if (!atv) return
                        return (
                            <form key={element.id} className='activities__item' onSubmit={(e) => updateActivites(e, element.id)}>
                                <span>{atv?.name}</span>
                                <input type='number' name='series' defaultValue={element.series} />
                                <input type='number' name='qtd' defaultValue={element.qtd} />
                                <button title='Atualizar' type='submit'>✏️</button>
                                <button title='Excluir Atividade' type='button' onClick={() => deteleAtivitys(element.id)}>🗑️</button>
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
                    {activity && activity.map(element => {
                        if (patient.proced.some(e => e.id === element._id)) return
                        return (
                            <form className="activities__item" key={element._id} onSubmit={(e) => sendAct(e)}>
                                <span>{element.name}</span>
                                <input type='hidden' name='id' value={element._id} />
                                <input type='number' name='series' />
                                <input type='number' name='qtd' />
                                <button type='submit' style={{ gridColumn: 'span 2' }}>Enviar</button>
                            </form>
                        )
                    })}
                </div>
                <button className='btnExit' onClick={() => onClick(false)}>❌</button>
            </div>
        </div >
    )
}

export default Modal