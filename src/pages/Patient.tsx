import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Patient.css'
import axios from 'axios'
import { UrlBack } from '../api/api'
import { ActivitiesData, UserData } from '../interface/interface'



const Patient = () => {

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>()

    useEffect(() => { getUser(), getActivities() }, [])

    const getUser = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getUser`, { token })
            console.log(response.data.user)
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const getActivities = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getAllActivity`, { token })
            console.log(response.data)
            setActivities(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="patient">
            <SideBar user={user} />
            <div className="activities">
                <h2>Atividades</h2>
                <ul className="activities__list">
                    {user?.proced.map(element => {
                        const act = activities?.find(e => e._id === element.id)
                        return (
                            <li>
                                <span style={{fontSize:'24px'}}>🏋🏼‍♂️</span>
                                <div className="activities__item-data">
                                    <p>{act?.name}</p>
                                    <span><strong>Series:</strong> {element.series}</span>
                                    <span><strong>Repetições:</strong> {element.qtd}</span>
                                </div>
                                <a>🌐</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Patient