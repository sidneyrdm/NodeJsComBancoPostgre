import { User } from "../../dio-node-user-authentication-api/final-result/src/models/user.model";
import db from "../db";
import DataBaseError from "../models/errors/database.error.model";

class UserRepository{

    async findAllUsers(): Promise<User[]> {
        const sql = `
        SELECT uuid, username FROM application_user
        `
        const { rows } = await db.query<User>(sql);
         return rows || [];
    }

    async findByID(uuid: string): Promise<User> {

        try{
            
        const sql = `
        SELECT uuid, username FROM application_user
        WHERE uuid = $1
        `
               const values = [uuid];
               const { rows } = await db.query<User>(sql, values);
               const [user] = rows; //atribui a primeira posicao de rows a 'user'

        return user;
        }catch(error){
            throw new DataBaseError('Erro na consulta por ID');
        }
    }

    async create(user: User): Promise<string> {
        const script= `
        INSERT INTO application_user(username, password)
        VALUES($1, crypt($2, 'my_salt'))
        RETURNING uuid
        `;

        const values = [user.username, user.password];
        
        const { rows } = await db.query<{uuid: string}>(script, values);
        const [ newUser ] = rows;
        
        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script= `
        UPDATE application_user
        SET username= $1,
            password= crypt($2, 'my_salt')
        WHERE uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];
        
        await db.query<{uuid: string}>(script, values);

    }

    async remove(uuid: string): Promise<void> {
        const script = `
        DELETE FROM application_user 
        WHERE uuid = $1
        `
        const values = [uuid];

        await db.query(script, values);

    }

}

export default new UserRepository();