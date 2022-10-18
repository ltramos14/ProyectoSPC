export class Product {
    id?: string;
    idProducer?: string;
    farm: string;
    productType: string;
    name: string;
    price: number;
    stock: number;
    unit: string;
    productiveStatus: string;
    availabilityDate: any;
    description: string;
    image: string;
    municipality: string;

    constructor(product?: Product) {
    }
}