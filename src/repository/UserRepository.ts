import { ResultSetHeader, RowDataPacket } from "mysql2";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CreateUserDto } from "../model/dto/user/CreateUserDto";
import { UserEntity } from "../model/entity/UserEntity";
import { UserDto } from "../model/dto/user/UserDto";
import { dbDateFormatUtil } from "../utils/DbDateFormatUtil";

export class UserRepository {
    private static instance: UserRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): UserRepository {
        if (!UserRepository.instance)
            UserRepository.instance = new UserRepository();

        return UserRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                userType CHAR(1) NOT NULL,
                dateCreate DATETIME NOT NULL,
                PRIMARY KEY (id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(user: CreateUserDto): Promise<UserEntity | ErrorCode> {
        const currentDate = new Date();
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO users (name, email, password, userType, dateCreate) VALUES (?, ?, ?, ?, ?)`,
            [user.name, user.email, user.password, user.userType, dbDateFormatUtil(currentDate)]);

        if (response instanceof ErrorCode)
            return response;

        return new UserEntity(response.insertId, user.name, user.email, user.password, user.userType, currentDate);
    }

    public async getByID(id: number): Promise<UserEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM users WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return new UserEntity(response[0].id, response[0].name, response[0].email, response[0].password, response[0].userType, response[0].dateCreate);
    }

    public async getByEmail(email: string): Promise<UserEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return new UserEntity(response[0].id, response[0].name, response[0].email, response[0].password, response[0].userType, response[0].dateCreate);
    }

    public async getAll(): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM users`);

        return response;
    }

    public async update(user: UserDto): Promise<UserEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE users SET name = ?, email = ?, password = ?, userType = ? WHERE id = ?`,
            [user.name, user.email, user.password, user.userType, user.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return await this.getByID(user.id);
    }

    public async delete(id: number): Promise<number | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM users WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Usuário não encontrado');

        return id;
    }
}