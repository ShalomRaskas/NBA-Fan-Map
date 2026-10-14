import {neon} from '@neondatabase/serverless';
export function getSql(){
 const connection = process.env.DATABASE_URL;
 if(!connection) throw new Error('Connect a Neon database and set DATABASE_URL.');
 return neon(connection);
}
