import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import './Patient.css'
import axios from 'axios'
import { UrlBack } from '../api/api'
import { ActivitiesData, UserData } from '../interface/interface'
import { getUser } from '../api/user'
import { getActivities } from '../api/activities'



const Patient = () => {

    const [user, setUser] = useState<UserData>()
    const [activities, setActivities] = useState<ActivitiesData[]>()

    useEffect(() => { loadPage() }, [])

    const loadPage = async () => {
        try {
            const [us, ac] = await Promise.all([getUser(), getActivities()])
            setUser(us)
            setActivities(ac)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="patient">
            <SideBar user={user} />
            <div className="patient__activities">
                <h2>Atividades</h2>
                <ul className="activities__list">
                    {user?.proced.map(element => {
                        const act = activities?.find(e => e._id === element.id)
                        if (!act) return 
                        return (
                            <li key={element.id}>
                                <span style={{ fontSize: '24px' }}>🏋🏼‍♂️</span>
                                <div className="activities__item-data">
                                    <p>{act.name}</p>
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