/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface SearchQueryContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchQueryContext = createContext<SearchQueryContextType| undefined>(undefined)

export function useSearchQuery(): SearchQueryContextType {
    const context = useContext(SearchQueryContext);
    if (!context) {
        throw new Error('useSearchQuery must be used within a SearchQueryProvider');
    }
    return context;
}

export default function SearchQueryProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchQueryContext.Provider>
    );
}