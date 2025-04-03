import { useState } from "react";
import { CardLogin } from "../components/card-login";

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-4">
      <CardLogin.Root>
        <CardLogin.Header>
          {isRegister ? "Criar Conta" : "Entrar"}
        </CardLogin.Header>
        <CardLogin.Content key="content" isRegister={isRegister} />
        <CardLogin.Footer isRegister={isRegister} toggleForm={toggleForm} />
      </CardLogin.Root>
    </div>
  );
};
