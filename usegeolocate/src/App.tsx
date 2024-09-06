import { useState } from "react";

type Position = {
    lat?: number;
    lng?: number;
};

function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<Position>({});
    const [error, setError] = useState<string | null>(null);

    const { lat, lng } = position;

    function getPosition() {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    }

    return { lat, lng, error, isLoading, getPosition };
}

function App() {
    const [countClicks, setCountClicks] = useState(0);

    const { lat, lng, error, isLoading, getPosition } = useGeolocation();

    function handleClick() {
        setCountClicks((count) => count + 1);
        getPosition();
    }

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                Get my position
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p>
                    Your GPS position:{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            <p>You requested position {countClicks} times</p>
        </div>
    );
}

export default App;
