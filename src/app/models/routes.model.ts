import { DateTime } from "luxon";

export class Route {
    id?: string;
    serviceDays: string[];
    origin: string;
    destination: string;
    route: string[];
    startHour:  DateTime;
    
    constructor(route?: Route) {}
}