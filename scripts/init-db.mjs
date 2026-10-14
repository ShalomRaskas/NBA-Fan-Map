import {neon} from '@neondatabase/serverless';
if(!process.env.DATABASE_URL){
 console.log('Interface-only build: connect Neon in Vercel Storage, ensure DATABASE_URL is set, and redeploy to enable fan submissions.');
 process.exit(0);
}
try{
 const sql=neon(process.env.DATABASE_URL);
 await sql`CREATE TABLE IF NOT EXISTS fans (
 id TEXT PRIMARY KEY,
 team TEXT NOT NULL,
 city TEXT NOT NULL,
 lat DOUBLE PRECISION NOT NULL CHECK (lat BETWEEN -85 AND 85),
 lng DOUBLE PRECISION NOT NULL CHECK (lng BETWEEN -180 AND 180),
 updated BIGINT NOT NULL
 )`;
 console.log('Fan database is ready. Existing submissions are preserved.');
}catch{
 console.error('Database setup failed. Check the Neon connection and DATABASE_URL in Vercel, then redeploy.');
 process.exit(1);
}
