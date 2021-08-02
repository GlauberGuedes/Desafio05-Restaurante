import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage("TOKEN", "");
  const [token, setToken] = useState(value);
  const [valueRestaurante, setValueRestaurante] = useLocalStorage("RESTAURANTE", "");
  const [restaurante, setRestaurante] = useState(valueRestaurante);

  useEffect(() => {
    setValue(token);
    setValueRestaurante(restaurante);
  }, [token, restaurante]);

  return {
    token,
    setToken,
    restaurante,
    setRestaurante
  };
}
