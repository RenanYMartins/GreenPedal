export class ProductDto {
    public readonly id: number;
    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public category: string;

    constructor(id: number, name: string, description: string, price: number, stock: number, category: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}