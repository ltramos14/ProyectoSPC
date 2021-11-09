export class Product {
    id?: string;
    idProducer?: string;
    farm: string;
    productType: string;
    name: string;
    price: number;
    unit: string;
    productiveStatus: string;
    availabilityDate: Date;
    description: string;
    image: string;

    constructor(product?: Product) {
    }
}