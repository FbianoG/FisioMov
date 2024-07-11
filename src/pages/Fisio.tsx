import './Fisio.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { UrlBack } from "../api/api"
import Modal from "../components/Common/Modal"
import SideBar from '../components/Common/SideBar'
import { ActivitiesData, PatientData, UserData } from '../interface/interface'

import { getPatients, getUser } from '../api/user'
import { getActivities } from '../api/activities'


const Fisio = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [patientEdit, setPatientEdit] = useState<PatientData>()

    const [patients, setPatients] = useState<PatientData[]>([])
    const [activities, setActivities] = useState<ActivitiesData[]>([])

    const [user, setUser] = useState<UserData>()

    useEffect(() => { loadPatients(), loadActivities(), loadUser() }, [])

    const loadUser = async () => {
        try {
            const response = await getUser()
            setUser(response)
            if (response.isPatient) location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }

    const loadPatients = async () => {

        try {
            const response = await getPatients()
            setPatients(response.allPatients)
            if (patientEdit) setPatientEdit(response.allPatients.find((element: PatientData) => element._id === patientEdit._id))
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

    return (
        <div className="fisio">
            <SideBar user={user} />
            <ul className="patients__list">
                <h2>Lista de Pacientes</h2>
                {patients && patients.map(element => (
                    <li key={element._id}>
                        {element.src ? <img src={element.src} alt='' /> : <div className="imgFake">{element.name.slice(0, 1)}</div>}
                        <div className="item__data">
                            <h4>{element.name}</h4>
                            <span>{((new Date().getTime() - new Date(element.nasc).getTime()) / 1000 / 60 / 60 / 24 / 365.25).toFixed(0)} anos</span>
                            <span>{element.email}</span>
                        </div>
                        <button title='Adicionar atividades' onClick={() => { setShowModal(!showModal), setPatientEdit(element) }}>▶️</button>
                    </li>
                ))}
            </ul>

            {showModal && patientEdit && <Modal patient={patientEdit} activity={activities} onClick={setShowModal} functions={{ loadPatients, loadActivities }} />}
        </div>
    )
}


export default Fisio