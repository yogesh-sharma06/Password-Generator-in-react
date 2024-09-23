import { useCallback, useEffect, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const copyCharinputRef = useRef(null);

  
   const passGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrstuvwxyz";
  if(numberAllow)str +="0123456789";
  if(charAllow)str +="!@#$%&^()";
  for(let i =1; i<= length; i++){
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }
  setPassword(pass);
  },[length,numberAllow,charAllow,setPassword]);

  const copyPassToClip = useCallback(()=>{
    let copyChar = copyCharinputRef.current?.value;
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,copyChar);
    window.navigator.clipboard.writeText(password.slice(0,copyChar));
  },[password])

  useEffect(()=>{passGenerator()},
    [length,numberAllow,charAllow,passGenerator]);
  
  return (
   <>
    <Head>
        <title>
         Password Generator
        </title>
      </Head>
     <h1 className='text-4xl text-center mt-10'>Password Generator</h1>
     <div className='w-full flex justify-center items-center mt-5'>
     <div className='bg-gray-700 rounded-xl p-4 sm:w-fit w-11/12'>
      <div className='w-full flex '>
        <input className='rounded text-black outline-none p-1 pl-2 w-full bg-gray-200' type="text" value={password} readOnly ref={passwordRef}/>
        <button onClick={copyPassToClip} className=' bg-blue-700 py-1 px-3 rounded-r -ml-4'>COPY</button>
      </div>
      <div className='flex space-x-3 text-yellow-400 items-center mt-2 select-none flex-wrap'>
        <div className='flex items-center flex-wrap'>
          <input id='length' type="range" onChange={(e)=>{setLength(e.target.value)}} value={length} min={6} max={30}/>
         <label htmlFor="length" className='ml-1'>Length( {length} )</label>
        </div>
        <div>
          <input className='mr-1' id='Numbers' type="checkbox" defaultChecked={numberAllow} onClick={()=>setNumberAllow((prev)=>!prev)}/>
         <label htmlFor="Numbers">Numbers</label>
        </div>
        <div>
          <input className='mr-1' id='Characters' type="checkbox" 
          defaultChecked={charAllow} onClick={()=>setCharAllow((prev)=>!prev)}/>
         <label htmlFor="Characters">Characters</label>
        </div>
        <div className='mt-3'>
          <input className='text-black mr-1 w-10 p-0.5 outline-none rounded' id='copy' type="number" min={6} max={30} defaultValue={8} ref={copyCharinputRef}
          />
         <label htmlFor="copy">How Many</label>
        </div>
      </div>
     </div>
     </div>
   </>
  )
}
