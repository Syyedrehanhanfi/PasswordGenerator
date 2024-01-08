import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";
import { Input } from "postcss";

function App() {
  const [length, setLength] = useState(8);
  const [numberAlllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAlloed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTVWVYZabcdefghijklmnopqrstwvyz";
    if (numberAlllowed) {
      str += "123456789";
    }
    if (charAllowed) {
      str += "#$@%^&*";
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAlllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAlllowed, charAllowed, passwordGenerator])

  const copypassword = useCallback(()=>{ 
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-30 bg-gray-800 text-orange-400">
        <h1 className="text-center text-white my-3">Password-Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" className="outline-none w-full py-1 px-3" readOnly placeholder = "Enter Your Password" value = {password}
          ref = {passwordref} />
          <div className="">
            <button className="outline-none bg-blue-700 text-white px-5 py-2" onClick = {copypassword}>
              Copy
            </button>
          </div>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value = {length} className="cursor-pointer"
            onChange = {(e)=>{ 
              setLength(e.target.value)
            }} />
            <label className="text-teal-50"> length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            id = "numberInput"
            defaultChecked= {numberAlllowed}
            onChange= {()=>{
              setNumberAllowed((prev)=> !prev);
            }} />
          </div>
          <label className="text-white">Number </label>

          <input type="checkbox" 
          defaultChecked = {setCharAlloed}
          id = "characterInput"

          onChange={()=> setCharAlloed((prev)=> !prev)}
          />
          <label className="text-white">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
