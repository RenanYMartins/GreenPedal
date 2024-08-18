import { ResultSetHeader, RowDataPacket } from "mysql2";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { ShoppingCartItemDto } from "../model/dto/shoppingCartItem/ShoppingCartItemDto";
import { ShoppingCartItemEntity } from "../model/entity/ShoppingCartItemEntity";

export class ShoppingCartRepository {
    private static instance: ShoppingCartRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): ShoppingCartRepository {
        if (!ShoppingCartRepository.instance)
            ShoppingCartRepository.instance = new ShoppingCartRepository();

        return ShoppingCartRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS shoppingCartItems (
                userID INT UNSIGNED NOT NULL,
                productID INT UNSIGNED NOT NULL,
                quantity INT NOT NULL,
                PRIMARY KEY(userID, productID),
                FOREIGN KEY (userID) REFERENCES users(id),
                FOREIGN KEY (productID) REFERENCES products(id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async add(shoppingCartItem: ShoppingCartItemDto): Promise<ShoppingCartItemEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO shoppingCartItems (userID, productID, quantity) VALUES (?, ?, ?)`,
            [shoppingCartItem.userID, shoppingCartItem.productID, shoppingCartItem.quantity]);

        if (response instanceof ErrorCode)
            return response;

        return new ShoppingCartItemEntity(shoppingCartItem.userID, shoppingCartItem.productID, shoppingCartItem.quantity);
    }

    public async getByID(userID: number, productID: number): Promise<ShoppingCartItemEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM shoppingCartItems WHERE userID = ? AND productID = ?`, 
            [userID, productID]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Item carrinho não encontrado');

        return new ShoppingCartItemEntity(response[0].userID, response[0].productID, response[0].quantity);
    }

    public async getByUserID(userID: number): Promise<ShoppingCartItemEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM shoppingCartItems WHERE userID = ?`, [userID]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Item carrinho não encontrado');

        return new ShoppingCartItemEntity(response[0].userID, response[0].productID, response[0].quantity);
    }

    public async getAll(): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM shoppingCartItems`);

        return response;
    }

    public async update(shoppingCartItem: ShoppingCartItemDto): Promise<ShoppingCartItemEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE shoppingCartItems SET quantity = ? WHERE userID = ? AND productID = ?`,
            [shoppingCartItem.quantity, shoppingCartItem.userID, shoppingCartItem.productID]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Item carrinho não encontrado');

        return await this.getByID(shoppingCartItem.userID, shoppingCartItem.productID);
    }

    public async remove(userID: number, productID: number): Promise<number | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM shoppingCartItems WHERE userID = ? AND productID = ?`, 
            [userID, productID]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Item carrinho não encontrado');

        return productID;
    }
}