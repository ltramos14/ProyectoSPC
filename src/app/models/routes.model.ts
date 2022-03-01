import { DateTime } from "luxon";

export class Route {
    id?: string;
    serviceDays: string[];
    origin: string;
    destination: string;
    routes: string[];
    startHour:  DateTime;
    
    constructor(route?: Route) {}
}