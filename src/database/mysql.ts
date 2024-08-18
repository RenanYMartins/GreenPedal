import mysql, { Pool } from 'mysql2/promise';
import { ErrorCode } from '../model/ErrorCode';

export class MySql {
    private static instance: MySql;
    private pool: Pool;
    private config: mysql.PoolOptions = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        timezone: process.env.DB_TZ,
        dateStrings: false
    };

    private constructor() {
        this.pool = mysql.createPool(this.config);
    }

    public static getInstance(): MySql {
        if (!MySql.instance)
            MySql.instance = new MySql();

        return MySql.instance;
    }

    public async query(query: string, values?: any[]): Promise<mysql.QueryResult | ErrorCode> {
        try {
            return (await this.pool.query(query, values))[0];
        } catch (error: any) {
            console.error('Error: ', error);
            return new ErrorCode(500, 'Ocorreu um erro ao se conectar ao banco');
        }
    }
}