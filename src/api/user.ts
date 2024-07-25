import axios from "axios"
import { UrlBack } from "./api"


axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('Token')}`

export interface FormLoginData {
    email: string
    password: string
}

export interface FormRegisterData {
    email: string
    name: string
    password: string
    nasc: Date
    src?: any
}

const login = async (data: FormLoginData) => {
    try {
        if (data.email.trim() === '' || data.password.trim() === '') throw new Error("Preencha todos os campos.")
        data.email = data.email.toLowerCase()
        const response = await axios.post(`${UrlBack}/login`, { data })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const createUser = async (data: FormRegisterData) => {

    if (data.src) {
        if (data.src.type !== 'image/jpg' && data.src.type !== 'image/png' && data.src.type !== 'image/jpeg') throw new Error("Só permitido arquivos png, jpg, jpeg.")
    }
    if (data.src?.size > 4 * 1024 * 1024) throw new Error("O arquivo é maior que 4mb.")

    try {
        const response = await axios.post(`${UrlBack}/createUser`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const getUser = async () => {
    try {
        const response = await axios.post(`${UrlBack}/getUser`)
        return response.data.user
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}

const getPatients = async () => {
    try {
        const response = await axios.post(`${UrlBack}/getAllUsers`)
        return response.data     /// ! status: 200, auth: true, allPatients:
    } catch (error: any) {
        if (error.response) throw new Error(error.response.data.message)
        else if (error.request) throw new Error("Error de rede. Tente novamente.")
        else throw new Error(error.message)
    }
}



export { login, createUser, getUser, getPatients }


