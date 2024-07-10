import './Fisio.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { UrlBack } from "../api/api"
import Modal from "../components/Common/Modal"
import SideBar from '../components/Common/SideBar'
import { ActivitiesData, PatientData, UserData } from '../interface/interface'


const Fisio = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [patientEdit, setPatientEdit] = useState<PatientData>()

    const [allPatients, setAllPatients] = useState<PatientData[]>([])
    const [activities, setActivities] = useState<ActivitiesData[]>([])

    const [user, setUser] = useState<UserData>()

    useEffect(() => {
        getPatients()
        getActivities()
        getUser()
    }, [])

    const getUser = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getUser`, { token })
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const getPatients = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getAllUsers`, { token })
            console.log(response.data)
            setAllPatients(response.data.allPatients)
            if (patientEdit) setPatientEdit(response.data.allPatients.find((element: any) => element._id === patientEdit._id))
        } catch (error) {
            console.log(error)
        }
    }

    const getActivities = async () => {
        const token = sessionStorage.getItem('Token')
        try {
            const response = await axios.post(`${UrlBack}/getAllActivity`, { token })
            setActivities(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="fisio">
            <SideBar user={user} />
            <ul className="patients__list">
                <h2>Lista de Pacientes</h2>
                <div className="patients__list-header">
                    <span>Nome</span>
                    <span>Idade</span>
                    <span>Status</span>
                </div>
                {allPatients && allPatients.map(element => (
                    <li key={element._id}>
                        <h4>{element.name}</h4>
                        <span>{((new Date().getTime() - new Date(element.nasc).getTime()) / 1000 / 60 / 60 / 24 / 365.25).toFixed(0)} anos</span>
                        <span>Ativo</span>
                        <button title='Adicionar atividades' onClick={() => { setShowModal(!showModal), setPatientEdit(element) }}>▶️</button>
                    </li>
                ))}
            </ul>

            {showModal && <Modal patient={patientEdit} activity={activities} onClick={() => setShowModal(!showModal)} functions={{ getPatients, getActivities }} />}
        </div>
    )
}


export default Fisio