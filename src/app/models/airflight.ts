import { Company } from './company'

export interface Airflight {
    _id: string,
    name: string,
    ticketClass: string,
    ticketId: string,
    gender: string,
    email: string,
    phone: string,
    flyDate: string,
    destinyCountry: string,
    planeScale: string[],
    company: Company[]
}

