const { useState, useEffect, createContext, useContext } = require('react');

function useLocalStorage(key, fallbackValue) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function useDC() {
  return useLocalStorage('dcToken', 'notSet');
}

export function DiscordContextProvider({ children }) {
  const [dcToken, setDcToken] = useDC();
  return (
    <DiscordContext.Provider value={dcToken}>
      <SetDiscordContext.Provider value={setDcToken}>
        {children}
      </SetDiscordContext.Provider>
    </DiscordContext.Provider>
  );
}
