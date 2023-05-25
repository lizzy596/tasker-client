import { createContext } from "react";

/**
 * Contact Search Context
 */
export const SearchData = createContext();

export const SearchDataProvider = ({ value, children }) => {
  return <SearchData.Provider value={value}>{children}</SearchData.Provider>;
};