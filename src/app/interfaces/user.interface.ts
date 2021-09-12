export interface User {
    uid?: string,
    typeuser: string,
    names: string,
    lastnames: string,
    email: string,
    dateBirth: Date,
    identificationType: string,
    identification: string,
    phone: string,
    profileURL: string,
    stateUser: boolean,
    verifyEmail: boolean,
}