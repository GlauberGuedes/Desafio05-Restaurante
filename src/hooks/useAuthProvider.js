import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useAuthProvider() {
  const [value, setValue] = useLocalStorage("TOKEN", "");
  const [token, setToken] = useState(value);
  const [valueRestaurante, setValueRestaurante] = useLocalStorage("RESTAURANTE", "");
  const [restaurante, setRestaurante] = useState(valueRestaurante);
  const [valueUsuario, setValueUsuario] = useLocalStorage("USUARIO", "");
  const [usuario, setUsuario] = useState(valueUsuario);

  useEffect(() => {
    setValue(token);
    setValueRestaurante(restaurante);
    setValueUsuario(usuario)
  }, [token, restaurante, usuario]);

  return {
    token,
    setToken,
    restaurante,
    setRestaurante,
    usuario,
    setUsuario
  };
}
