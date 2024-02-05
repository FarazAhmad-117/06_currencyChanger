import { useState } from "react";
import InputBox from "./components/InputBox";
import BackgroundImage from "./img/wp2300372.jpg";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo";

function App() {
  const [amount,setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const currencies = Object.keys(currencyInfo);

  const swap = ()=>{
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convert = ()=>{
    // setConvertedAmount(Math.round(amount * Number(currencyInfo[to])));
    setConvertedAmount(amount * Number(currencyInfo[to]));
  }

  return (
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url('${BackgroundImage}')`,
    }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 backdrop-blur-[2px] bg-white/25">
          <form
          onSubmit={(e) => {
              e.preventDefault();
              convert();                           
          }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                currencyOptions={currencies}
                amount={amount}
                onAmountChange={setAmount}
                onCurrencyChange={setFrom}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
                <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 hover:bg-blue-700 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
                >
                  swap
                </button>
            </div>
            <div className="w-full mt-1 mb-4">
                <InputBox
                label="To"
                currencyOptions={currencies}
                amount={convertedAmount}
                onAmountChange={setConvertedAmount}
                onCurrencyChange={(currency)=>setTo(currency)}
                selectCurrency={to}
                />
            </div>
            <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg"
            >
              Convert {`${from.toUpperCase()} to ${to.toUpperCase()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
