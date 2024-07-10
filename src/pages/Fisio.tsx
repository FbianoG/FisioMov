import './Fisio.css'

import axios from "axios"
import { useEffect, useState } from "react"
import { UrlBack } from "../api/api"
import Modal from "../components/Common/Modal"


const Fisio = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [patientEdit, setPatientEdit] = useState<any>(null)

    const [allPatients, setAllPatients] = useState<any>(null)
    const [allActivities, setAllActivities] = useState<any>(null)

    useEffect(() => {
        const token = sessionStorage.getItem('Token')
        if (token) getPatients(token), getActivities(token)
    }, [])

    const getPatients = async (e: string) => {
        try {
            const response = await axios.post(`${UrlBack}/getAllUsers`, { token: e })
            console.log(response.data)
            setAllPatients(response.data.allPatients)
            if (patientEdit) setPatientEdit(response.data.allPatients.find((element: any) => element._id === patientEdit._id))
        } catch (error) {
            console.log(error)
        }
    }

    const getActivities = async (e: string) => {
        try {
            const response = await axios.post(`${UrlBack}/getAllActivity`, { token: e })
            console.log(response.data)
            setAllActivities(response.data.allAct)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="fisio">
            <div className="sideBar">
                <h1>FisioMov</h1>
                <ul className="sideBar__list">
                    <li className='active'>Pacientes</li>
                    <li>Dashboard</li>
                    <li>Configurações</li>
                    <li>Sair</li>
                </ul>
            </div>
            <ul className="patients__list">
                <h2>Lista de Pacientes</h2>
                <div className="patients__list-header">
                    <span>Nome</span>
                    <span>Idade</span>
                    <span>Status</span>
                </div>
                {allPatients && allPatients.map(element => (
                    <li>
                        <h4>{element.name}</h4>
                        <span>{((new Date().getTime() - new Date(element.nasc).getTime()) / 1000 / 60 / 60 / 24 / 365.25).toFixed(0)} anos</span>
                        <span>Ativo</span>
                        <button onClick={() => { setShowModal(!showModal), setPatientEdit(element) }}>Incluir</button>
                    </li>
                ))}
            </ul>

            {showModal && <Modal patient={patientEdit} activity={allActivities} onClick={() => setShowModal(!showModal)} functions={{ getPatients, getActivities }} />}
        </div>
    )
}


export default Fisio