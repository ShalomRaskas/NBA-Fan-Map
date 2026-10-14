import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'NBA Fan Map — Where fandom lives',description:'30 teams. One worldwide fan map. Pick your NBA team and put your city on the map.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
