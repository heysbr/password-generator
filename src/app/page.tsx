"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [length, setLength] = useState<number>(8);
  const [numbersAllowed, setNumbersAllowed] = useState<boolean>(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (symbolsAllowed) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setPassword(pass);
  }, [length, numbersAllowed, symbolsAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, symbolsAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length); // full selection for mobile
    }
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="bg-slate-900 h-screen p-20">
      <div className="w-full max-w-md mx-auto shadow-md bg-blue-900 rounded-md p-10">
        {/* Password Display + Copy */}
        <div className="flex flex-row">
          <input
            type="text"
            value={password}
            placeholder="password"
            ref={passwordRef}
            readOnly
            className="bg-white flex-1 text-black px-5 py-2 rounded-md"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-5 py-2 bg-amber-400 ml-2 rounded-md text-white hover:bg-amber-500 active:bg-amber-600"
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="w-full max-w-md mx-auto gap-x-2 flex flex-row ">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer mx-5 my-2"
          />
          <label className="mx-5 my-2">Length: {length}</label>
        </div>

        {/* Numbers Allowed */}
        <div className="w-full max-w-md mx-auto gap-x-2 flex flex-row ">
          <input
            type="checkbox"
            id="numberInput"
            checked={numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
            className="cursor-pointer ml-5 my-2"
          />
          <label htmlFor="numberInput" className="my-2">
            Numbers Allowed
          </label>
        </div>

        {/* Symbols Allowed */}
        <div className="w-full max-w-md mx-auto gap-x-2 flex flex-row ">
          <input
            type="checkbox"
            id="symbolInput"
            checked={symbolsAllowed}
            onChange={() => setSymbolsAllowed((prev) => !prev)}
            className="cursor-pointer ml-5 my-2"
          />
          <label htmlFor="symbolInput" className="my-2">
            Symbols Allowed
          </label>
        </div>
      </div>
    </div>
  );
}
