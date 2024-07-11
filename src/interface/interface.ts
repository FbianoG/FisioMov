interface Procedure {
    id: string
    series: string,
    qtd: string
}

export interface UserData {
    email: string
    isPatient: boolean
    message: string
    name: string
    nasc: Date | string
    proced: Procedure[]
    src: string
    tel: string
    _id: string
}

export interface PatientData {
    email: string
    isPacient: boolean
    message: string
    name: string
    nasc: Date | string
    proced: Procedure[]
    src: string
    tel: string
    _id: string
}


export interface ActivitiesData {
    _id: string
    category?: string
    name: string
    src?: string
    web: string
}