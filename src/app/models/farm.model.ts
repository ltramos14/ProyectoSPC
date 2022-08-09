export class Farm {
    id?: string;
    name: string;
    municipality: string;
    location?: string;
    description: string;
    latitude: number;
    longitude: number;

    constructor(farm?: Farm) {
    }
}