import React from "react";
import { useState, useEffect } from "react";
import { tempWatchedDataType } from "./models";

export function useLocalStorage<T>(
    initialState: T,
    key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null
            ? initialState
            : (JSON.parse(storedValue) as T);
    });

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
