import axios from "axios"
import { UrlBack } from "./api"


axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('Token')}`

const getUser = async () => {

    try {
        const response = await axios.post(`${UrlBack}/getUser`)
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}



export { getUser }


