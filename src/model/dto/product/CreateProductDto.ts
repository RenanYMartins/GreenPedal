export class CreateProductDto {
    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public category: string;

    constructor(name: string, description: string, price: number, stock: number, category: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }
}