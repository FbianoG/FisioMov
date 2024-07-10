import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Activities.css'
import { ActivitiesData, UserData } from '../interface/interface'
import axios from 'axios'
import { UrlBack } from '../api/api'

const Activities = () => {

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>([])


    useEffect(() => { getUser(), getActivities() }, [])

    const getUser = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getUser`, { token })
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const getActivities = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getAllActivity`, { token })
            setActivities(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createActivities = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = sessionStorage.getItem('Token')
        const field = e.currentTarget as HTMLFormElement;
        try {
            const response = await axios.post(`${UrlBack}/createAct`, { name: field.name.value, web: field.name.value, category: field.category.value, token })
            getActivities()
        } catch (error) {
            console.log(error)
        }
    }


    const deleteActivities = async (id: string) => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/deleteAct`, { _id: id, token })
            getActivities()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="activities">
            <SideBar user={user} />
            <h2>Gerenciar Atividades</h2>
            <form onSubmit={createActivities}>
                <input type='text' name='name' />
                <input type='text' name='web' />
                <select name="category">
                    <option value="lw">Inferiores</option>
                    <option value="hg">Superiores</option>
                </select>
                <button type="submit">Criar</button>
            </form>
            <ul className="list">
                {activities.map(element => (
                    <li className='list__item'>
                        <div className="list__item-data">
                            <p>{element.name}</p>
                            <a href={element.web} target='_blank'>{element.web}</a>
                        </div>
                        <button onClick={() => deleteActivities(element._id)}>Del</button>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Activities