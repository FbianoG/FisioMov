import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Activities.css'
import { ActivitiesData, UserData } from '../interface/interface'
import axios from 'axios'
import { UrlBack } from '../api/api'

import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from '../api/user'
import { createActivities, deleteActivities, FormData, getActivities } from '../api/activities'
import Toast from '../components/Common/Toast'



const Activities = () => {

    const { register, handleSubmit, reset } = useForm<FormData>();

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>([])

    const [toast, setToast] = useState<any>(false)


    useEffect(() => { loadUser(), loadActivities() }, [])

    const loadUser = async () => {
        try {
            const response = await getUser()
            setUser(response)
            if (response.isPatient) location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }

    const loadActivities = async () => {
        try {
            const response = await getActivities()
            setActivities(response)
        } catch (error: any) {
            console.log(error)
            setToast({ text: error.message, type: 'error' })
        }
    }

    const createAct = async (data: FormData) => {
        try {
            const response = await createActivities(data)
            loadActivities()
            reset()
            setToast({ text: response.message, type: 'success' })
        } catch (error: any) {
            console.log(error)
            setToast({ text: error.message, type: 'error' })
        }
    }

    const deleteAct = async (id: string) => {
        try {
            const response = await deleteActivities(id)
            loadActivities()
            setToast({ text: 'Atividade excluída com sucesso!', type: 'success' })
        } catch (error: any) {
            console.log(error)
            setToast({ text: error.message, type: 'error' })
        }
    }

    return (
        <div className="fisio">
            <SideBar user={user} />
            <ul className="patients__list">
                <h2>Gerenciar Atividades</h2>
                <form onSubmit={handleSubmit(createAct)}>
                    <input type='text' {...register('name')} placeholder='Nome da Atividade' />
                    <input type='text' {...register('web')} placeholder='Link da IA' />
                    <select {...register('category')}>
                        <option value="lw">Inferiores</option>
                        <option value="hg">Superiores</option>
                    </select>
                    <button title='criar atividade' type="submit">Criar Atividade</button>
                </form>
                <ul>
                    {activities && activities.map(element => (
                        <li key={element._id}>
                            <div className="item__data">
                                <h4>{element.name}</h4>
                                <span>{element.category === 'hg' ? 'Superior' : 'Inferior'}</span>
                                <a href={element.web} target='_blank'>Link IA</a>
                            </div>
                            <button title='Excluir atividade' onClick={() => deleteAct(element._id)}>❌</button>
                        </li>
                    ))}
                </ul>
            </ul>

            {toast && <Toast text={toast.text} type={toast.type} onClick={() => setToast(false)} />}
        </div>
    )
}

export default Activities