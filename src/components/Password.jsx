import { useState, useEffect, useCallback, useRef } from "react";

export default function Password() {
  const [length, setLenth] = useState(8);
  const [password, setPassword] = useState("");
  const [charector, setCharector] = useState(false);
  const [number, setNumber] = useState(false);
  const passwordGenerator = useCallback(() => {
    let random = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charector) str += "!@#$%^&*-_+=[]{}~`";
    if (number) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      let temp = Math.floor(Math.random() * str.length + 1);
      random += str.charAt(temp);
    }
    setPassword(random);
  }, [length, number, charector, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, charector]);

  // useRef hook
  const passwordRef = useRef(null);

  //
  const copyClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLenth(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charector}
            id="characterInput"
            onChange={() => setCharector((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
