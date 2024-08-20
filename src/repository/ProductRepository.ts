import { ResultSetHeader, RowDataPacket } from "mysql2";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CreateProductDto } from "../model/dto/product/CreateProductDto";
import { ProductEntity } from "../model/entity/ProductEntity";
import { ProductDto } from "../model/dto/product/ProductDto";

export class ProductRepository {
    private static instance: ProductRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): ProductRepository {
        if (!ProductRepository.instance)
            ProductRepository.instance = new ProductRepository();

        return ProductRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS products (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(512) NOT NULL,
                price DECIMAL(8, 2) NOT NULL,
                stock INT NOT NULL,
                category VARCHAR(255) NOT NULL,
                PRIMARY KEY (id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(product: CreateProductDto): Promise<ProductEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)`,
            [product.name, product.description, product.price, product.stock, product.category]);

        if (response instanceof ErrorCode)
            return response;

        return new ProductEntity(response.insertId, product.name, product.description, product.price, product.stock, product.category);
    }

    public async getByID(id: number): Promise<ProductEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM products WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Produto não encontrado');

        return new ProductEntity(response[0].id, response[0].name, response[0].description, response[0].price, response[0].stock, response[0].category);
    }

    public async getAll(): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM products`);

        return response;
    }

    public async update(product: ProductDto): Promise<ProductEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ? WHERE id = ?`,
            [product.name, product.description, product.price, product.stock, product.category, product.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Produto não encontrado');

        return await this.getByID(product.id);
    }

    public async delete(id: number): Promise<number | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM products WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Produto não encontrado');

        return id;
    }
}