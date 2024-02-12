//"Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements; and to You under the Apache License, Version 2.0. "

import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState } from "react";

export type PageName = "home" | "help" | "author";
type CurrentPageContext = {
  currentPage: PageName;
  setCurrentPage: Dispatch<SetStateAction<PageName>>;
};
type CurrentPageContextProviderProps = {
  children: ReactNode;
};

export const CurrentPageContext = createContext<CurrentPageContext | undefined>(undefined);

export default function CurrentPageContextProvider({ children }: CurrentPageContextProviderProps) {
  const [currentPage, setCurrentPage] = useState<PageName>("home");

  return <CurrentPageContext.Provider value={{
    currentPage,
    setCurrentPage
  }}>
    {children}
  </CurrentPageContext.Provider>;
}

export function useCurrentPageContext(): CurrentPageContext {
  const context = useContext(CurrentPageContext)
  if (!context) throw new Error(" must be used within a CurrentPageContextProvider")
  return context
}