import { useState, useEffect } from "react";

const host = "api.frankfurter.app";

function App() {
    const [money, setMoney] = useState<number>(1);
    const [rates, setRates] = useState<string>("");
    const [convert, setConvert] = useState<string>("USD");
    const [convertedTo, setConvertedTo] = useState<string>("CAD");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(
        function () {
            async function sampleFetch() {
                try {
                    setIsLoading(true);
                    const res = await fetch(
                        `https://${host}/latest?amount=${money}&from=${convert}&to=${convertedTo}`
                    );

                    if (!res.ok) throw new Error("Something went wrong.");

                    const data = await res.json();
                    setRates(data.rates[convertedTo]);
                    setIsLoading(false);
                } catch (err) {}
            }

            if (convert === convertedTo) return setRates(String(money));

            sampleFetch();
        },
        [money, convert, convertedTo]
    );

    console.log(rates);

    return (
        <>
            <div>
                <input
                    type="text"
                    value={money}
                    onChange={(e) => setMoney(Number(e.target.value))}
                    disabled={isLoading}
                />
                <select
                    value={convert}
                    onChange={(e) => setConvert(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
                <select
                    value={convertedTo}
                    onChange={(e) => setConvertedTo(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="INR">INR</option>
                </select>
                {isLoading ? (
                    <Loader />
                ) : (
                    <p>
                        {rates} {convertedTo}
                    </p>
                )}
            </div>
        </>
    );
}

function Loader() {
    return <p>Loading....</p>;
}

export default App;
