import axios from "axios";
import { UrlBack } from "./api";

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('Token')}`

export interface FormData {
    name: string
    web: string
    category: string
}

export interface FormDataSendAct {
    name?: string
    qtd: number
    series: number
    id: string
}

const getActivities = async () => {
    try {
        const response = await axios.post(`${UrlBack}/getAllActivity`)
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const createActivities = async (data: FormData) => {
    try {
        const response = await axios.post(`${UrlBack}/createAct`, { data })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const deleteActivities = async (id: string) => {
    const token = sessionStorage.getItem('Token')
    try {
        const response = await axios.post(`${UrlBack}/deleteAct`, { _id: id })
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}




const sendActivity = async (data: FormDataSendAct, patientId: string) => {
    try {
        const response = await axios.post(`${UrlBack}/sendActivity`, { data, patientId })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const deleteActivity = async (id: string, actId: string) => {
    try {
        const response = await axios.post(`${UrlBack}/deleteActivity`, { patientId: id, actId })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

export { getActivities, createActivities, deleteActivities, sendActivity, deleteActivity }