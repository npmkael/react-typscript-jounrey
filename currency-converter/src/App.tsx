import { useState, useEffect } from "react";

const host = "api.frankfurter.app";

function App() {
    const [money, setMoney] = useState<number>(1);
    const [currency, setCurrency] = useState<string>("");
    const [rates, setRates] = useState<string>("");
    const [convert, setConvert] = useState<string>("USD");
    const [convertedTo, setConvertedTo] = useState<string>("CAD");
    useEffect(
        function () {
            async function sampleFetch() {
                try {
                    const res = await fetch(
                        `https://${host}/latest?amount=${money}&from=${convert}&to=${convertedTo}`
                    );

                    if (!res.ok) throw new Error("Something went wrong.");

                    const data = await res.json();
                    setRates(data.rates);
                    console.log(data.rates);
                } catch (err) {}
            }

            sampleFetch();
        },
        [money, convert, convertedTo]
    );

    return (
        <>
            <div>
                <input
                    type="text"
                    value={money}
                    onChange={(e) => setMoney(Number(e.target.value))}
                />
                <select
                    value={convert}
                    onChange={(e) => setConvert(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
                <select
                    value={convertedTo}
                    onChange={(e) => setConvertedTo(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
                <p>{rates[`${Number(convertedTo)}`]}</p>
            </div>
        </>
    );
}

export default App;
