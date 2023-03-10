import { Inter } from "next/font/google";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import  discordRichPresence  from 'discord-rich-presence';
import DiscordRPC from 'discord-rpc';
import { set } from "cookie-cutter";
import Link from "next/link";
import { verify } from "jsonwebtoken";
import { decodeBase64 } from "@/util/Base64Handler";
import { DiscordContextProvider, useDiscordContext } from "@/util/DcContext";

const inter = Inter({ subsets: ["latin"] });
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/auth';
/*
DiscordRPC.register('1080066011753086977');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity(){
  if(!RPC){
    console.log("RPC not ready")
    return;} 
  console.log("Setting activity")

  RPC.setActivity({
    state: 'slithering',
    details: '🐍',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 1337,
    largeImageKey: 'snek_large',
    smallImageKey: 'snek_small',
    instance: true,
  })
}

RPC.on('ready'  ,async () => {
  setActivity();

  setInterval(() => {
    setActivity(); 
  }, 15*1000);
});
*/

export default function Home() {
    const router = useRouter();
    const { token } = router.query;
    const[user, setUser] = useState({});
    const test = useContext(DiscordContextProvider)
    console.log('test: ' + test);
    useEffect(() => {
    if(token != undefined ){
    localStorage.setItem('dcToken', decodeBase64(token));
    setUser(JSON.parse(decodeBase64(token)));
    console.log('Hello: ' + user.username)
    }
    }, [token]);
    
  
/*
  useEffect (() => {    
    Cookies.set('dcToken',token, { expires: 7});
  }, [token]);      

  function getCookie() {
    const cookie = Cookies.get('dcToken');
    const decodedString = atob(cookie);
    console.log(decodedString); // Output: "Hello World!"
  }
*/

  
  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center items-center bg-neutral-800">
        <div className="text-lg text-white {{ !Object.keys(user).length && 'hidden' }}">
          Welcome Back {user.username}
        </div>
        <Link href="/api/auth">
        <div className="flex flex-row justify-center items-center px-2 py-3 bg-[#5865F2] hover:bg-[#717cf4] w-48 text-white gap-5 select-none rounded-xl hover:shadow-lg shadow-[#5865F2] duration-500">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-discord"
              viewBox="0 0 16 16"
            >
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
            </svg>
          </div>
          <p className="font-semibold">Login</p>
        </div>
        </Link>
      </div>
    </>
  );
}
