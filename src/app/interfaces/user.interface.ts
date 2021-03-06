export interface User {
    typeuser: string,
    names: string,
    lastnames: string,
    email: string,
    dateBirth: Date,
    identificationType: string,
    identification: string,
    phone: string,
    municipality: string,
    profileURL: string,
    stateUser: boolean,
    notificationsToken?: string[],
    uid?: string,
}