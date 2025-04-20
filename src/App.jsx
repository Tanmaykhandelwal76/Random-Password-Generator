import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*_--(){}|[]+=~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Password Generator</h1>
          
          <div className="relative mb-6 group">
            <input
              type="text"
              value={password}
              className="w-full bg-white/20 text-white py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="Your password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded-md transition-colors duration-300 text-sm font-medium"
            >
              Copy
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white/90 text-sm flex justify-between">
                <span>Password Length</span>
                <span className="font-mono bg-indigo-600/30 px-2 rounded text-white">{length}</span>
              </label>
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  id="numberInput"
                  onChange={() => setNumberAllowed((prev) => !prev)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <label htmlFor="numberInput" className="text-white/90">Include Numbers</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  id="characterInput"
                  onChange={() => setCharAllowed((prev) => !prev)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <label htmlFor="characterInput" className="text-white/90">Include Symbols</label>
              </div>
            </div>
          </div>
          
          <button
            onClick={passwordGenerator}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;