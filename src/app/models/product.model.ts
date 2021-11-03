export class Product {
    id: string;
    id_productor: string;
    id_finca: string;
    tipo_producto: string;
    nombre: string;
    precio: number;
    unidad_medida: string;
    estado_productivo: string;
    fecha_disponibilidad: Date;
    descripcion: Text;

    constructor(product) {
        this.id = product.id,
        this.id_productor = product.id_productor,
        this.id_finca = product.id_finca,
        this.tipo_producto = product.tipo_producto,
        this.nombre = product.nombre,
        this.precio = product.precio,
        this.unidad_medida = product.unidad_medida,
        this.estado_productivo = product.estado_productivo,
        this.fecha_disponibilidad = product.fecha_disponibilidad,
        this.descripcion = product.descripcion
    }
}