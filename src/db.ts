import { Pool } from "pg";
const connectionString = 'postgres://ukssmhoi:RWwLkkUjbdXTl0ZTH_xT4yqLNL8WgCd4@batyr.db.elephantsql.com/ukssmhoi';
const db = new Pool({ connectionString }) ;



export default db;