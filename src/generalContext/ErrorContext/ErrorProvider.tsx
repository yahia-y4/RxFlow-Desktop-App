
import { useState } from "react";
import { ErrorContext } from "./ErrorContext";

interface ErrorProviderProps {
  children: React.ReactNode;
}
export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<string | null>(null);
  const [visibleError, setVisibleError] = useState<boolean | null>(false);
    return (
    <ErrorContext.Provider value={{ error, setError , visibleError, setVisibleError}}>
      {children}
    </ErrorContext.Provider>
  );
}