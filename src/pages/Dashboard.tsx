import { useEffect, useState } from 'react'
import SideBar from '../components/Common/SideBar'
import { ActivitiesData, PatientData, UserData } from '../interface/interface'
import './Dashboard.css'
import { getPatients, getUser } from '../api/user'
import { getActivities } from '../api/activities'

const Dashboard = () => {

    const [user, setUser] = useState<UserData>()
    const [patients, setPatients] = useState<PatientData[]>()
    const [activities, setActivities] = useState<ActivitiesData[]>()

    useEffect(() => { loadPage() }, [])

    const loadPage = async () => {
        try {
            const [us, ac, pt] = await Promise.all([getUser(), getActivities(), getPatients()])
            if (us.isPatient) location.href = '/'
            setUser(us)
            setPatients(pt.allPatients)
            setActivities(ac)
        } catch (error) {
            console.log(error)
        }
    }

    const averageAge = () => {
        if (!patients || patients.length === 0) return 0
        const allAge = patients.map(element => Number(((new Date().getTime() - new Date(element.nasc).getTime()) / 1000 / 60 / 60 / 24 / 365.25).toFixed(0)))
        const sumAge: number = allAge?.reduce((acc, att) => acc + att, 0)
        return (sumAge / allAge.length).toFixed(1)
    }

    const dataGraph = () => {
        const act: { count: number; name: string }[] = []
        activities?.forEach(activity => {
            let num = 0
            patients?.forEach(patient => {
                patient.proced.forEach(pro => {
                    if (pro.id === activity._id) num += 1
                })
            })
            act.push({ count: num, name: activity.name })
        })
        return act.sort((a, b) => b.count - a.count)
    }

    dataGraph()

    return (
        <div className="fisio" style={{ flexDirection: 'column' }}>
            <SideBar user={user} />
            {patients &&
                <div className='card'>
                    <span><strong></strong> {averageAge()} </span>
                    <p>Média de idade</p>
                </div>}
            <div className="graph">
                <h3>Atividades Mais Usadas </h3>
                <div className="graph__list">
                    {activities &&
                        dataGraph().map(element => (
                            <div className='graph__item'>
                                <span>{element.count}</span>
                                <p>{element.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard