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

    const { register, handleSubmit } = useForm<FormData>();

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
            loadActivities()
        } catch (error) {
            console.log(error)
        }
    }

    const createAct = async (data: FormData) => {
        try {
            const response = await createActivities(data)
            loadUser()
        } catch (error) {
            console.log(error)
        }
    }


    const deleteAct = async (id: string) => {
        try {
            const response = await deleteActivities(id)
            loadUser()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="activities">
            <SideBar user={user} />
            <h2>Gerenciar Atividades</h2>
            <form onSubmit={handleSubmit(createAct)}>
                <input type='text' {...register('name')} />
                <input type='text' {...register('web')} />
                <select {...register('category')}>
                    <option value="lw">Inferiores</option>
                    <option value="hg">Superiores</option>
                </select>
                <button type="submit">Criar</button>
            </form>
            <ul className="list">
                {activities && activities.map(element => (
                    <li className='list__item' key={element._id}>
                        <div className="list__item-data">
                            <p>{element.name}</p>
                            <a href={element.web} target='_blank'>{element.web}</a>
                        </div>
                        <button onClick={() => deleteAct(element._id)}>Del</button>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Activities