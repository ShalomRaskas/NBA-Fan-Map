import {getSql} from '@/lib/db';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const validTeams=new Set(['ATL','BOS','BKN','CHA','CHI','CLE','DAL','DEN','DET','GSW','HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NOP','NYK','OKC','ORL','PHI','PHX','POR','SAC','SAS','TOR','UTA','WAS']);
export async function GET(){
 try{
  const sql=getSql();
  const rows=await sql`SELECT team, city, lat, lng FROM fans ORDER BY updated DESC`;
  return Response.json(rows,{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Fan map is temporarily unavailable.'},{status:503})}
}
export async function POST(req:Request){
 let b:Record<string,unknown>;
 try{b=await req.json()}catch{return Response.json({error:'Invalid request.'},{status:400})}
 if(!b||typeof b.id!=='string'||!/^[a-f0-9-]{36}$/.test(b.id)||typeof b.team!=='string'||!validTeams.has(b.team)||typeof b.city!=='string'||!b.city.trim()||b.city.length>160||typeof b.lat!=='number'||!Number.isFinite(b.lat)||Math.abs(b.lat)>85||typeof b.lng!=='number'||!Number.isFinite(b.lng)||Math.abs(b.lng)>180){
  return Response.json({error:'Choose a team and a valid city.'},{status:400});
 }
 try{
  const sql=getSql();
  const lat=Math.round(b.lat*10)/10,lng=Math.round(b.lng*10)/10;
  await sql`INSERT INTO fans (id,team,city,lat,lng,updated)
   VALUES (${b.id},${b.team},${b.city.trim()},${lat},${lng},${Date.now()})
   ON CONFLICT (id) DO UPDATE SET team=EXCLUDED.team,city=EXCLUDED.city,
   lat=EXCLUDED.lat,lng=EXCLUDED.lng,updated=EXCLUDED.updated`;
  return Response.json({ok:true});
 }catch{return Response.json({error:'Could not save your pin. Please try again.'},{status:503})}
}
