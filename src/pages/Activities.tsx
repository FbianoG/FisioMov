import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Activities.css'
import { ActivitiesData, UserData } from '../interface/interface'
import axios from 'axios'
import { UrlBack } from '../api/api'

import { useForm, SubmitHandler } from "react-hook-form";
import { getUser } from '../api/user'
import { createActivities, deleteActivities, FormData, getActivities } from '../api/activities'



const Activities = () => {

    const { register, handleSubmit, reset } = useForm<FormData>();

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>([])


    useEffect(() => { loadUser(), loadActivities() }, [])

    const loadUser = async () => {
        try {
            const response = await getUser()
            setUser(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const loadActivities = async () => {
        try {
            const response = await getActivities()
            setActivities(response)
        } catch (error) {
            console.log(error)
        }
    }

    const createAct = async (data: FormData) => {
        try {
            const response = await createActivities(data)
            loadActivities()
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAct = async (id: string) => {
        try {
            const response = await deleteActivities(id)
            loadActivities()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fisio">
            <SideBar user={user} />
            <ul className="patients__list">
                <h2>Gerenciar Atividades</h2>
                <form style={{ display: 'flex', margin: '0 auto', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }} onSubmit={handleSubmit(createAct)}>
                    <input type='text' {...register('name')} />
                    <input type='text' {...register('web')} />
                    <select {...register('category')}>
                        <option value="lw">Inferiores</option>
                        <option value="hg">Superiores</option>
                    </select>
                    <button type="submit">Criar</button>
                </form>
                <ul>
                    {activities && activities.map(element => (
                        <li key={element._id}>
                            <div className="item__data">
                                <h4>{element.name}</h4>
                                <span>{element.category}</span>
                                <a href={element.web} target='_blank'>{element.web}</a>
                            </div>
                            <button title='Excluir atividade' onClick={() => deleteAct(element._id)}>❌</button>
                        </li>
                    ))}
                </ul>
            </ul>
        </div>
    )
}

export default Activities