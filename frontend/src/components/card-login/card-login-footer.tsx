interface CardLoginFooterProps {
  isRegister: boolean;
  toggleForm: () => void;
}

export const CardLoginFooter = ({
  isRegister,
  toggleForm,
}: CardLoginFooterProps) => {
  return (
    <div className="text-center mt-4">
      <button onClick={toggleForm} className="text-secondary hover:underline">
        {isRegister
          ? "Já tem uma conta? Entre aqui"
          : "Não tem uma conta? Cadastre-se"}
      </button>
    </div>
  );
};
