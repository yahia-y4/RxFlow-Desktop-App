
import { createContext } from "react";

interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
  visibleError: boolean | null;
  setVisibleError: (visible: boolean | null) => void;
}
export const ErrorContext = createContext<ErrorContextType>({
  error: null,
  setError: () => {},
  visibleError: null,
  setVisibleError: () => {},
});


 