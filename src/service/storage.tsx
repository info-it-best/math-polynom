//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { Dispatch, SetStateAction, useState } from "react";

function load<S>(keyName: string, defaultValue: S): S {
    const parsed = JSON.parse(localStorage.getItem(keyName) || "{}");
    // @ts-ignore
    const result: S = {};
    // @ts-ignore
    Object.keys(defaultValue).forEach(k => result[k] = parsed[k] || defaultValue[k])
    return result;
}
  
function store<S>(keyName: string, value: S) {
    localStorage.setItem(keyName, JSON.stringify(value))
}

function toKey<S>(entry: S): string {
    // @ts-ignore
    return Object.keys(entry).map(k => entry[k]).map(v => v == undefined ? "" : v.toString()).join("-")
}

export function useStorage<S>(keyName: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
    // @ts-ignore
    const entry = load(keyName, typeof initialState == "function" ? initialState() : initialState);
    const initialKey = toKey(initialState);
    const currentKey = toKey(entry);
    const [data, setData] = useState<S>(currentKey == initialKey ? initialState : entry);
    
    return [
        data,
        (value: SetStateAction<S>) => {
            store(keyName, value)
            setData(value)
        }
    ];
}