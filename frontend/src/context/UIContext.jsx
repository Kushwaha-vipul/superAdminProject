import React, { createContext, useContext, useMemo, useState } from 'react';


const UIContext = createContext(null);


export function UIProvider({ children }) {
const [sidebarOpen, setSidebarOpen] = useState(true);
const [theme, setTheme] = useState('light');


const value = useMemo(() => ({ sidebarOpen, setSidebarOpen, theme, setTheme }), [sidebarOpen, theme]);
return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}


export function useUI() {
const ctx = useContext(UIContext);
if (!ctx) throw new Error('useUI must be used within UIProvider');
return ctx;
}